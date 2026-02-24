# Setting up Render with Docker for g++ Support

Since Render's native Node.js runtime doesn't allow installing system packages like `g++`, we need to use Docker.

## Option 1: Recreate Service with Docker (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Delete the existing service** (or keep it for now and create a new one)
3. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `ChaitanyaS36/chai-and-code`
   - Configure:
     - **Name**: `chai-and-code-backend` (or any name you prefer)
     - **Region**: Choose closest to you
     - **Branch**: `main`
     - **Root Directory**: `server` (important!)
     - **Runtime**: **Docker** (select this)
     - **Dockerfile Path**: `Dockerfile` (or leave blank if Dockerfile is in `server/` directory)
     - **Docker Context**: Leave blank (or set to `server` if needed)
   - **Environment Variables**:
     - `NODE_ENV` = `production`
     - `PORT` = `10000`
     - `FRONTEND_URL` = `https://chaitanyas36.github.io`
   - Click "Create Web Service"

4. **Wait for deployment** (5-10 minutes for first build)

## Option 2: Use Render Blueprint (render.yaml)

If you want to use Infrastructure as Code:

1. Make sure `render.yaml` is in your repository root
2. In Render Dashboard, go to "Blueprints"
3. Click "New Blueprint"
4. Connect your GitHub repo
5. Render will automatically detect `render.yaml` and create the service with Docker

## Verify Dockerfile Location

The Dockerfile should be at: `server/Dockerfile`

If Render can't find it, you may need to:
- Set **Root Directory** to `server` in Render settings
- Or move Dockerfile to repository root and update paths

## After Deployment

1. Check logs to ensure g++ is installed
2. Test the `/api/health` endpoint
3. Try compiling code via `/api/code/execute`

## Troubleshooting

If Docker build fails:
- Check that `Dockerfile` is in the `server/` directory
- Verify Root Directory is set to `server` in Render settings
- Check Render logs for specific error messages
