export const Toast = ({ toast }) => {
    if (!toast) { return null; }

    return (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:bottom-6 md:right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl bg-white border-japandi-border text-japandi-charcoal animate-bounce">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${toast.type === 'success' ? 'bg-japandi-olive' : toast.type === 'error' ? 'bg-red-500' : 'bg-japandi-terracotta'}`}></span>
            <p className="text-xs md:text-sm font-medium">{toast.message}</p>
        </div>
    );
};
