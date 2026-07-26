interface RowActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
    onUnload?: () => void;
    onBookWash?: () => void;
    editLabel?: string;
    deleteLabel?: string;
    unloadLabel?: string;
    bookWashLabel?: string;
}

export function RowActions({
                               onEdit,
                               onDelete,
                               onUnload,
                               onBookWash,
                               editLabel = 'Edit',
                               deleteLabel = 'Delete',
                               unloadLabel = 'Unload',
                               bookWashLabel = 'Book Wash',
                           }: RowActionsProps) {
    return (
        <div className="flex items-center justify-end gap-2">
            {onBookWash && (
                <button
                    type="button"
                    onClick={onBookWash}
                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:text-amber-400 dark:hover:text-amber-950"
                >
                    {/* Sparkle/Sparkles or Droplet Icon */}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    {bookWashLabel}
                </button>
            )}

            {onUnload && (
                <button
                    type="button"
                    onClick={onUnload}
                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-blue-500/10 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-blue-400 dark:hover:text-white"
                >
                    {/* Arrow Down / Unload Icon */}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" />
                    </svg>
                    {unloadLabel}
                </button>
            )}

            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-on-primary font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    {editLabel}
                </button>
            )}

            {onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-error/10 text-error hover:bg-error hover:text-white font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-error/20"
                >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    {deleteLabel}
                </button>
            )}
        </div>
    );
}