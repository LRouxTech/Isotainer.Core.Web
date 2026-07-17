import { useForm } from '@tanstack/react-form';
import {Modal} from "../../ui/Modal.tsx";

export interface GeneralCostFormValues {
    itemName: string;
    costCode: string;
    price: number;
}

interface GeneralCostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: GeneralCostFormValues) => void;
    defaultValues?: GeneralCostFormValues;
}

export function GeneralCostModal({ isOpen, onClose, onSubmit, defaultValues }: GeneralCostModalProps) {
    const form = useForm({
        defaultValues: defaultValues || {
            itemName: '',
            costCode: '',
            price: 0,
        },
        onSubmit: async ({ value }) => {
            onSubmit(value);
            onClose();
        },
    });

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
                {/* Item Name Input (Disabled if editing) */}
                <form.Field
                    name="itemName"
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
                                placeholder="e.g. Standard Wash Surcharge"
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

                {/* Cost Code Input */}
                <form.Field
                    name="costCode"
                    validators={{
                        onChange: ({ value }) => (!value ? 'Cost Code is required' : undefined),
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Cost Code
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value.toUpperCase())} // Auto force uppercase codes
                                placeholder="e.g. SRCH-STD-01"
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

                {/* Price Input (Number Validation) */}
                <form.Field
                    name="price"
                    validators={{
                        onChange: ({ value }) => {
                            if (value === undefined || value === null) return 'Price is required';
                            if (isNaN(value)) return 'Price must be a number';
                            if (value < 0) return 'Price cannot be negative';
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
                                    step="0.01"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(parseFloat(e.target.value) || 0)}
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
                        className="h-[36px] px-4 rounded border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container/10"
                    >
                        Cancel
                    </button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Cost Item'}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </Modal>
    );
}