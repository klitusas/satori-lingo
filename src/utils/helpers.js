export const parseKeepLines = (text) => {
    const lines = text.split('\n');
    const parsed = [];

    lines.forEach(line => {
        let cleanLine = line.trim();
        if (!cleanLine) { return; }

        cleanLine = cleanLine.replace(/^\[\s*[xX]?\s*\]\s*/, '');

        let extractedContext = null;
        const bracketMatch = cleanLine.match(/\[(.*?)\]/);
        if (bracketMatch) {
            extractedContext = bracketMatch[1].trim();
            cleanLine = cleanLine.replace(/\[.*?\]/, '').trim();
        }

        const parts = cleanLine.split(/\s*(?:[-–—])\s*/);
        if (parts.length >= 2) {
            const spanish = parts[0].trim();
            const english = parts.slice(1).join(' - ').trim();
            if (spanish && english) {
                parsed.push({ spanish, english, context: extractedContext });
            }
        } else if (cleanLine.length > 0) {
            parsed.push({ spanish: cleanLine, english: '', context: extractedContext });
        }
    });
    return parsed;
};

export const exportToJSON = (flashcards, triggerToast) => {
    try {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(flashcards, null, 2))}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `satori_lingo_backup_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        triggerToast('Vocabulary database backup exported successfully!', 'success');
    } catch (err) {
        console.error(err);
        triggerToast('Failed to compile database export file asset.', 'error');
    }
};
