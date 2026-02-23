// Problem explanations in simple language
export const problemExplanations = {
  1: {
    title: "Max of 2 Numbers",
    explanation: "👉 You are given **two numbers**.\n\nYour task is to:\n* Compare them\n* Print the **bigger one**\n\n**Example:**\nInput: 5 9\nOutput: 9\n\n**Meaning:**\n\"Which number is greater?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    
    // Compare the two numbers
    if (a > b) {
        cout << a;  // a is bigger
    } else {
        cout << b;  // b is bigger (or equal)
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take two numbers as input\n2. Use if-else to compare\n3. Print the bigger one"
  },
  2: {
    title: "Even / Odd",
    explanation: "👉 You are given **one number**.\n\nYou must check:\n* If it is divisible by 2 → Even\n* Otherwise → Odd\n\n**Example:**\nInput: 7\nOutput: Odd\n\n**Meaning:**\n\"Can this number be divided by 2 without remainder?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Check if divisible by 2
    if (n % 2 == 0) {
        cout << "Even";  // No remainder
    } else {
        cout << "Odd";   // Has remainder
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take number as input\n2. Use % (modulo) operator to check remainder\n3. If remainder is 0 → Even, else → Odd"
  },
  3: {
    title: "Sum of N Numbers",
    explanation: "👉 You are given a number **N**.\n\nYou must calculate:\n1 + 2 + 3 + … + N\n\n**Example:**\nInput: 5\nOutput: 15\n(1+2+3+4+5)\n\n**Meaning:**\n\"Add all numbers from 1 to N\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int sum = 0;
    // Loop from 1 to n
    for (int i = 1; i <= n; i++) {
        sum = sum + i;  // Add each number
    }
    
    cout << sum;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take N as input\n2. Initialize sum = 0\n3. Loop from 1 to N\n4. Add each number to sum\n5. Print the total sum"
  },
  4: {
    title: "Factorial",
    explanation: "👉 You are given a number **N**.\n\nYou must multiply:\nN × (N-1) × (N-2) … × 1\n\n**Example:**\nInput: 4\nOutput: 24\n(4×3×2×1)\n\n**Meaning:**\n\"Multiply all numbers from N down to 1\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int fact = 1;
    // Multiply from 1 to n
    for (int i = 1; i <= n; i++) {
        fact = fact * i;  // Multiply each number
    }
    
    cout << fact;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take N as input\n2. Initialize fact = 1 (not 0, because we multiply)\n3. Loop from 1 to N\n4. Multiply each number to fact\n5. Print the result"
  },
  5: {
    title: "Prime Check",
    explanation: "👉 You are given a number.\n\nCheck:\n* Does it have **only 2 factors** (1 and itself)?\n\nIf yes → Prime\nElse → Not Prime\n\n**Example:**\n7 → Prime\n8 → Not Prime\n\n**Meaning:**\n\"Can this number be divided by anything other than 1 and itself?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    if (n < 2) {
        cout << "Not Prime";
        return 0;
    }
    
    bool isPrime = true;
    // Check from 2 to sqrt(n)
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = false;  // Found a divisor
            break;
        }
    }
    
    if (isPrime) {
        cout << "Prime";
    } else {
        cout << "Not Prime";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take number as input\n2. Check if number < 2 (not prime)\n3. Loop from 2 to √n\n4. If any number divides it → Not Prime\n5. Otherwise → Prime"
  },
  6: {
    title: "Sum of Array",
    explanation: "👉 You are given a list of numbers.\n\nYou must:\n* Add all elements together\n\n**Example:**\n[2, 4, 6] → 12\n\n**Meaning:**\n\"Add all numbers inside the array\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    
    // Read array
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int sum = 0;
    // Add all elements
    for (int i = 0; i < n; i++) {
        sum = sum + arr[i];
    }
    
    cout << sum;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take size n and array as input\n2. Initialize sum = 0\n3. Loop through array\n4. Add each element to sum\n5. Print total sum"
  },
  7: {
    title: "Largest Element",
    explanation: "👉 From an array, find:\n* The **biggest number**\n\n**Example:**\n[3, 9, 2] → 9\n\n**Meaning:**\n\"Which value is highest?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int max = arr[0];  // Start with first element
    // Compare with all others
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];  // Update if bigger found
        }
    }
    
    cout << max;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Assume first element is maximum\n3. Loop through rest of array\n4. If any element is bigger, update max\n5. Print the maximum"
  },
  8: {
    title: "Reverse Array",
    explanation: "👉 Given an array, print it in **reverse order**\n\n**Example:**\n[1,2,3] → [3,2,1]\n\n**Meaning:**\n\"Print from last to first\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    // Print from last to first
    for (int i = n - 1; i >= 0; i--) {
        cout << v[i] << " ";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Loop from last index (n-1) to first (0)\n3. Print each element\n4. Done! (We're just printing in reverse, not changing the array)"
  },
  9: {
    title: "Linear Search",
    explanation: "👉 Given an array and a number X,\nCheck:\n* Is X present in the array?\n\n**Example:**\n[5,7,9], X=7 → Found\n\n**Meaning:**\n\"Look at each element one by one and check\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    bool found = false;
    // Check each element
    for (int i = 0; i < n; i++) {
        if (v[i] == target) {
            found = true;
            break;  // Stop when found
        }
    }
    
    if (found) {
        cout << "Found";
    } else {
        cout << "Not Found";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array and target as input\n2. Loop through array\n3. Compare each element with target\n4. If match found → set found = true and break\n5. Print result"
  },
  10: {
    title: "Count Frequency",
    explanation: "👉 Count how many times each number appears\n\n**Example:**\n[1,2,1,3,2]\n1 → 2 times\n2 → 2 times\n3 → 1 time\n\n**Meaning:**\n\"How many times does each value repeat?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    // Use map to count frequency
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        freq[v[i]]++;  // Increase count for each number
    }
    
    // Print frequencies
    for (auto it : freq) {
        cout << it.first << " -> " << it.second << " times" << endl;
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Use map to store frequency\n3. Loop through array and increment count for each number\n4. Print all frequencies"
  },
  11: {
    title: "Reverse String",
    explanation: "👉 Given a word, print it backwards\n\n**Example:**\n\"cat\" → \"tac\"\n\n**Meaning:**\n\"Read characters from end to start\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Print from last to first character
    for (int i = s.length() - 1; i >= 0; i--) {
        cout << s[i];
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take string as input\n2. Loop from last character (length-1) to first (0)\n3. Print each character\n4. Done!"
  },
  12: {
    title: "Count Vowels",
    explanation: "👉 Count how many:\na, e, i, o, u\nare present in the string\n\n**Example:**\n\"apple\" → 2\n\n**Meaning:**\n\"How many vowels are there?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    int count = 0;
    // Check each character
    for (int i = 0; i < s.length(); i++) {
        char c = tolower(s[i]);  // Convert to lowercase
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            count++;  // Found a vowel
        }
    }
    
    cout << count;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take string as input\n2. Loop through each character\n3. Convert to lowercase for case-insensitive check\n4. If character is a vowel, increment count\n5. Print total count"
  },
  13: {
    title: "Palindrome Check",
    explanation: "👉 Check if string reads same forward & backward\n\n**Example:**\n\"madam\" → Yes\n\"hello\" → No\n\n**Meaning:**\n\"Is it same when reversed?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    bool isPalindrome = true;
    int left = 0, right = s.length() - 1;
    
    // Compare from both ends
    while (left < right) {
        if (s[left] != s[right]) {
            isPalindrome = false;
            break;
        }
        left++;
        right--;
    }
    
    if (isPalindrome) {
        cout << "Yes";
    } else {
        cout << "No";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take string as input\n2. Use two pointers: left (start) and right (end)\n3. Compare characters from both ends\n4. If any mismatch → Not palindrome\n5. If all match → Palindrome"
  },
  14: {
    title: "Remove Spaces",
    explanation: "👉 Remove all spaces from a sentence\n\n**Example:**\n\"hi there\" → \"hithere\"\n\n**Meaning:**\n\"Delete blank spaces\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    string result = "";
    // Add only non-space characters
    for (int i = 0; i < s.length(); i++) {
        if (s[i] != ' ') {
            result += s[i];  // Add character if not space
        }
    }
    
    cout << result;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take string as input\n2. Create empty result string\n3. Loop through each character\n4. If character is not space, add to result\n5. Print result"
  },
  15: {
    title: "Factorial (Recursive)",
    explanation: "👉 Same factorial, but function calls itself\n\n**Meaning:**\n\"Function solves small part and calls itself\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int factorial(int n) {
    // Base case: stop when n <= 1
    if (n <= 1) {
        return 1;
    }
    // Recursive case: n * factorial(n-1)
    return n * factorial(n - 1);
}

int main() {
    int n;
    cin >> n;
    cout << factorial(n);
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Base case: if n <= 1, return 1\n2. Recursive case: return n * factorial(n-1)\n3. Function calls itself with smaller value\n4. Eventually reaches base case and returns"
  },
  16: {
    title: "Sum of Digits",
    explanation: "👉 Given a number, add its digits\n\n**Example:**\n123 → 1+2+3 = 6\n\n**Meaning:**\n\"Break number into digits and add\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int sumOfDigits(int n) {
    // Base case: single digit
    if (n == 0) {
        return 0;
    }
    // Get last digit and add to sum of remaining digits
    return (n % 10) + sumOfDigits(n / 10);
}

int main() {
    int n;
    cin >> n;
    cout << sumOfDigits(n);
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Base case: if n == 0, return 0\n2. Get last digit: n % 10\n3. Remove last digit: n / 10\n4. Add last digit to sum of remaining digits\n5. Recursively process remaining number"
  },
  17: {
    title: "Print 1 to N",
    explanation: "👉 Print numbers from 1 to N using recursion\n\n**Meaning:**\n\"Call function again and again until 1\"",
    code: `#include <bits/stdc++.h>
using namespace std;

void print1ToN(int n) {
    // Base case: stop when n == 0
    if (n == 0) {
        return;
    }
    // First print 1 to n-1, then print n
    print1ToN(n - 1);
    cout << n << " ";
}

int main() {
    int n;
    cin >> n;
    print1ToN(n);
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Base case: if n == 0, return\n2. Recursively print 1 to n-1 first\n3. Then print n\n4. This ensures numbers print in order 1, 2, 3...n"
  },
  18: {
    title: "Binary Search",
    explanation: "👉 Search in a **sorted array**\nCheck middle element:\n* If equal → found\n* If smaller → go right\n* If bigger → go left\n\n**Meaning:**\n\"Divide array into half while searching\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    int left = 0, right = n - 1;
    bool found = false;
    
    while (left <= right) {
        int mid = (left + right) / 2;  // Middle element
        
        if (v[mid] == target) {
            found = true;
            break;
        } else if (v[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }
    
    if (found) {
        cout << "Found";
    } else {
        cout << "Not Found";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take sorted array and target\n2. Set left = 0, right = n-1\n3. Find middle element\n4. If middle == target → Found\n5. If middle < target → Search right half\n6. If middle > target → Search left half\n7. Repeat until found or left > right"
  },
  19: {
    title: "Bubble Sort",
    explanation: "👉 Compare adjacent elements\nSwap if in wrong order\n\n**Meaning:**\n\"Push big numbers to the end\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    // Outer loop: number of passes
    for (int i = 0; i < n - 1; i++) {
        // Inner loop: compare adjacent elements
        for (int j = 0; j < n - i - 1; j++) {
            if (v[j] > v[j + 1]) {
                // Swap if wrong order
                swap(v[j], v[j + 1]);
            }
        }
    }
    
    // Print sorted array
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Outer loop: n-1 passes\n3. Inner loop: compare adjacent elements\n4. If left > right, swap them\n5. After each pass, largest element bubbles to end\n6. Repeat until sorted"
  },
  20: {
    title: "Selection Sort",
    explanation: "👉 Find smallest element\nPut it at start\n\n**Meaning:**\n\"Select minimum and place correctly\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    // For each position
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;  // Assume current is minimum
        
        // Find actual minimum in remaining array
        for (int j = i + 1; j < n; j++) {
            if (v[j] < v[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum to current position
        swap(v[i], v[minIndex]);
    }
    
    // Print sorted array
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. For each position i, find minimum in remaining array\n3. Swap minimum with element at position i\n4. After each iteration, smallest element is at correct position\n5. Repeat until sorted"
  },
  21: {
    title: "Second Largest",
    explanation: "👉 Find second biggest number\n\n**Example:**\n[5,9,3,7] → 7\n\n**Meaning:**\n\"Find runner-up number\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    int first = INT_MIN, second = INT_MIN;
    
    // Find first and second largest
    for (int i = 0; i < n; i++) {
        if (v[i] > first) {
            second = first;  // Old first becomes second
            first = v[i];    // New first
        } else if (v[i] > second && v[i] != first) {
            second = v[i];  // Update second
        }
    }
    
    cout << second;
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Track first and second largest\n3. Loop through array\n4. If element > first: update first, old first becomes second\n5. Else if element > second: update second\n6. Print second largest"
  },
  22: {
    title: "Move Zeros",
    explanation: "👉 Move all zeros to end\n\n**Example:**\n[1,0,3,0,5] → [1,3,5,0,0]\n\n**Meaning:**\n\"Shift all zeros to back\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    int nonZeroIndex = 0;
    
    // Move all non-zeros to front
    for (int i = 0; i < n; i++) {
        if (v[i] != 0) {
            v[nonZeroIndex] = v[i];
            nonZeroIndex++;
        }
    }
    
    // Fill remaining with zeros
    while (nonZeroIndex < n) {
        v[nonZeroIndex] = 0;
        nonZeroIndex++;
    }
    
    // Print result
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Use two-pointer approach\n3. Move all non-zero elements to front\n4. Fill remaining positions with zeros\n5. Print result"
  },
  23: {
    title: "Prefix Sum",
    explanation: "👉 Create new array where:\neach element = sum till that index\n\n**Example:**\n[1,2,3] → [1,3,6]\n\n**Meaning:**\n\"Keep adding previous sum\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    vector<int> prefix(n);
    prefix[0] = v[0];  // First element stays same
    
    // Each element = previous prefix + current element
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + v[i];
    }
    
    // Print prefix sum array
    for (int i = 0; i < n; i++) {
        cout << prefix[i] << " ";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Create prefix array\n3. First element = original first element\n4. Each next element = previous prefix + current element\n5. Print prefix array"
  },
  24: {
    title: "Two Sum",
    explanation: "👉 Given array and target,\ncheck if two numbers add to target\n\n**Example:**\n[2,7,11], target=9 → Yes\n\n**Meaning:**\n\"Are there 2 numbers whose sum is target?\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    bool found = false;
    
    // Check all pairs
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (v[i] + v[j] == target) {
                found = true;
                break;
            }
        }
        if (found) break;
    }
    
    if (found) {
        cout << "Yes";
    } else {
        cout << "No";
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array and target as input\n2. Use nested loops to check all pairs\n3. If sum of any pair equals target → Found\n4. Print result"
  },
  25: {
    title: "Frequency Array",
    explanation: "👉 Store how many times each number appears\n\n**Meaning:**\n\"Use another array to count\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    // Find maximum to create frequency array
    int maxVal = *max_element(v.begin(), v.end());
    vector<int> freq(maxVal + 1, 0);
    
    // Count frequency of each number
    for (int i = 0; i < n; i++) {
        freq[v[i]]++;
    }
    
    // Print frequencies
    for (int i = 0; i <= maxVal; i++) {
        if (freq[i] > 0) {
            cout << i << " -> " << freq[i] << " times" << endl;
        }
    }
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Take array as input\n2. Find maximum value\n3. Create frequency array of size max+1\n4. Count frequency of each number\n5. Print all frequencies"
  },
  // Fallback for practice problems
  26: {
    title: "Practice Problem 1",
    explanation: "👉 This is a practice problem from your class.\n\n**Your task:**\n* Solve it independently\n* Try first, then fix errors\n* Don't watch solution first\n\n**Meaning:**\n\"Practice makes perfect! Try to solve it yourself first.\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    // Remember: logic first, then code!
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Read the problem carefully\n2. Write logic in English\n3. Create skeleton code\n4. Fill it step by step\n5. Test and fix errors"
  },
  27: {
    title: "Practice Problem 2",
    explanation: "👉 Continue solving class problems independently.\n\n**Your task:**\n* Build confidence through practice\n* Learn from mistakes\n* Keep trying\n\n**Meaning:**\n\"Every problem you solve makes you better!\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    // You can do it! 💪
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Understand the problem\n2. Break it into steps\n3. Write code\n4. Test it\n5. Fix any errors\n6. Celebrate when it works! 🎉"
  },
  28: {
    title: "Review Problem",
    explanation: "👉 Redo a problem you failed earlier.\n\n**Your task:**\n* Solve it independently\n* Without help\n* Prove to yourself you can do it\n\n**Meaning:**\n\"This is your confidence day! Show yourself how much you've learned.\"",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    // You've got this! ☕
    
    return 0;
}`,
    codeExplanation: "**Step by step:**\n1. Remember what you learned\n2. Apply the same logic\n3. Write the code\n4. You can do it! This time you'll succeed! 💪"
  }
};

// Get explanation for a problem ID
export const getExplanation = (problemId) => {
  return problemExplanations[problemId] || {
    title: "Problem",
    explanation: "Explanation not available for this problem yet.",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    codeExplanation: "Try to solve this problem step by step!"
  };
};
