export const LeitnerBoxGrid = ({ boxStats, flashcardsLength }) => (
    <section className="mb-6 md:mb-8 bg-white border border-japandi-border rounded-xl p-3 md:p-4 shadow-2xs">
        <h3 className="text-[10px] uppercase tracking-wider text-japandi-muted font-extrabold mb-3 flex items-center justify-between">
            <span>Leitner Progression (Live Overdue Audit)</span>
        </h3>
        <div className="grid grid-cols-5 gap-1.5 md:gap-2">
            {[1, 2, 3, 4, 5].map(boxNum => {
                const stat = boxStats[boxNum] || { total: 0, overdue: 0 };
                const percentage = flashcardsLength > 0 ? (stat.total / flashcardsLength) * 100 : 0;
                const restingCount = stat.total - stat.overdue;
                return (
                    <div key={boxNum} className="bg-japandi-cream border border-japandi-border p-1.5 md:p-3 rounded-xl flex flex-col justify-between items-center text-center">
                        <span className="text-[9px] md:text-[10px] font-bold text-japandi-muted">Box {boxNum}</span>
                        <span className="text-sm md:text-lg font-extrabold text-japandi-charcoal my-0.5 md:my-1">{stat.total}</span>
                        <div className="flex flex-col gap-0.5 w-full text-[8px] md:text-[10px] font-medium mt-0.5 mb-1.5">
                            <span className="px-1 py-0.5 rounded bg-japandi-terracotta/10 text-japandi-terracotta">🚨 {stat.overdue} due</span>
                            <span className="px-1 py-0.5 rounded bg-japandi-olive/10 text-japandi-olive">⏳ {restingCount} sleep</span>
                        </div>
                        <div className="w-full bg-japandi-paper rounded-full h-1 overflow-hidden">
                            <div className="bg-japandi-olive h-1" style={{ width: `${percentage}%` }}></div>
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);
