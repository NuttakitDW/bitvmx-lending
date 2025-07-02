# Deploying to Vercel

This guide will help you deploy the BitVMX Lending Protocol frontend to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- [Vercel CLI](https://vercel.com/cli) installed (optional)

## Method 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. From the frontend directory, run:
```bash
vercel
```

3. Follow the prompts:
   - Confirm the directory
   - Link to your Vercel account
   - Choose project name (or use default)
   - Deploy!

## Method 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will auto-detect the framework (Create React App)

6. Click "Deploy"

## Method 3: Manual Deploy via Vercel Dashboard

1. Build the project locally:
```bash
npm run build
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Drag and drop the `build` folder to deploy

## Environment Variables

This mock frontend doesn't require any environment variables. If you add any in the future:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables

## Custom Domain

To add a custom domain:

1. Go to your project settings
2. Navigate to "Domains"
3. Add your domain and follow DNS configuration

## Deployment Configuration

The `vercel.json` file in this directory contains:
- Build command configuration
- Output directory setting
- SPA routing rewrites

No additional configuration needed!

## Troubleshooting

- **Build fails**: Check the build logs in Vercel dashboard
- **Routing issues**: The `vercel.json` includes SPA rewrites
- **404 errors**: Ensure the rewrites in `vercel.json` are correct

## Live URL

After deployment, your app will be available at:
- `https://[project-name].vercel.app`
- Any custom domains you configure