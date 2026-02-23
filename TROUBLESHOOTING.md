# 🔧 Troubleshooting Backend Connection Issues

## Issue: "Connection Error" when running code

### Step 1: Verify Backend URL

1. Check your `.env.production` file in the root directory
2. It should contain:
   ```env
   VITE_BACKEND_URL=https://your-backend-service.onrender.com
   ```
3. Make sure:
   - URL starts with `https://` (not `http://`)
   - No trailing slash at the end
   - URL matches your Render service URL exactly

### Step 2: Verify Backend is Running

1. Go to Render dashboard: https://dashboard.render.com
2. Check your backend service status
3. Click on the service to see logs
4. Test the health endpoint directly in browser:
   ```
   https://your-backend-service.onrender.com/api/health
   ```
   Should return: `{"success": true, "message": "Backend is healthy ☕"}`

### Step 3: Check CORS Configuration on Render

1. Go to Render dashboard → Your backend service
2. Click **Environment** tab
3. Verify `FRONTEND_URL` is set to:
   ```
   https://ChaitanyaS36.github.io
   ```
4. If not set or incorrect, update it and save (Render will redeploy)

### Step 4: Rebuild Frontend

After updating `.env.production`, rebuild and redeploy:

```bash
npm run build
npm run deploy
```

### Step 5: Check Browser Console

1. Open your deployed site
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Try running code
5. Look for error messages - they will show the exact issue

### Step 6: Test Backend Directly

Open these URLs in your browser to test:

1. Health check:
   ```
   https://your-backend-service.onrender.com/api/health
   ```

2. Root endpoint:
   ```
   https://your-backend-service.onrender.com/
   ```

If these don't work, the backend might be:
- Still deploying (wait a few minutes)
- Sleeping (free tier - first request takes ~30 seconds)
- Crashed (check Render logs)

## Common Issues

### Issue: Backend URL has wrong format
**Solution**: Make sure it's:
- ✅ `https://service-name.onrender.com` (correct)
- ❌ `https://service-name.onrender.com/` (trailing slash - wrong)
- ❌ `http://service-name.onrender.com` (http instead of https - wrong)

### Issue: CORS Error
**Solution**: 
1. Update `FRONTEND_URL` on Render to: `https://ChaitanyaS36.github.io`
2. Redeploy backend (or wait for auto-redeploy)

### Issue: Backend is sleeping (free tier)
**Solution**: 
- First request after inactivity takes ~30 seconds
- This is normal for Render free tier
- Consider upgrading or use a service that doesn't sleep

### Issue: Environment variable not loaded
**Solution**:
1. Make sure `.env.production` exists in root directory
2. Rebuild: `npm run build`
3. Redeploy: `npm run deploy`

## Quick Test Commands

Test backend health:
```bash
curl https://your-backend-service.onrender.com/api/health
```

Test from browser console (on your deployed site):
```javascript
fetch('https://your-backend-service.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Still Not Working?

1. Check Render logs for errors
2. Verify backend service is "Live" (not "Building" or "Failed")
3. Make sure backend URL in `.env.production` matches Render service URL exactly
4. Clear browser cache and try again
5. Try in incognito/private window
