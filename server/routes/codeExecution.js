import express from 'express';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, readFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const router = express.Router();
const execAsync = promisify(exec);

// Custom exec function with proper timeout and error handling
const execWithTimeout = (command, timeoutMs = 30000) => {
  return new Promise((resolve, reject) => {
    const child = exec(command, { 
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      killSignal: 'SIGKILL'
    }, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout || '';
        error.stderr = stderr || '';
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });

    // Set timeout
    const timeout = setTimeout(() => {
      child.kill('SIGKILL');
      const timeoutError = new Error(`Command timed out after ${timeoutMs}ms`);
      timeoutError.code = 'ETIMEDOUT';
      timeoutError.stdout = '';
      timeoutError.stderr = '';
      reject(timeoutError);
    }, timeoutMs);

    // Clear timeout on completion
    child.on('exit', () => clearTimeout(timeout));
    child.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
};

// Timeout for code execution (10 seconds)
const EXECUTION_TIMEOUT = 10000;
const COMPILATION_TIMEOUT = 30000; // 30 seconds for compilation

router.post('/execute', async (req, res) => {
  const { code, input, language = 'cpp' } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'Code is required'
    });
  }

  if (language !== 'cpp') {
    return res.status(400).json({
      success: false,
      error: 'Only C++ is currently supported'
    });
  }

  // Check if g++ is available
  try {
    await execAsync('g++ --version', { timeout: 2000 });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'g++ compiler not found',
      message: 'g++ compiler is not installed or not in PATH. Please install MinGW-w64 and add it to your PATH. See INSTALL_GPP.md for instructions.',
      installationGuide: 'https://winlibs.com/'
    });
  }

  let tempFile, inputFile, outputFile;
  
  try {
    // Create temporary files
    const timestamp = Date.now();
    tempFile = join(tmpdir(), `code_${timestamp}.cpp`);
    inputFile = join(tmpdir(), `input_${timestamp}.txt`);
    outputFile = join(tmpdir(), `output_${timestamp}.txt`);

    // Write code to file
    await writeFile(tempFile, code, 'utf8');
    
    // Write input to file if provided
    if (input) {
      await writeFile(inputFile, input, 'utf8');
    }

    // Compile C++ code
    const executablePath = tempFile.replace('.cpp', '');
    const compileCommand = `g++ -o "${executablePath}" "${tempFile}" -std=c++17 2>&1`;
    
    let compileResult;
    try {
      compileResult = await execWithTimeout(compileCommand, COMPILATION_TIMEOUT);
    } catch (compileError) {
      // Compilation error - capture detailed error message
      // g++ writes errors to stderr, so prioritize that
      let errorOutput = '';
      
      if (compileError.code === 'ETIMEDOUT') {
        errorOutput = `Compilation timed out after ${COMPILATION_TIMEOUT}ms. The code might be too complex or there's an infinite loop.`;
      } else {
        // Combine stderr and stdout (since we redirect 2>&1)
        errorOutput = (compileError.stderr || compileError.stdout || compileError.message || 'Compilation failed').toString().trim();
      }
      
      console.error('Compilation error details:', {
        message: compileError.message,
        stderr: compileError.stderr,
        stdout: compileError.stdout,
        code: compileError.code,
        signal: compileError.signal,
        timedOut: compileError.code === 'ETIMEDOUT'
      });
      
      // Return the actual compilation error
      return res.json({
        success: false,
        output: errorOutput || 'Compilation failed - no error details available',
        error: compileError.code === 'ETIMEDOUT' ? 'Compilation Timeout' : 'Compilation Error'
      });
    }

    // Execute the compiled program
    const baseName = tempFile.replace('.cpp', '');
    const executable = process.platform === 'win32' ? `${baseName}.exe` : baseName;
    
    // Use proper input redirection for Linux (Render)
    const executeCommand = input 
      ? (process.platform === 'win32' 
          ? `type "${inputFile}" | "${executable}"`
          : `"${executable}" < "${inputFile}"`)
      : `"${executable}"`;

    let executionResult;
    try {
      executionResult = await execAsync(executeCommand, { 
        timeout: EXECUTION_TIMEOUT,
        maxBuffer: 1024 * 1024 // 1MB buffer
      });
      
      return res.json({
        success: true,
        output: executionResult.stdout || 'Program executed successfully (no output)',
        error: null
      });
    } catch (execError) {
      // Runtime error or timeout
      const errorOutput = execError.stderr || execError.stdout || execError.message || 'Runtime error occurred';
      console.error('Execution error:', {
        message: execError.message,
        stderr: execError.stderr,
        stdout: execError.stdout,
        code: execError.code
      });
      
      return res.json({
        success: false,
        output: errorOutput.toString(),
        error: execError.code === 'ETIMEDOUT' ? 'Execution Timeout' : 'Runtime Error'
      });
    }

  } catch (error) {
    console.error('Execution error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error during code execution',
      message: error.message
    });
  } finally {
    // Cleanup temporary files
    const cleanup = async () => {
      const filesToClean = [tempFile, inputFile, outputFile].filter(Boolean);
      
      // Add executable to cleanup list
      if (tempFile) {
        const baseName = tempFile.replace('.cpp', '');
        filesToClean.push(process.platform === 'win32' ? `${baseName}.exe` : baseName);
      }
      
      for (const file of filesToClean) {
        try {
          await unlink(file).catch(() => {});
        } catch (err) {
          // Ignore cleanup errors
        }
      }
    };

    await cleanup();
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Code execution endpoint is working ☕',
    supportedLanguages: ['cpp'],
    note: 'Make sure g++ compiler is installed on the server'
  });
});

export default router;
