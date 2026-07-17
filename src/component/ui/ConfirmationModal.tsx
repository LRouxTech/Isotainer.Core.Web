import { Modal } from './Modal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    isDanger?: boolean;
    isPending?: boolean;
}

export function ConfirmationModal({
                                      isOpen,
                                      onClose,
                                      onConfirm,
                                      title,
                                      message,
                                      confirmText = 'Confirm',
                                      isDanger = false,
                                      isPending = false,
                                  }: ConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidthClass="max-w-[400px]">
            <p className="text-sm text-on-surface-variant leading-relaxed">
                {message}
            </p>

            <div className="mt-6 flex justify-end gap-3 border-t border-outline-variant/60 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="h-[36px] px-4 rounded border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container/10"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isPending}
                    className={`h-[36px] px-4 rounded text-sm font-semibold text-white transition-colors ${
                        isDanger ? 'bg-error hover:bg-error/90' : 'bg-primary hover:bg-primary/90'
                    } disabled:opacity-40`}
                >
                    {isPending ? 'Processing...' : confirmText}
                </button>
            </div>
        </Modal>
    );
}