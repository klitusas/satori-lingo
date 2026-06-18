export const Settings = ({ apiKey, setApiKey, resetDatabase, setCustomConfirm, triggerToast }) => {
    const handleClearAllData = () => {
        setCustomConfirm({
            title: 'Danger Zone: Hard Reset',
            message: 'This will wipe ALL your cards and return back to initial default items. This operation cannot be undone. Are you sure?',
            onConfirm: () => {
                resetDatabase();
                triggerToast('Database restored to default presets.', 'info');
                setCustomConfirm(null);
            }
        });
    };

    return (
        <div className="bg-white border rounded-2xl p-5 md:p-8 max-w-2xl mx-auto">
            <h3 className="font-serif text-xl font-extrabold mb-2">AI Setup & Key Settings</h3>
            <input
                type="password"
                placeholder="Paste your AIzaSy... developer key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-japandi-cream border rounded-xl font-mono"
            />
            <button
                onClick={handleClearAllData}
                className="px-4 py-3 bg-red-600 text-white text-xs uppercase tracking-wider font-bold rounded-xl mt-6"
            >
        Clear All Flashcard Data
            </button>
        </div>
    );
};
