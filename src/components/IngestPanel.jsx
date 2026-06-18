import { useState } from 'react';
import { parseKeepLines } from '../utils/helpers';
import { generateTopicDeck } from '../utils/geminiApi';

export const IngestPanel = ({ flashcards, setFlashcards, apiKey, triggerToast }) => {
    const [bulkInput, setBulkInput] = useState('');
    const [customTopic, setCustomTopic] = useState('');
    const [aiGeneratingTopic, setAiGeneratingTopic] = useState(false);

    const handleLoadIngestData = () => {
        if (!bulkInput.trim()) {
            triggerToast('Please input some lines to parse.', 'error');
            return;
        }

        const parsedCards = parseKeepLines(bulkInput);
        if (parsedCards.length === 0) {
            triggerToast('Could not extract any cards. Make sure phrases are separated by dashes.', 'error');
            return;
        }

        let duplicatesFiltered = 0;
        const freshDeck = [...flashcards];

        parsedCards.forEach(parsed => {
            const isDuplicate = flashcards.some(
                card => card.spanish.toLowerCase() === parsed.spanish.toLowerCase()
            );

            if (!isDuplicate) {
                freshDeck.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    spanish: parsed.spanish,
                    english: parsed.english,
                    context: parsed.context,
                    box: 1,
                    nextReview: Date.now()
                });
            } else {
                duplicatesFiltered++;
            }
        });

        setFlashcards(freshDeck);
        setBulkInput('');
        triggerToast(`Successfully loaded ${parsedCards.length - duplicatesFiltered} cards!`, 'success');
    };

    const handleGenerateTopicDeck = async () => {
        if (!apiKey) {
            triggerToast('Please enter an API Key in settings first.', 'error');
            return;
        }
        if (!customTopic.trim()) {
            triggerToast('Please describe a scenario (e.g. Asking directions in Seville)', 'error');
            return;
        }
        setAiGeneratingTopic(true);

        try {
            const cards = await generateTopicDeck(customTopic, apiKey);

            let addedCount = 0;
            const updatedList = [...flashcards];

            cards.forEach(card => {
                const isDuplicate = flashcards.some(
                    existing => existing.spanish.toLowerCase() === card.spanish.trim().toLowerCase()
                );
                if (!isDuplicate) {
                    updatedList.push({
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                        spanish: card.spanish.trim(),
                        english: card.english.trim(),
                        context: card.context ? card.context.trim() : null,
                        box: 1,
                        nextReview: Date.now()
                    });
                    addedCount++;
                }
            });

            setFlashcards(updatedList);
            setCustomTopic('');
            triggerToast(`AI added ${addedCount} custom phrases for: "${customTopic}"!`, 'success');
        } catch (err) {
            console.error(err);
            triggerToast('AI Topic builder encountered an processing error. Try standardizing your prompt.', 'error');
        } finally {
            setAiGeneratingTopic(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white border border-japandi-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-serif text-xl font-extrabold mb-2">Ingest Google Keep</h3>
                    <textarea
                        rows="6"
                        placeholder="[] tuve una idea- to came up with an idea"
                        value={bulkInput}
                        onChange={(e) => setBulkInput(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-japandi-cream border rounded-xl font-mono"
                    />
                </div>
                <button
                    onClick={handleLoadIngestData}
                    className="w-full py-3.5 bg-japandi-olive text-white font-bold text-xs uppercase tracking-wider rounded-xl mt-4"
                >
          Load & Filter Duplicate Phrases
                </button>
            </div>

            <div className="bg-white border border-japandi-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col justify-between gap-4">
                <div>
                    <h3 className="font-serif text-xl font-extrabold mb-2">AI Topic Deck Generator</h3>
                    <input
                        type="text"
                        placeholder="e.g., Checking into a boutique hotel in Seville"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-japandi-cream border rounded-xl min-h-[38px]"
                    />
                </div>
                <button
                    onClick={handleGenerateTopicDeck}
                    disabled={aiGeneratingTopic || !apiKey}
                    className="w-full py-3.5 bg-japandi-terracotta text-white font-bold text-xs uppercase tracking-wider rounded-xl disabled:opacity-50 min-h-[44px]"
                >
                    {aiGeneratingTopic ? 'Consulting Model...' : 'Generate AI Custom Scenario Deck'}
                </button>
            </div>
        </div>
    );
};
