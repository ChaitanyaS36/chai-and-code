# 🚀 Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to `http://localhost:3000`
   - Start learning! ☕

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure Overview

```
chai-and-code/
├── src/
│   ├── components/        # React components
│   ├── data/             # Learning plan data
│   ├── services/         # Storage and AI services
│   ├── App.jsx           # Main app
│   └── main.jsx          # Entry point
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS config
```

## Environment Variables (Optional)

If you want to integrate a real AI API, create a `.env` file:

```env
VITE_OPENAI_API_KEY=your_api_key_here
# or
VITE_GEMINI_API_KEY=your_api_key_here
```

Then update `src/services/aiService.js` to use the API key.

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will suggest another port automatically.

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Make sure all dependencies are installed:
```bash
npm install
```

## Next Steps

1. Review the 14-day plan in `src/data/learningPlan.js`
2. Customize problems if needed
3. Integrate AI API (optional)
4. Deploy to Vercel/Netlify when ready

Happy coding! ☕
