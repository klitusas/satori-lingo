export const ConfirmDialog = ({ customConfirm, setCustomConfirm }) => {
    if (!customConfirm) { return null; }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-japandi-cream border border-japandi-border rounded-2xl p-5 md:p-6 max-w-md w-full shadow-2xl">
                <h3 className="font-serif text-lg md:text-xl font-bold text-japandi-charcoal mb-2">{customConfirm.title}</h3>
                <p className="text-japandi-muted text-xs md:text-sm mb-6">{customConfirm.message}</p>
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => setCustomConfirm(null)}
                        className="px-4 py-2 border border-japandi-border text-xs rounded-xl hover:bg-japandi-paper transition duration-200 min-h-[40px] font-medium"
                    >
            Cancel
                    </button>
                    <button
                        onClick={customConfirm.onConfirm}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-xl transition duration-200 min-h-[40px] font-medium"
                    >
            Confirm Action
                    </button>
                </div>
            </div>
        </div>
    );
};
