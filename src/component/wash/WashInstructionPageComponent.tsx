import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/DataTable.tsx";
import { formatDate } from "../../service/helper/dateHelper.ts";
import type { WashInstructionItem } from "../../model/wash/washInstruction/washInstructionsListResponse.ts";
import {
    useWashInstructionRecords,
    useCreateWashInstruction,
    useDeleteWashInstruction
} from "../../service/hooks/wash/useWashInstruction.ts";
import {WashInstructionModal} from "./WashInstructionModal.tsx";
import {ConfirmationModal} from "../ui/ConfirmationModal.tsx";

export function WashInstructionPageComponent() {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [isWashInstructionModalOpen, setIsWashInstructionModalOpen] = useState(false);
    const [selectedInstruction, setSelectedInstruction] = useState<WashInstructionItem | undefined>(undefined);
    const [isFinishedFilter, setIsFinishedFilter] = useState<boolean | undefined>(undefined);
    const [isDeleteWashModalOpen, setIsDeleteWashModalOpen] = useState(false);
    const [deleteWashItem, setDeleteWashItem] = useState<WashInstructionItem | undefined>(undefined);

    const { data: recordsResponse, isLoading, isError } = useWashInstructionRecords(pagination, isFinishedFilter ?? false);

    const createWashInstructionMutation = useCreateWashInstruction();
    const deletWashInstructionMutation = useDeleteWashInstruction();

    const handleOpenBookWash = () => {
        setSelectedInstruction(undefined);
        setIsWashInstructionModalOpen(true);
    };

    const handleDeleteWashItem = (item: WashInstructionItem) => {
        setDeleteWashItem(item);
        setIsDeleteWashModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteWashItem) return;

        try {
            await deletWashInstructionMutation.mutateAsync(deleteWashItem.washInstructionsId);
            setIsDeleteWashModalOpen(false);
            setDeleteWashItem(undefined);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleWashInstructionSubmitForm = async (values: WashInstructionItem) => {
        try {
            await createWashInstructionMutation.mutateAsync({
                isotainerTankId: values.isotainerTankId,
                instructedOn: values.instructedOn,
                washTypeId: values.washTypeId,
            });
            setIsWashInstructionModalOpen(false);
        } catch (error) {
            console.error("Failed to submit wash instruction:", error);
        }
    };

    const columns: ColumnDef<WashInstructionItem>[] = [
        {
            accessorKey: 'tankNumber',
            header: 'Tank Number',
            cell: ({ getValue }) => <span className="font-mono font-bold text-on-surface">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'wash',
            header: 'Wash Type',
            cell: ({ getValue }) => <span className="font-mono font-bold text-on-surface">{getValue<string>()}</span>,

        },
        {
            accessorKey: 'instructedOn',
            header: 'Instructed On',
            cell: ({ getValue }) => {
                const value = getValue<string | null>();
                return (
                    <span className="font-mono text-xs text-on-surface-variant">
                        {formatDate(value)}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => handleDeleteWashItem(row.original)}
                            className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-blue-500/10 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-blue-400 dark:hover:text-white"
                        >
                            {/* Arrow Down / Unload Icon */}
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" />
                            </svg>
                            Cancel Wash
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-on-surface">Washing Instruction Board</h1>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                        Manage and schedule isotainer decontamination workflows.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border border-outline-variant/60 bg-surface-container-lowest">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Awaiting Wash</span>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-extrabold text-on-surface">12</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-error/10 text-error">-3</span>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-outline-variant/60 bg-surface-container-lowest">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">In Progress</span>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-extrabold text-on-surface">08</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600">+2</span>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-outline-variant/60 bg-surface-container-lowest">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Scheduled Today</span>
                    <div className="mt-2">
                        <span className="text-2xl font-extrabold text-on-surface">24</span>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-outline-variant/60 bg-surface-container-lowest">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Avg. Turnaround</span>
                    <div className="mt-2">
                        <span className="text-2xl font-extrabold text-on-surface">4.2h</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Side: Title & Description */}
                <div>
                    <h1 className="text-2xl font-bold text-on-surface">Washing Instruction Board</h1>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                        Manage and schedule isotainer decontamination workflows.
                    </p>
                </div>

                {/* Right Side: Pushed to the far end using ml-auto */}
                <div className="flex items-center gap-3 ml-auto">
                    {/* Status Filter Dropdown */}
                    <select
                        value={isFinishedFilter === undefined ? '' : String(isFinishedFilter)}
                        onChange={(e) => {
                            const val = e.target.value;
                            setIsFinishedFilter(val === '' ? undefined : val === 'true');
                            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                        }}
                        className="h-[36px] px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs font-semibold text-on-surface focus:border-primary focus:outline-none cursor-pointer"
                    >
                        <option value="">All Statuses</option>
                        <option value="false">In Progress / Pending</option>
                        <option value="true">Finished</option>
                    </select>

                    <button
                        type="button"
                        onClick={handleOpenBookWash}
                        className="inline-flex items-center gap-2 h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add Wash
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48 rounded-lg border border-outline-variant bg-surface-container-lowest gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-xs text-outline font-medium">Loading wash instructions...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center h-48 rounded-lg border border-error/20 bg-error-container/10 p-4 text-center">
                    <p className="text-sm font-bold text-on-surface">Failed to load wash instructions</p>
                    <p className="text-xs text-on-surface-variant mt-1">Please verify your server connection and try again.</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={recordsResponse?.items ?? []}
                    pageCount={recordsResponse?.totalPages ?? 0}
                    totalCount={recordsResponse?.totalCount ?? 0}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    isLoading={isLoading}
                />
            )}

            <WashInstructionModal
                isOpen={isWashInstructionModalOpen}
                onClose={() => setIsWashInstructionModalOpen(false)}
                onSubmit={handleWashInstructionSubmitForm}
                defaultValues={selectedInstruction}
                isSubmitting={createWashInstructionMutation.isPending}
            />

            <ConfirmationModal
                isOpen={isDeleteWashModalOpen}
                onClose={() => {
                    setIsDeleteWashModalOpen(false);
                    setDeleteWashItem(undefined);
                }}
                onConfirm={handleConfirmDelete}
                title="Cancel wash"
                message={`Are you sure you want to cancel wash "${deleteWashItem?.wash}" for "${deleteWashItem?.tankNumber}"? This action cannot be undone.`}
                confirmText="Cancel"
                isDanger={true}
                isPending={deletWashInstructionMutation.isPending}
            />
        </div>
    );
}