import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeitnerBoxGrid } from './components/LeitnerBoxGrid';
import { Navigation } from './components/Navigation';
import { StudyDesk } from './components/StudyDesk';
import { VocabularyDatabase } from './components/VocabularyDatabase';
import { IngestPanel } from './components/IngestPanel';
import { Settings } from './components/Settings';
import { Toast } from './components/Toast';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useFlashcards, useToast } from './utils/hooks';

function App() {
    const {
        flashcards,
        dueCards,
        boxStats,
        gradeCard,
        addCard,
        updateCard,
        deleteCard,
        resetDatabase,
        setFlashcards
    } = useFlashcards();

    const { toast, triggerToast } = useToast();

    const [apiKey, setApiKey] = useState(() => localStorage.getItem('satori_lingo_apikey') || '');

    const [activeTab, setActiveTab] = useState('study');
    const [customConfirm, setCustomConfirm] = useState(null);

    useEffect(() => {
        localStorage.setItem('satori_lingo_apikey', apiKey);
    }, [apiKey]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-12 flex flex-col min-h-screen">
            <Toast toast={toast} />
            <ConfirmDialog customConfirm={customConfirm} setCustomConfirm={setCustomConfirm} />

            <Header flashcardsCount={flashcards.length} dueCardsCount={dueCards.length} />

            <LeitnerBoxGrid boxStats={boxStats} flashcardsLength={flashcards.length} />

            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                dueCardsLength={dueCards.length}
                flashcardsLength={flashcards.length}
            />

            <main className="flex-grow">
                {activeTab === 'study' && (
                    <StudyDesk
                        dueCards={dueCards}
                        gradeCard={gradeCard}
                        updateCard={updateCard}
                        apiKey={apiKey}
                        triggerToast={triggerToast}
                    />
                )}

                {activeTab === 'database' && (
                    <VocabularyDatabase
                        flashcards={flashcards}
                        addCard={addCard}
                        updateCard={updateCard}
                        deleteCard={deleteCard}
                        setFlashcards={setFlashcards}
                        triggerToast={triggerToast}
                    />
                )}

                {activeTab === 'ingest' && (
                    <IngestPanel
                        flashcards={flashcards}
                        setFlashcards={setFlashcards}
                        apiKey={apiKey}
                        triggerToast={triggerToast}
                    />
                )}

                {activeTab === 'settings' && (
                    <Settings
                        apiKey={apiKey}
                        setApiKey={setApiKey}
                        resetDatabase={resetDatabase}
                        setCustomConfirm={setCustomConfirm}
                        triggerToast={triggerToast}
                    />
                )}
            </main>

            <footer className="mt-12 pt-5 border-t border-japandi-border text-center text-[11px] text-japandi-muted">
                <p>© 2026 Satori Lingo Workspace. Silent PWA Leitner Box Mode with Data Portability Engine.</p>
            </footer>
        </div>
    );
}

export default App;
