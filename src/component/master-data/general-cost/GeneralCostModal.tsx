import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { Modal } from "../../ui/Modal.tsx";
import type { GeneralCostItem } from "../../../model/finance/generalCost/generalCostListResponse.ts";

interface GeneralCostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: GeneralCostItem) => void;
    defaultValues?: GeneralCostItem;
    isSubmitting?: boolean;
}

export function GeneralCostModal({ isOpen, onClose, onSubmit, defaultValues, isSubmitting = false }: GeneralCostModalProps) {
    // 1. Initialize TanStack Form explicitly tied to your GeneralCostItem model fields
    const form = useForm({
        defaultValues: {
            generalCostId: defaultValues?.generalCostId ?? '',
            name: defaultValues?.name ?? '',
            cost: defaultValues?.cost ?? 0,
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    // 2. Clear out stale input cached states when a user swaps rows or creates a brand new item
    useEffect(() => {
        if (isOpen) {
            form.reset({
                generalCostId: defaultValues?.generalCostId ?? '',
                name: defaultValues?.name ?? '',
                cost: defaultValues?.cost ?? 0,
            });
        }
    }, [defaultValues, isOpen, form]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Set General Cost Item" maxWidthClass="max-w-[440px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                {/* Item Name Input */}
                <form.Field
                    name="name"
                    validators={{
                        onChange: ({ value }) => (!value ? 'Item Name is required' : undefined),
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Item Name
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                disabled={true}
                                className={`w-full h-[36px] rounded border bg-surface-container-lowest px-3 text-sm text-on-surface placeholder:text-outline transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none ${
                                    field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                }`}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-xs font-medium text-error">{field.state.meta.errors.join(', ')}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Cost/Price Input */}
                <form.Field
                    name="cost"
                    validators={{
                        onChange: ({ value }) => {
                            if (value === undefined || value === null || value === 0) return 'Price is required';
                            const numValue = Number(value);
                            if (isNaN(numValue)) return 'Price must be a number';
                            if (numValue < 0) return 'Price cannot be negative';
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Price (USD)
                            </label>
                            <div className="relative flex items-center h-[36px]">
                                <span className="absolute left-3 text-sm font-bold text-outline select-none">
                                    $
                                </span>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    step="0.1"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const raw = e.target.value;
                                        field.handleChange(raw === '' ? 0 : parseFloat(raw));
                                    }}
                                    placeholder="0.00"
                                    className={`w-full h-full rounded border bg-surface-container-lowest pl-7 pr-3 text-sm text-on-surface placeholder:text-outline transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none ${
                                        field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                    }`}
                                />
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-xs font-medium text-error">{field.state.meta.errors.join(', ')}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Action Controls Footer */}
                <div className="mt-6 flex justify-end gap-3 border-t border-outline-variant/60 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-[36px] px-4 rounded border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container/10 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <form.Subscribe selector={(state) => [state.canSubmit]}>
                        {([canSubmit]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting && (
                                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-on-primary border-t-transparent" />
                                )}
                                {isSubmitting ? 'Saving...' : 'Save Cost Item'}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </Modal>
    );
}