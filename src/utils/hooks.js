import { useState, useEffect, useMemo } from 'react';
import { INITIAL_VOCABULARY, BOX_INTERVALS } from './constants';

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState(() => {
    const local = localStorage.getItem('satori_lingo_cards');
    return local ? JSON.parse(local) : INITIAL_VOCABULARY;
  });

  const [timeTick, setTimeTick] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTimeTick(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('satori_lingo_cards', JSON.stringify(flashcards));
  }, [flashcards]);

  const dueCards = useMemo(() => {
    const now = Date.now();
    return flashcards
      .filter(card => card.nextReview <= now)
      .sort((a, b) => a.nextReview - b.nextReview);
  }, [flashcards]);

  const boxStats = useMemo(() => {
    const now = Date.now();
    const stats = {
      1: { total: 0, overdue: 0 },
      2: { total: 0, overdue: 0 },
      3: { total: 0, overdue: 0 },
      4: { total: 0, overdue: 0 },
      5: { total: 0, overdue: 0 }
    };
    flashcards.forEach(card => {
      if (stats[card.box] !== undefined) {
        stats[card.box].total++;
        if (card.nextReview <= now) {
          stats[card.box].overdue++;
        }
      }
    });
    return stats;
  }, [flashcards, timeTick]);

  const gradeCard = (card, gotIt) => {
    let newBox = gotIt ? Math.min(5, card.box + 1) : 1;
    const calculatedInterval = BOX_INTERVALS[newBox];
    const nextReviewTimestamp = Date.now() + calculatedInterval;

    setFlashcards(prev =>
      prev.map(c => c.id === card.id ? { ...c, box: newBox, nextReview: nextReviewTimestamp } : c)
    );

    return { newBox, shouldRepeat: !gotIt };
  };

  const addCard = (card) => {
    const newCard = {
      id: Date.now().toString(),
      ...card,
      box: 1,
      nextReview: Date.now()
    };
    setFlashcards(prev => [newCard, ...prev]);
  };

  const updateCard = (cardId, updates) => {
    setFlashcards(prev =>
      prev.map(c => c.id === cardId ? { ...c, ...updates } : c)
    );
  };

  const deleteCard = (cardId) => {
    setFlashcards(prev => prev.filter(c => c.id !== cardId));
  };

  const resetDatabase = () => {
    setFlashcards(INITIAL_VOCABULARY);
  };

  const importCards = (cards) => {
    setFlashcards(cards);
  };

  return {
    flashcards,
    dueCards,
    boxStats,
    gradeCard,
    addCard,
    updateCard,
    deleteCard,
    resetDatabase,
    importCards,
    setFlashcards
  };
};

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return { toast, triggerToast };
};
