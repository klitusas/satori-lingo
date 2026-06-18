import { useState, useMemo, useRef } from 'react';
import { SearchEmptyAnimation } from './Animations';
import { formatTimeRemaining } from '../utils/constants';
import { exportToJSON } from '../utils/helpers';

export const VocabularyDatabase = ({
    flashcards,
    addCard,
    updateCard,
    deleteCard,
    setFlashcards,
    triggerToast
}) => {
    const [manualSpanish, setManualSpanish] = useState('');
    const [manualEnglish, setManualEnglish] = useState('');
    const [manualContext, setManualContext] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBox, setFilterBox] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [editingCardId, setEditingCardId] = useState(null);
    const [editSpanish, setEditSpanish] = useState('');
    const [editEnglish, setEditEnglish] = useState('');
    const [editContext, setEditContext] = useState('');
    const fileInputRef = useRef(null);
    const [timeTick] = useState(Date.now());

    const handleManualAdd = (e) => {
        e.preventDefault();
        if (!manualSpanish.trim() || !manualEnglish.trim()) {
            triggerToast('Both Spanish phrase and English translation are required.', 'error');
            return;
        }

        const isDuplicate = flashcards.some(
            c => c.spanish.toLowerCase().trim() === manualSpanish.toLowerCase().trim()
        );

        if (isDuplicate) {
            triggerToast('This exact Spanish phrase already exists.', 'error');
            return;
        }

        addCard({
            spanish: manualSpanish.trim(),
            english: manualEnglish.trim(),
            context: manualContext.trim() || null
        });

        setManualSpanish('');
        setManualEnglish('');
        setManualContext('');
        triggerToast('Flashcard added manually!', 'success');
    };

    const handleStartEdit = (card) => {
        setEditingCardId(card.id);
        setEditSpanish(card.spanish);
        setEditEnglish(card.english);
        setEditContext(card.context || '');
    };

    const handleSaveEdit = () => {
        if (!editSpanish.trim() || !editEnglish.trim()) {
            triggerToast('Fields cannot be left blank.', 'error');
            return;
        }

        updateCard(editingCardId, {
            spanish: editSpanish.trim(),
            english: editEnglish.trim(),
            context: editContext.trim() || null
        });

        setEditingCardId(null);
        triggerToast('Changes saved successfully!', 'success');
    };

    const handleImportJSON = (e) => {
        const file = e.target.files[0];
        if (!file) { return; }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsedData = JSON.parse(event.target.result);
                if (!Array.isArray(parsedData)) {
                    triggerToast('Import failed: Backup file formatting must be a valid array.', 'error');
                    return;
                }

                let insertedCount = 0;
                let duplicateCount = 0;
                const absoluteDeckCopy = [...flashcards];

                parsedData.forEach(incomingCard => {
                    if (!incomingCard.spanish || !incomingCard.english) { return; }

                    const collisionDetected = absoluteDeckCopy.some(
                        existing => existing.spanish.toLowerCase().trim() === incomingCard.spanish.toLowerCase().trim()
                    );

                    if (!collisionDetected) {
                        absoluteDeckCopy.push({
                            id: incomingCard.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
                            spanish: incomingCard.spanish.trim(),
                            english: incomingCard.english.trim(),
                            context: incomingCard.context ? incomingCard.context.trim() : null,
                            box: typeof incomingCard.box === 'number' ? Math.max(1, Math.min(5, incomingCard.box)) : 1,
                            nextReview: typeof incomingCard.nextReview === 'number' ? incomingCard.nextReview : Date.now(),
                            aiSenseiCached: incomingCard.aiSenseiCached || null,
                            aiMnemonicCached: incomingCard.aiMnemonicCached || null
                        });
                        insertedCount++;
                    } else {
                        duplicateCount++;
                    }
                });

                setFlashcards(absoluteDeckCopy);
                triggerToast(`Import completed. Added ${insertedCount} items. (Skipped ${duplicateCount} duplicates)`, 'success');
                if (fileInputRef.current) { fileInputRef.current.value = ''; }
            } catch (parseErr) {
                console.error(parseErr);
                triggerToast('Failed to parse JSON file structure. Verify syntax integrity.', 'error');
            }
        };
        reader.readAsText(file);
    };

    const filteredCards = useMemo(() => {
        const now = Date.now();
        return flashcards.filter(card => {
            const query = searchQuery.toLowerCase();
            const matchesSearch = card.spanish.toLowerCase().includes(query)
        || card.english.toLowerCase().includes(query)
        || (card.context && card.context.toLowerCase().includes(query));

            const matchesBox = filterBox === 'all' || card.box.toString() === filterBox;

            let matchesStatus = true;
            const isOverdue = card.nextReview <= now;
            if (filterStatus === 'overdue') { matchesStatus = isOverdue; }
            if (filterStatus === 'resting') { matchesStatus = !isOverdue; }

            return matchesSearch && matchesBox && matchesStatus;
        });
    }, [flashcards, searchQuery, filterBox, filterStatus, timeTick]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2 bg-white border border-japandi-border rounded-2xl p-4 md:p-6 shadow-2xs flex flex-col justify-between">
                    <form onSubmit={handleManualAdd} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[9px] uppercase tracking-wider font-extrabold text-japandi-muted mb-1">Spanish phrase</label>
                            <input type="text" placeholder="e.g. echar de menos" value={manualSpanish} onChange={(e) => setManualSpanish(e.target.value)} className="w-full px-3 py-2 text-xs bg-japandi-cream border rounded-lg focus:outline-none min-h-[38px]" />
                        </div>
                        <div>
                            <label className="block text-[9px] uppercase tracking-wider font-extrabold text-japandi-muted mb-1">English translation</label>
                            <input type="text" placeholder="e.g. to miss someone" value={manualEnglish} onChange={(e) => setManualEnglish(e.target.value)} className="w-full px-3 py-2 text-xs bg-japandi-cream border rounded-lg focus:outline-none min-h-[38px]" />
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
                            <div className="flex-grow">
                                <label className="block text-[9px] uppercase tracking-wider font-extrabold text-japandi-muted mb-1">Context [notes]</label>
                                <input type="text" placeholder="e.g. Used mostly in Spain" value={manualContext} onChange={(e) => setManualContext(e.target.value)} className="w-full px-3 py-2 text-xs bg-japandi-cream border rounded-lg focus:outline-none min-h-[38px]" />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-japandi-olive text-white text-[11px] uppercase tracking-wider font-bold rounded-lg min-h-[38px]">Add</button>
                        </div>
                    </form>
                </div>

                <div className="bg-white border border-japandi-border rounded-2xl p-4 md:p-6 shadow-2xs flex flex-col justify-between gap-3">
                    <div>
                        <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-japandi-muted mb-1">Native Backup & File Hub</h4>
                        <p className="text-[11px] text-japandi-muted leading-tight">Export your collection or restore database files directly.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full">
                        <button
                            onClick={() => exportToJSON(flashcards, triggerToast)}
                            className="flex-1 py-2 px-3 border border-japandi-border bg-japandi-paper hover:bg-japandi-border text-japandi-charcoal text-xs font-bold rounded-lg transition duration-150 flex items-center justify-center gap-2 min-h-[36px]"
                        >
              📤 Export Backup (.json)
                        </button>

                        <label className="flex-1 py-2 px-3 bg-japandi-olive hover:bg-japandi-oliveHover text-white text-xs font-bold rounded-lg cursor-pointer transition duration-150 flex items-center justify-center gap-2 text-center min-h-[36px]">
              📥 Import Backup
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept=".json"
                                onChange={handleImportJSON}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-japandi-border rounded-2xl p-4 md:p-6 shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-japandi-muted mb-1.5">Search Vocabulary Query</label>
                        <input type="text" placeholder="Search Spanish, English..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-3.5 py-2 text-xs bg-japandi-cream border rounded-lg focus:outline-none min-h-[38px]" />
                    </div>
                    <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-japandi-muted mb-1.5">Leitner Level Filter</label>
                        <select value={filterBox} onChange={(e) => setFilterBox(e.target.value)} className="w-full px-3.5 py-2 text-xs bg-japandi-cream border rounded-lg focus:outline-none min-h-[38px]">
                            <option value="all">All Boxes (1 - 5)</option>
                            <option value="1">Box 1 (Immediate)</option>
                            <option value="2">Box 2 (24 hrs)</option>
                            <option value="3">Box 3 (3 days)</option>
                            <option value="4">Box 4 (7 days)</option>
                            <option value="5">Box 5 (14 days)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-japandi-muted mb-1.5">Live Spacing Status Filter</label>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3.5 py-2 text-xs bg-japandi-cream border rounded-lg focus:outline-none min-h-[38px]">
                            <option value="all">Show All Words</option>
                            <option value="overdue">🚨 Overdue Only</option>
                            <option value="resting">⏳ Resting Only</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-japandi-border rounded-2xl overflow-hidden shadow-2xs">
                {filteredCards.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-japandi-paper border-b text-[9px] uppercase tracking-wider text-japandi-muted">
                                    <th className="px-4 md:px-6 py-3.5 font-bold">Spanish Target</th>
                                    <th className="px-4 md:px-6 py-3.5 font-bold">English Meaning</th>
                                    <th className="px-4 md:px-6 py-3.5 font-bold">Context / Notes</th>
                                    <th className="px-4 md:px-6 py-3.5 font-bold text-center">Interval Status</th>
                                    <th className="px-4 md:px-6 py-3.5 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-xs md:text-sm">
                                {filteredCards.map(card => {
                                    const isEditing = editingCardId === card.id;
                                    const currentOverdueStatus = card.nextReview <= Date.now();
                                    return (
                                        <tr key={card.id} className="hover:bg-japandi-cream/50">
                                            <td className="px-4 md:px-6 py-3.5 font-bold">
                                                {isEditing ? <input type="text" value={editSpanish} onChange={(e) => setEditSpanish(e.target.value)} className="w-full px-2 py-1 border rounded text-xs min-h-[30px]" /> : card.spanish}
                                            </td>
                                            <td className="px-4 md:px-6 py-3.5">
                                                {isEditing ? <input type="text" value={editEnglish} onChange={(e) => setEditEnglish(e.target.value)} className="w-full px-2 py-1 border rounded text-xs min-h-[30px]" /> : card.english}
                                            </td>
                                            <td className="px-4 md:px-6 py-3.5 text-xs text-japandi-muted">
                                                {isEditing ? <input type="text" value={editContext} onChange={(e) => setEditContext(e.target.value)} className="w-full px-2 py-1 border rounded text-xs min-h-[30px]" /> : (card.context || <span className="italic text-gray-300">None</span>)}
                                            </td>
                                            <td className="px-4 md:px-6 py-3.5 text-center">
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <span className="inline-block px-2 py-0.5 bg-japandi-paper border rounded-full font-bold text-[11px]">Box {card.box}</span>
                                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${currentOverdueStatus ? 'bg-red-50 text-red-700' : 'bg-japandi-olive/10 text-japandi-olive'}`}>
                                                        {currentOverdueStatus ? '🚨 Overdue' : `⏳ ${formatTimeRemaining(card.nextReview)}`}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {isEditing ? (
                                                        <>
                                                            <button onClick={handleSaveEdit} className="px-2.5 py-1 bg-japandi-olive text-white text-[11px] font-bold rounded-lg min-h-[28px]">Save</button>
                                                            <button onClick={() => setEditingCardId(null)} className="px-2.5 py-1 bg-japandi-paper text-[11px] font-bold rounded-lg border min-h-[28px]">Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => { handleStartEdit(card); }} className="px-2.5 py-1 bg-japandi-paper border text-[11px] font-bold rounded-lg text-japandi-charcoal min-h-[28px]">Edit</button>
                                                            <button onClick={() => deleteCard(card.id)} className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-bold rounded-lg min-h-[28px]">Delete</button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10 text-japandi-muted text-xs flex flex-col items-center">
                        <SearchEmptyAnimation />
                        <p>No cards match the active filter configurations.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
