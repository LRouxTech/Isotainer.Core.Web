interface RowActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
    editLabel?: string;
    deleteLabel?: string;
}

export function RowActions({
                               onEdit,
                               onDelete,
                               editLabel = 'Edit',
                               deleteLabel = 'Delete',
                           }: RowActionsProps) {
    return (
        <div className="flex items-center justify-end gap-2">
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