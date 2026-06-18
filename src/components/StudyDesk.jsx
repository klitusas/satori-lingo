import { useState, useEffect } from 'react';
import { ZenClearedAnimation, SenseiLoaderAnimation } from './Animations';
import { generateAISenseiExplanation, generateMnemonic } from '../utils/geminiApi';

export const StudyDesk = ({
    dueCards,
    gradeCard,
    updateCard,
    apiKey,
    triggerToast
}) => {
    const [sessionCards, setSessionCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [aiSenseiLoading, setAiSenseiLoading] = useState(false);
    const [aiSenseiContent, setAiSenseiContent] = useState(null);
    const [aiMnemonicLoading, setAiMnemonicLoading] = useState(false);

    useEffect(() => {
        if (dueCards.length > 0) {
            setSessionCards([...dueCards]);
            setCurrentIndex(0);
            setIsRevealed(false);
            setAiSenseiContent(null);
        } else {
            setSessionCards([]);
        }
    }, [dueCards]);

    const currentActiveCard = sessionCards[currentIndex];
    const cardsRemainingInSession = Math.max(0, sessionCards.length - currentIndex);

    const handleGradeCard = (gotIt) => {
        if (sessionCards.length === 0 || currentIndex >= sessionCards.length) { return; }
        const currentCard = sessionCards[currentIndex];

        const result = gradeCard(currentCard, gotIt);

        if (!gotIt) {
            const updatedCardWithReset = { ...currentCard, box: 1, nextReview: Date.now() };
            setSessionCards(prev => [...prev, updatedCardWithReset]);
            triggerToast('Kept in cycle. Appended to back of queue!', 'info');
        } else {
            triggerToast(`Advanced to Box ${result.newBox}!`, 'success');
        }

        setIsRevealed(false);
        setAiSenseiContent(null);
        setCurrentIndex(prev => prev + 1);
    };

    const handleAskAiSensei = async (card) => {
        if (!apiKey) {
            triggerToast('Please add your Google AI Studio API key in settings to use AI features.', 'error');
            return;
        }
        setAiSenseiLoading(true);
        setAiSenseiContent(null);

        try {
            const responseText = await generateAISenseiExplanation(card, apiKey);
            setAiSenseiContent(responseText);
            updateCard(card.id, { aiSenseiCached: responseText });
            triggerToast('AI Sensei explanation loaded and cached!', 'success');
        } catch (err) {
            console.error(err);
            triggerToast('Failed to fetch AI Sensei context. Check network or API key.', 'error');
        } finally {
            setAiSenseiLoading(false);
        }
    };

    const handleSketchMnemonic = async (card) => {
        if (!apiKey) {
            triggerToast('Please add your Google AI Studio API key in settings to use AI features.', 'error');
            return;
        }
        setAiMnemonicLoading(true);

        try {
            const imageUrl = await generateMnemonic(card, apiKey);
            updateCard(card.id, { aiMnemonicCached: imageUrl });
            triggerToast('Mnemonic sketch generated successfully!', 'success');
        } catch (err) {
            console.error(err);
            triggerToast('Failed to sketch mnemonic image. Check AI billing, configuration, or key.', 'error');
        } finally {
            setAiMnemonicLoading(false);
        }
    };

    const startStudySession = () => {
        if (dueCards.length > 0) {
            setSessionCards([...dueCards]);
            setCurrentIndex(0);
            setIsRevealed(false);
            setAiSenseiContent(null);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 flex flex-col items-stretch">
                {cardsRemainingInSession > 0 && currentActiveCard ? (
                    <div className="flex flex-col gap-5 md:gap-6">
                        <div className="bg-white border-2 border-japandi-border rounded-2xl p-5 md:p-12 shadow-sm relative min-h-[300px] flex flex-col justify-between">
                            <div className="flex items-center justify-between text-xs text-japandi-muted pb-3 border-b border-japandi-paper mb-4 md:mb-6">
                                <span className="uppercase tracking-widest font-extrabold text-japandi-terracotta text-[10px]">Review Active</span>
                                <span className="font-mono text-[11px]">{cardsRemainingInSession} cards left</span>
                            </div>

                            <div className="flex-grow flex flex-col justify-center items-center text-center py-4 md:py-6">
                                {!isRevealed ? (
                                    <div className="space-y-3">
                                        <span className="text-[10px] tracking-wider text-japandi-muted uppercase block font-bold">English recall prompt</span>
                                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-japandi-charcoal leading-snug">{currentActiveCard.english}</h2>
                                    </div>
                                ) : (
                                    <div className="space-y-5 md:space-y-6 w-full">
                                        <div className="border-b border-japandi-paper pb-3 mb-3">
                                            <p className="text-sm text-japandi-muted italic font-medium">{currentActiveCard.english}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-japandi-olive">{currentActiveCard.spanish}</h2>
                                        </div>
                                        {currentActiveCard.context && (
                                            <div className="bg-japandi-paper inline-block rounded-lg px-3.5 py-2 border border-japandi-border text-xs text-japandi-muted">
                                                {currentActiveCard.context}
                                            </div>
                                        )}
                                        {currentActiveCard.aiMnemonicCached && (
                                            <div className="mt-4 flex flex-col items-center animate-float">
                                                <img src={currentActiveCard.aiMnemonicCached} alt="Mnemonic" className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl border bg-japandi-cream" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-japandi-paper pt-4 md:pt-6 mt-6">
                                {!isRevealed ? (
                                    <button onClick={() => setIsRevealed(true)} className="w-full py-3 md:py-4 px-6 bg-japandi-olive hover:bg-japandi-oliveHover text-white font-bold rounded-xl text-xs md:text-sm uppercase tracking-wider">Reveal Target Translation</button>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        <button onClick={() => handleGradeCard(false)} className="py-3 md:py-4 px-3 bg-[#E5DCD8] text-japandi-charcoal font-bold rounded-xl border border-[#D5C6C0] text-xs uppercase tracking-wider">Forgot It (B1)</button>
                                        <button onClick={() => handleGradeCard(true)} className="py-3 md:py-4 px-3 bg-japandi-olive hover:bg-japandi-oliveHover text-white font-bold rounded-xl text-xs uppercase tracking-wider">Got It (+1 Box)</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {isRevealed && (
                            <div className="bg-white border border-japandi-border rounded-2xl p-4 md:p-6 shadow-2xs flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button onClick={() => handleAskAiSensei(currentActiveCard)} disabled={aiSenseiLoading} className="flex-1 py-3 px-4 bg-japandi-paper text-japandi-charcoal font-bold text-xs rounded-xl border border-japandi-border disabled:opacity-50 min-h-[44px]">
                                        {aiSenseiLoading ? 'Consulting Sensei...' : '💡 Ask AI Sensei Explainer'}
                                    </button>
                                    {!currentActiveCard.aiMnemonicCached && (
                                        <button onClick={() => handleSketchMnemonic(currentActiveCard)} disabled={aiMnemonicLoading} className="flex-1 py-3 px-4 bg-japandi-paper text-japandi-charcoal font-bold text-xs rounded-xl border border-japandi-border disabled:opacity-50 min-h-[44px]">
                                            {aiMnemonicLoading ? 'Drawing Mnemonic...' : '🎨 Sketch Mnemonic Image'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white border border-japandi-border rounded-2xl p-6 md:p-12 text-center shadow-2xs py-10 flex flex-col items-center">
                        <ZenClearedAnimation />
                        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-japandi-charcoal mb-2">Workspace Cleared</h3>
                        <button onClick={startStudySession} className="px-5 py-3 bg-japandi-olive hover:bg-japandi-oliveHover text-white text-xs uppercase tracking-wider font-bold rounded-xl mt-4">Reset & Practice All Cards Due</button>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-[#F5F3EF] border border-japandi-border rounded-2xl p-5 md:p-6 shadow-inner min-h-[250px] flex flex-col">
                    <h3 className="font-serif text-base font-bold text-japandi-charcoal border-b pb-3 mb-4 shrink-0">AI Sensei Explanations</h3>
                    {aiSenseiLoading && (
                        <div className="flex-grow flex flex-col items-center justify-center text-center py-6 text-japandi-muted">
                            <SenseiLoaderAnimation />
                            <p className="text-[11px] font-medium">Analyzing linguistics...</p>
                        </div>
                    )}
                    {!aiSenseiLoading && !aiSenseiContent && !currentActiveCard?.aiSenseiCached && (
                        <div className="text-center py-10 text-japandi-muted"><p className="text-xs italic leading-relaxed">Reveal the answer on your card and click "Ask AI Sensei".</p></div>
                    )}
                    {!aiSenseiLoading && (aiSenseiContent || currentActiveCard?.aiSenseiCached) && (
                        <div className="text-xs leading-relaxed whitespace-pre-wrap max-h-[350px] overflow-y-auto pr-2">{aiSenseiContent || currentActiveCard?.aiSenseiCached}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
