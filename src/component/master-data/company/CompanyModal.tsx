import type {CompanyItem} from "../../../model/tank/company/companyItem.ts";
import {useForm} from "@tanstack/react-form";
import {useEffect} from "react";
import {Modal} from "../../ui/Modal.tsx";

interface CompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: CompanyItem) => void;
    defaultValues?: CompanyItem;
    isSubmitting?: boolean;
}

export function CompanyModal({ isOpen, onClose, onSubmit, defaultValues, isSubmitting = false }: CompanyModalProps) {
    const form = useForm({
        defaultValues: {
            companyId: defaultValues?.companyId ?? '',
            name: defaultValues?.name ?? '',
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                companyId: defaultValues?.companyId ?? '',
                name: defaultValues?.name ?? '',
            });
        }
    }, [defaultValues, isOpen, form]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create or Update Company" maxWidthClass="max-w-[440px]">
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                {isSubmitting ? 'Saving...' : 'Save Company'}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </Modal>
    );
}