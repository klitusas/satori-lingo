export const INITIAL_VOCABULARY = [
  { id: '1', spanish: 'tuve una idea', english: 'I came up with an idea', context: 'Used with preterite past tense', box: 1, nextReview: Date.now() },
  { id: '2', spanish: 'Lo que resulta en que', english: 'which results in', context: 'Connector phrase for formal explanations', box: 2, nextReview: Date.now() - 5000 },
  { id: '3', spanish: '¿Cómo se come esto?', english: 'How does that work?', context: 'Idiomatic expression. Lit: How is this eaten?', box: 3, nextReview: Date.now() - 10000 },
  { id: '4', spanish: 'Desde luego', english: 'of course', context: 'Emphatic agreement', box: 4, nextReview: Date.now() - 20000 },
  { id: '5', spanish: 'Tomar el pelo', english: "to pull someone's leg", context: 'Lit: to take the hair', box: 5, nextReview: Date.now() + 86400000 }
];

export const BOX_INTERVALS = {
  1: 0,
  2: 24 * 60 * 60 * 1000,
  3: 3 * 24 * 60 * 60 * 1000,
  4: 7 * 24 * 60 * 60 * 1000,
  5: 14 * 24 * 60 * 60 * 1000
};

export const formatTimeRemaining = (targetTime) => {
  const diff = targetTime - Date.now();
  if (diff <= 0) return "Overdue";

  const mins = Math.ceil(diff / (60 * 1000));
  if (mins < 60) return `In ${mins}m`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `In ${hrs}h`;

  const days = Math.floor(hrs / 24);
  return `In ${days}d`;
};
