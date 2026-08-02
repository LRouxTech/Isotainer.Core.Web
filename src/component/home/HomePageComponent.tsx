import type {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "../ui/DataTable.tsx";
import type {IsotainerTankItem} from "../../model/tank/isotainerTank/isotainerTankListResponse.ts";
import {useState} from "react";
import {
    Package,
    Droplets,
    AlertTriangle,
    Clock
} from "lucide-react";

import {
    useCreateIsotainerTank, useDeleteIsotainerTank,
    useIsotainerTankRecords, useIsotainerTankStats, useUnloadIsotainerTank,
    useUpdateIsotainerTank
} from "../../service/hooks/tank/useIsotainerTank.ts";
import {RowActions} from "../ui/RowActions.tsx";
import {ConfirmationModal} from "../ui/ConfirmationModal.tsx";
import {IsotainerTankModal} from "./IsotainerTankModal.tsx";
import {useCompanyRecords} from "../../service/hooks/tank/useCompany.ts";
import {useWashStatusRecords} from "../../service/hooks/tank/useWashStatus.ts";
import {WASH_STATUS_CONFIG, WashStatusType} from "../../model/tank/washStatus/WashStatusListResponse.ts";
import {formatDate} from "../../service/helper/dateHelper.ts";
import type {WashInstructionItem} from "../../model/wash/washInstruction/washInstructionsListResponse.ts";
import {useCreateWashInstruction} from "../../service/hooks/wash/useWashInstruction.ts";
import {WashInstructionModal} from "../wash/WashInstructionModal.tsx";

export function HomePageComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IsotainerTankItem | undefined>(undefined);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<IsotainerTankItem | undefined>(undefined);
    const [isUnloadModalOpen, setIsUnloadModalOpen] = useState(false);
    const [unloadItem, setUnloadItem] = useState<IsotainerTankItem | undefined>(undefined);
    const [isWashInstructionModalOpen, setIsWashInstructionModalOpen] = useState(false);
    const [editingWashInstruction, setEditingWashInstructionItem] = useState<WashInstructionItem | undefined>(undefined);
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});

    const {data: recordsResponse, isLoading, isError} = useIsotainerTankRecords(pagination);
    const {data: companyData, isLoading: isLoadingCompanies} = useCompanyRecords({pageIndex: 0, pageSize: 100});
    const {data: washStatusData, isLoading: isLoadingWashStatuses} = useWashStatusRecords({
        pageIndex: 0,
        pageSize: 100
    });

    const updateMutation = useUpdateIsotainerTank();
    const createMutation = useCreateIsotainerTank();
    const deleteMutation = useDeleteIsotainerTank();
    const unloadMutation = useUnloadIsotainerTank();
    const createWashInstructionMutation = useCreateWashInstruction();
    const { data: tankStatsMutation, isLoading: isStatsLoading} = useIsotainerTankStats();

    const handleOpenDelete = (item: IsotainerTankItem) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await deleteMutation.mutateAsync(itemToDelete.isotainerTankId);
            setIsDeleteModalOpen(false);
            setItemToDelete(undefined);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleOpenEdit = (item: IsotainerTankItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingItem(undefined);
        setIsModalOpen(true);
    };

    const handleBookWash = (item: IsotainerTankItem) => {
        setEditingWashInstructionItem({
            instructedOn: "",
            tankNumber: "",
            wash: "",
            washInstructionsId: "",
            washTypeId: "",
            isotainerTankId: item.isotainerTankId
        });
        setIsWashInstructionModalOpen(true);
    };

    const handleWashInstructionSubmitForm = async (values: WashInstructionItem) => {
        try {
            if (values.washInstructionsId == "" || values.washInstructionsId == null) {
                await createWashInstructionMutation.mutateAsync({
                    isotainerTankId: values.isotainerTankId,
                    instructedOn: values.instructedOn,
                    washTypeId: values.washTypeId,
                });
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to create wash instruction:", error);
        }
    };

    const handleConfirmUnload = async () => {
        if (!unloadItem) return;

        try {
            await unloadMutation.mutateAsync(unloadItem.isotainerTankId);
            setIsDeleteModalOpen(false);
            setItemToDelete(undefined);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleUnload = (item: IsotainerTankItem) => {
        setUnloadItem(item);
        setIsUnloadModalOpen(true);
    };

    const handleSubmitForm = async (values: IsotainerTankItem) => {
        try {
            if (values.isotainerTankId == "" || values.isotainerTankId == null) {
                await createMutation.mutateAsync({
                    tankNumber: values.tankNumber,
                    companyId: values.companyId,
                });
            } else {
                await updateMutation.mutateAsync({
                    id: values.isotainerTankId,
                    request: {
                        tankNumber: values.tankNumber,
                        companyId: values.companyId,
                    },
                });
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to update/create isotainer tank:", error);
        }
    };

    const columns: ColumnDef<IsotainerTankItem>[] = [
        {
            accessorKey: 'tankNumber',
            header: 'Tank Number',
            cell: ({getValue}) => <span className="font-mono">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'companyId',
            header: 'Company',
            cell: ({getValue}) => {
                const companyId = getValue<string>();
                const companyName = companyData?.items.find((c) => c.companyId === companyId)?.name ?? 'N/A';

                return <span className="text-on-surface/80">{companyName}</span>;
            },
        },
        {
            accessorKey: 'washStatusId',
            header: 'Wash Status',
            cell: ({getValue}) => {
                const washStatusId = getValue<string>();
                const washStatus = washStatusData?.items.find((c) => c.washStatusId === washStatusId)?.type ?? 0;

                const config = WASH_STATUS_CONFIG[washStatus as WashStatusType] ?? {
                    label: 'Unknown',
                    badgeClass: 'bg-surface-container text-on-surface border-outline-variant',
                };

                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.badgeClass}`}>
                    {config.label}
                </span>
                );
            },
        },
        {
            accessorKey: 'loadedOn',
            header: 'Loaded Date',
            cell: ({getValue}) => {
                const value = getValue<string | null>();
                return (
                    <span className="font-medium text-on-surface">
                {formatDate(value)}
            </span>
                );
            },
        },
        {
            accessorKey: 'unloadedOn',
            header: 'Unloaded Date',
            cell: ({getValue}) => {
                const value = getValue<string | null>();
                return (
                    <span className="font-medium text-on-surface">
                {formatDate(value)}
            </span>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({row}) => {
                const washStatus = washStatusData?.items.find((c) => c.washStatusId === row.original.washStatusId)?.type ?? 0;

                return (<>
                        <RowActions
                            onBookWash={washStatus as WashStatusType !== WashStatusType.Booked ? () => handleBookWash(row.original) : undefined}
                            onUnload={!row.original.unloadedOn ? () => handleUnload(row.original) : undefined}
                            onEdit={() => handleOpenEdit(row.original)}
                            onDelete={() => handleOpenDelete(row.original)}
                        />
                    </>
                );
            }
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Tank Dashboard</h1>
                    <p className="text-sm text-on-surface-variant mt-1">
                        Real-time isotainer status and operational management.
                    </p>
                </div>

                <button
                    onClick={handleOpenCreate}
                    className="inline-flex items-center gap-2 h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Tank
                </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#F8F9FE]">
                <div className="bg-white rounded-md border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
                            Active Tanks
                          </span>
                        <Package className="w-5 h-5 text-[#1E295B]" />
                    </div>
                    {isStatsLoading ? (
                            <div className="h-8 w-24 bg-slate-200 rounded my-2 animate-pulse" />
                        ) :
                    <div className="text-3xl font-extrabold text-slate-900 my-2">
                        {tankStatsMutation?.totalActiveTanks.toLocaleString() ?? "0"}
                    </div>
                    }
                </div>

                {/* 2. WASH IN-PROGRESS */}
                <div className="bg-white rounded-md border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
                        Wash In-Progress
                      </span>
                        <Droplets className="w-5 h-5 text-blue-500" />
                    </div>
                    {isStatsLoading ? (
                            <div className="h-8 w-24 bg-slate-200 rounded my-2 animate-pulse" />
                        ) :
                    <div className="text-3xl font-extrabold text-slate-900 my-2">
                        {tankStatsMutation?.totalWashesBooked ?? "0"}
                    </div>
                    }
                </div>

                {/* 3. DIRTY INVENTORY */}
                <div className="bg-white rounded-md border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
                            Dirty Inventory
                          </span>
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    {isStatsLoading ? (
                            <div className="h-8 w-24 bg-slate-200 rounded my-2 animate-pulse" />
                        ) :
                    <div className="text-3xl font-extrabold text-slate-900 my-2">
                        {tankStatsMutation?.totalNewInventory ?? "0"}
                    </div>
                    }
                </div>

                {/* 4. AVERAGE TURNAROUND */}
                <div className="bg-white rounded-md border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
                            Average Turnaround
                          </span>
                        <Clock className="w-5 h-5 text-slate-700" />
                    </div>
                    {isStatsLoading ? (
                            <div className="h-8 w-24 bg-slate-200 rounded my-2 animate-pulse" />
                        ) :
                    <div className="text-3xl font-extrabold text-slate-900 my-2">
                        {tankStatsMutation?.averageTurnaroundTime ?? "0 Days"}
                    </div>
                    }
                </div>
            </div>

            <hr className="border-outline-variant/60"/>

            {(isLoading && isLoadingCompanies && isLoadingWashStatuses) ? (
                <div
                    className="flex flex-col items-center justify-center h-48 rounded-lg border border-outline-variant bg-surface-container-lowest gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"/>
                    <p className="text-xs text-outline font-medium">Fetching tanks...</p>
                </div>
            ) : isError ? (
                <div
                    className="flex flex-col items-center justify-center h-48 rounded-lg border border-error/20 bg-error-container/10 p-4 text-center">
                    <svg className="text-error mb-2" width="24" height="24" fill="none" stroke="currentColor"
                         strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="text-sm font-bold text-on-surface">Failed to load cost configurations</p>
                    <p className="text-xs text-on-surface-variant mt-1">Please verify your server connection and try
                        again.</p>
                </div>
            ) : (
                <DataTable columns={columns}
                           data={recordsResponse?.items ?? []}
                           pageCount={recordsResponse?.totalPages ?? 0}
                           totalCount={recordsResponse?.totalCount ?? 0}
                           pagination={pagination}
                           onPaginationChange={setPagination}
                           isLoading={isLoading}
                />
            )}

            <IsotainerTankModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitForm}
                defaultValues={editingItem}
                isSubmitting={updateMutation.isPending}
            />
            <WashInstructionModal
                isOpen={isWashInstructionModalOpen}
                onClose={() => setIsWashInstructionModalOpen(false)}
                onSubmit={handleWashInstructionSubmitForm}
                defaultValues={editingWashInstruction}
                isSubmitting={createWashInstructionMutation.isPending}
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(undefined);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Isotainer tank"
                message={`Are you sure you want to delete "${itemToDelete?.tankNumber}"? This action cannot be undone.`}
                confirmText="Delete"
                isDanger={true}
                isPending={deleteMutation.isPending}
            />
            <ConfirmationModal
                isOpen={isUnloadModalOpen}
                onClose={() => {
                    setIsUnloadModalOpen(false);
                    setUnloadItem(undefined);
                }}
                onConfirm={handleConfirmUnload}
                title="Unload Tank"
                message={`Are you sure you want to unload "${itemToDelete?.tankNumber}"? This action cannot be undone.`}
                confirmText="Unload"
                isDanger={true}
                isPending={deleteMutation.isPending}
            />
        </div>
    );
}