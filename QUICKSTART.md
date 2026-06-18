# Quick Start Guide

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Open browser**:
   - Navigate to http://localhost:3000

## 📁 Project Structure

```
satori-lingo-main/
├── src/
│   ├── components/         # React components
│   │   ├── Animations.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Header.jsx
│   │   ├── IngestPanel.jsx
│   │   ├── LeitnerBoxGrid.jsx
│   │   ├── Navigation.jsx
│   │   ├── Settings.jsx
│   │   ├── StudyDesk.jsx
│   │   ├── Toast.jsx
│   │   └── VocabularyDatabase.jsx
│   ├── utils/              # Utilities and hooks
│   │   ├── constants.js
│   │   ├── geminiApi.js
│   │   ├── helpers.js
│   │   └── hooks.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry
├── package.json           # Dependencies
├── vite.config.js         # Vite config
├── tailwind.config.js     # Tailwind config
└── manifest.json          # PWA manifest
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔑 AI Features Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it in Settings tab
3. Use AI Sensei, Mnemonic Generator, and Topic Deck Generator

## 📦 What Changed from Original?

### Before (Single HTML File)

- All code in one 1000+ line HTML file
- Inline React via CDN and Babel
- Inline Tailwind configuration
- Difficult to maintain and test

### After (React App)

- Modular component structure
- Proper build system with Vite
- Separated concerns (UI, logic, utilities)
- Better performance with optimized builds
- Easier to maintain and extend

## 🎨 Component Breakdown

### Main Views

- **StudyDesk** - Flashcard review interface
- **VocabularyDatabase** - Card management CRUD
- **IngestPanel** - Bulk import and AI generation
- **Settings** - Configuration

### Shared Components

- **Header** - App branding and stats
- **LeitnerBoxGrid** - Box statistics
- **Navigation** - Tab switcher
- **Toast** - Notifications
- **ConfirmDialog** - Confirmations
- **Animations** - SVG animations

## 💡 Tips

1. All data is stored in localStorage
2. Export backups regularly (Database tab)
3. Import from Google Keep using the format: `[] spanish phrase - english translation [context]`
4. AI features require internet connection
5. App works offline after first load (PWA)

## 🐛 Troubleshooting

**Port already in use?**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Build not working?**

```bash
npm run build
# Check dist/ folder
```

## 📚 Next Steps

- Customize colors in `tailwind.config.js`
- Add new components in `src/components/`
- Modify box intervals in `src/utils/constants.js`
- Extend API features in `src/utils/geminiApi.js`

Enjoy your refactored React app! 🎉
