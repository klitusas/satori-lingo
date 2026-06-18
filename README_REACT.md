# Satori Lingo — React Version

A minimal Japanese-Scandinavian spaced repetition flashcard app for learning Spanish, now rebuilt with React and modular components.

## ✨ Features

- **Leitner Box System**: 5-box spaced repetition system for optimal learning
- **Study Mode**: Interactive flashcard review with grading
- **AI Features**:
  - AI Sensei explanations powered by Google Gemini
  - Mnemonic image generation
  - Topic-based deck generation
- **Vocabulary Database**: Full CRUD operations with search and filters
- **Import/Export**: JSON backup and restore functionality
- **Google Keep Import**: Bulk import from Keep notes
- **PWA Support**: Works offline with service worker

## 🏗️ Project Structure

```
satori-lingo-main/
├── src/
│   ├── components/
│   │   ├── Animations.jsx          # SVG animation components
│   │   ├── ConfirmDialog.jsx       # Confirmation modal
│   │   ├── Header.jsx              # App header
│   │   ├── IngestPanel.jsx         # Bulk import view
│   │   ├── LeitnerBoxGrid.jsx      # Box statistics display
│   │   ├── Navigation.jsx          # Tab navigation
│   │   ├── Settings.jsx            # Settings view
│   │   ├── StudyDesk.jsx           # Study session view
│   │   ├── Toast.jsx               # Toast notifications
│   │   └── VocabularyDatabase.jsx  # Database management view
│   ├── utils/
│   │   ├── constants.js            # App constants and data
│   │   ├── geminiApi.js            # Google Gemini API integration
│   │   ├── helpers.js              # Utility functions
│   │   └── hooks.js                # Custom React hooks
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML entry point
├── manifest.json                   # PWA manifest
├── sw.js                          # Service worker
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔑 API Key Setup

To use AI features, you'll need a Google AI Studio API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it in the Settings tab of the app

## 📦 Component Overview

### Core Components

- **App.jsx**: Main application orchestrator
- **StudyDesk.jsx**: Handles flashcard review sessions
- **VocabularyDatabase.jsx**: Manages card CRUD operations
- **IngestPanel.jsx**: Bulk import and AI deck generation
- **Settings.jsx**: API key and database management

### UI Components

- **Header.jsx**: App branding and stats
- **LeitnerBoxGrid.jsx**: Visual representation of box stats
- **Navigation.jsx**: Tab switcher
- **Toast.jsx**: Notification system
- **ConfirmDialog.jsx**: Confirmation modals
- **Animations.jsx**: Decorative SVG animations

### Utilities

- **hooks.js**: `useFlashcards()` and `useToast()` custom hooks
- **geminiApi.js**: API integration functions
- **helpers.js**: Parsing and export utilities
- **constants.js**: App configuration and data

## 🎨 Styling

The app uses:

- **Tailwind CSS** for utility-first styling
- **Custom Japandi color palette** (cream, olive, terracotta)
- **Google Fonts**: Playfair Display (serif) and Plus Jakarta Sans (sans-serif)
- **Custom animations**: float, pulse-ring, sway, spin-slow

## 💾 Data Storage

- Flashcards stored in `localStorage` as `satori_lingo_cards`
- API key stored as `satori_lingo_apikey`
- Export/import via JSON files

## 📱 PWA Features

- Offline functionality via service worker
- App manifest for installation
- Responsive design (mobile-first)

## 🧪 Development

The project uses:

- **Vite** for fast development and building
- **React 18** with hooks
- **Tailwind CSS** for styling
- **PostCSS** for CSS processing

## 📄 License

© 2026 Satori Lingo Workspace

## 🔄 Migration from Original

This version refactors the original single-file HTML application into a modular React app with:

- Proper component separation
- Custom hooks for state management
- Cleaner code organization
- Better maintainability
- Same functionality and design
