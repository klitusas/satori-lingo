# GitHub Pages Deployment Guide

## 🚀 Automatic Deployment Setup

Your repo is now configured to automatically deploy to GitHub Pages on every push to `main`.

## 📋 Setup Steps

### 1. Push to GitHub

```bash
cd /Users/797365/Downloads/satori-lingo-main
git init
git add .
git commit -m "Initial commit - React app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/satori-lingo.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo on GitHub: `https://github.com/YOUR_USERNAME/satori-lingo`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Click **Save**

### 3. Update Repository Name in Config

If your repo name is **not** `satori-lingo`, update `vite.config.js`:

```js
base: process.env.GITHUB_PAGES ? '/YOUR-REPO-NAME/' : '/',
```

### 4. Trigger Deployment

The workflow will automatically run when you:

- Push to `main` branch
- Manually trigger from Actions tab

Or manually trigger:

1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages"
3. Click **Run workflow**

## 🌐 Access Your Site

After deployment (2-3 minutes), your site will be live at:

```
https://YOUR_USERNAME.github.io/satori-lingo/
```

## 🔧 Local Testing Before Deploy

```bash
# Test production build locally
npm run build
npm run preview
```

## 📝 Custom Domain (Optional)

1. Add a `CNAME` file to `/public` folder:

   ```
   your-domain.com
   ```

2. Update DNS records at your domain provider:

   ```
   Type: CNAME
   Name: www (or @)
   Value: YOUR_USERNAME.github.io
   ```

3. In GitHub Settings → Pages → Custom domain:
   - Enter: `your-domain.com`
   - Check "Enforce HTTPS"

## ⚙️ Workflow Details

The GitHub Action:

- ✅ Triggers on push to `main`
- ✅ Installs dependencies with `npm ci`
- ✅ Builds with `npm run build`
- ✅ Deploys `dist/` folder to GitHub Pages
- ✅ Uses Node.js 20

## 🐛 Troubleshooting

**Build fails?**

- Check the Actions tab for error logs
- Ensure `package.json` has correct dependencies
- Test build locally: `npm run build`

**Assets not loading?**

- Verify `base` path in `vite.config.js` matches your repo name
- Check browser console for 404 errors

**Service worker issues?**

- Clear browser cache
- Update `sw.js` cache version

## 🔄 Workflow File Location

`.github/workflows/deploy.yml`
