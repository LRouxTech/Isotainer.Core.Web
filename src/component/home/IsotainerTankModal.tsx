import {useForm} from "@tanstack/react-form";
import {useEffect} from "react";
import {Modal} from "../ui/Modal.tsx";
import {useCompanyRecords} from "../../service/hooks/tank/useCompany.ts";
import type {IsotainerTankItem} from "../../model/tank/isotainerTank/isotainerTankListResponse.ts";

interface IsotainerTankModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: IsotainerTankItem) => void;
    defaultValues?: IsotainerTankItem;
    isSubmitting?: boolean;
}

export function IsotainerTankModal({ isOpen, onClose, onSubmit, defaultValues, isSubmitting = false }: IsotainerTankModalProps) {
    const { data: companyData, isLoading: isLoadingCompanies } = useCompanyRecords({ pageIndex: 0, pageSize: 100 });

    const form = useForm({
        defaultValues: {
            isotainerTankId: defaultValues?.isotainerTankId ?? '',
            tankNumber: defaultValues?.tankNumber ?? '',
            companyId: defaultValues?.companyId ?? '',
            unloadedOn: defaultValues?.unloadedOn ?? '',
            loadedOn: defaultValues?.loadedOn ?? '',
            washStatusId: defaultValues?.washStatusId ?? '',
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                isotainerTankId: defaultValues?.isotainerTankId ?? '',
                tankNumber: defaultValues?.tankNumber ?? '',
                companyId: defaultValues?.companyId ?? '',
                unloadedOn: defaultValues?.unloadedOn ?? '',
                loadedOn: defaultValues?.loadedOn ?? '',
                washStatusId: defaultValues?.washStatusId ?? '',
            });
        }
    }, [defaultValues, isOpen, form]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create or Update Isotainer Tank" maxWidthClass="max-w-[440px]">
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
                    name="tankNumber"
                    validators={{
                        onChange: ({ value }) => (!value ? 'Tank Number is required' : undefined),
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Tank Number
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="e.g. ISO-102934"
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

                {/* Company Dropdown */}
                <form.Field
                    name="companyId"
                    validators={{
                        onChange: ({ value }) => (!value ? 'Company is required' : undefined),
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Company
                            </label>
                            <select
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                disabled={isLoadingCompanies}
                                className={`w-full h-[36px] rounded border bg-surface-container-lowest px-3 text-sm text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 ${
                                    field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                }`}
                            >
                                <option value="" disabled>
                                    {isLoadingCompanies ? 'Loading companies...' : 'Select a company'}
                                </option>
                                {companyData?.items.map((company) => (
                                    <option key={company.companyId} value={company.companyId}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
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
                                {isSubmitting ? 'Saving...' : 'Save Isotainer Tank'}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </Modal>
    );
}