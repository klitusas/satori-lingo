export const Header = ({ flashcardsCount, dueCardsCount }) => (
    <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-japandi-border pb-5 mb-6 md:mb-8 gap-4">
        <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase bg-japandi-terracotta/20 text-japandi-terracotta font-bold rounded-full">Spaced Repetition</span>
                <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase bg-japandi-olive/10 text-japandi-olive font-bold rounded-full">Quiet-Mode Active</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-japandi-charcoal leading-none">
          Satori Lingo <span className="italic text-japandi-terracotta font-serif">悟り</span>
            </h1>
            <p className="text-xs text-japandi-muted mt-2 max-w-md">
          A minimal Japanese-Scandinavian workspace focusing purely on visual recall and the classic Leitner Box system.
            </p>
        </div>

        <div className="flex items-center gap-4 bg-japandi-paper border border-japandi-border p-3 md:p-4 rounded-xl">
            <div className="flex-1 text-center pr-4 border-r border-japandi-border">
                <span className="block text-[9px] md:text-[10px] uppercase tracking-wider text-japandi-muted font-bold">System Deck</span>
                <span className="text-lg md:text-xl font-extrabold text-japandi-charcoal">{flashcardsCount}</span>
            </div>
            <div className="flex-1 text-center">
                <span className="block text-[9px] md:text-[10px] uppercase tracking-wider text-japandi-muted font-bold">Due Right Now</span>
                <span className="text-lg md:text-xl font-extrabold text-japandi-terracotta">{dueCardsCount}</span>
            </div>
        </div>
    </header>
);
