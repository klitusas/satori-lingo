export const Navigation = ({ activeTab, setActiveTab, dueCardsLength, flashcardsLength }) => {
    const tabs = [
        { id: 'study', label: 'Study Desk', count: dueCardsLength },
        { id: 'database', label: 'Browse Vocabulary', count: flashcardsLength },
        { id: 'ingest', label: 'Add & Import Keep' },
        { id: 'settings', label: 'AI Key & Settings' }
    ];

    return (
        <nav className="flex border-b border-japandi-border mb-6 md:mb-8 gap-2 overflow-x-auto scrollbar-none whitespace-nowrap -mx-4 px-4 md:mx-0 md:px-0">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold tracking-wide transition duration-200 border-b-2 shrink-0 ${
                        activeTab === tab.id
                            ? 'border-japandi-olive text-japandi-olive font-extrabold'
                            : 'border-transparent text-japandi-muted'
                    }`}
                >
                    {tab.label} {tab.count !== undefined && `(${tab.count})`}
                </button>
            ))}
        </nav>
    );
};
