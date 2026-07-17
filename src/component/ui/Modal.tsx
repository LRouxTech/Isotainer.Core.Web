import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidthClass?: string; // e.g. "max-w-[440px]" or "max-w-[600px]"
}

export function Modal({ isOpen, onClose, title, children, maxWidthClass = 'max-w-[500px]' }: ModalProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                {/* Darkened overlay backdrop */}
                <Dialog.Overlay className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-[2px]" />

                {/* Modal Window Wrapper */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <Dialog.Content
                        className={`w-full ${maxWidthClass} rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl animate-in fade-in zoom-in-95 duration-200 focus:outline-none`}
                    >
                        {/* Header Section */}
                        <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
                            <Dialog.Title className="text-lg font-bold text-primary">
                                {title}
                            </Dialog.Title>
                            <Dialog.Close className="text-outline hover:text-on-surface rounded p-1 transition-colors">
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </Dialog.Close>
                        </div>

                        {/* Body Content */}
                        <div className="p-6">
                            {children}
                        </div>
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog.Root>
    );
}