import {useForm} from "@tanstack/react-form";
import {useEffect, useState} from "react";
import {Modal} from "../ui/Modal.tsx";
import type {WashInstructionItem} from "../../model/wash/washInstruction/washInstructionsListResponse.ts";
import {useWashTypeRecords} from "../../service/hooks/wash/useWashType.ts";
import {useIsotainerTankRecords} from "../../service/hooks/tank/useIsotainerTank.ts";

interface WashInstructionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: WashInstructionItem) => void;
    defaultValues?: WashInstructionItem;
    isSubmitting?: boolean;
}

export function WashInstructionModal({ isOpen, onClose, onSubmit, defaultValues, isSubmitting = false }: WashInstructionModalProps) {
    const { data: washTypeData, isLoading: isLoadingWashTypes } = useWashTypeRecords({ pageIndex: 0, pageSize: 100 });
    const { data: tankData, isLoading: isLoadingTanks } = useIsotainerTankRecords({ pageIndex: 0, pageSize: 100 });
    const [initialInstructedOn] = useState(() => {
        if (defaultValues?.instructedOn) {
            return defaultValues.instructedOn;
        }
        // Buffer 5 minutes ahead to pass backend (> DateTime.UtcNow) validation cleanly
        return new Date(Date.now() + 5 * 60 * 1000).toISOString();
    });
    const form = useForm({
        defaultValues: {
            instructedOn: defaultValues?.instructedOn ?? initialInstructedOn,
            tankNumber: defaultValues?.tankNumber ?? '',
            wash: defaultValues?.wash ?? '',
            isotainerTankId: defaultValues?.isotainerTankId ?? '',
            washInstructionsId: defaultValues?.washInstructionsId ?? '',
            washTypeId: defaultValues?.washTypeId ?? '',
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                instructedOn: defaultValues?.instructedOn ?? initialInstructedOn,
                tankNumber: defaultValues?.tankNumber ?? '',
                wash: defaultValues?.wash ?? '',
                isotainerTankId: defaultValues?.isotainerTankId ?? '',
                washInstructionsId: defaultValues?.washInstructionsId ?? '',
                washTypeId: defaultValues?.washTypeId ?? '',
            });
        }
    }, [defaultValues, isOpen, form]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create or Update Wash Instruction" maxWidthClass="max-w-[440px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                <form.Field
                    name="isotainerTankId"
                    validators={{
                        onChange: ({ value }) => (!value ? 'Tank is required' : undefined),
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Tank Number
                            </label>
                            <select
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                disabled={isLoadingTanks}
                                className={`w-full h-[36px] rounded border bg-surface-container-lowest px-3 text-sm text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 ${
                                    field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                }`}
                            >
                                <option value="" disabled>
                                    {isLoadingTanks ? 'Loading tanks...' : 'Select a tank'}
                                </option>
                                {tankData?.items.map((tank) => (
                                    <option key={tank.isotainerTankId} value={tank.isotainerTankId}>
                                        {tank.tankNumber}
                                    </option>
                                ))}
                            </select>
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-xs font-medium text-error">{field.state.meta.errors.join(', ')}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="washTypeId"
                    validators={{
                        onChange: ({ value }) => (!value ? 'Wash Type is required' : undefined),
                    }}
                >
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                                Wash Type
                            </label>
                            <select
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                disabled={isLoadingWashTypes}
                                className={`w-full h-[36px] rounded border bg-surface-container-lowest px-3 text-sm text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 ${
                                    field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                }`}
                            >
                                <option value="" disabled>
                                    {isLoadingWashTypes ? 'Loading wash types...' : 'Select a wash type'}
                                </option>
                                {washTypeData?.items.map((washType) => (
                                    <option key={washType.washTypeId} value={washType.washTypeId}>
                                        {washType.type}
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
                                {isSubmitting ? 'Saving...' : 'Save Wash instruction'}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </Modal>
    );
}