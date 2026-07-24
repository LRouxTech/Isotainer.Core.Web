import type {ColumnDef} from "@tanstack/react-table";
import {Link} from "@tanstack/react-router";
import {DataTable} from "../../ui/DataTable.tsx";
import {useState} from "react";
import type {CompanyItem} from "../../../model/tank/company/companyItem.ts";
import {
    useCompanyRecords,
    useCreateCompany,
    useDeleteCompany,
    useUpdateCompany
} from "../../../service/hooks/tank/useCompany.ts";
import {CompanyModal} from "./CompanyModal.tsx";
import {ConfirmationModal} from "../../ui/ConfirmationModal.tsx";

export function CompanyRoute() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CompanyItem | undefined>(undefined);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CompanyItem | undefined>(undefined);

    const { data: recordsResponse, isLoading, isError } = useCompanyRecords();

    const updateMutation = useUpdateCompany();
    const createMutation = useCreateCompany();
    const deleteMutation = useDeleteCompany();

    const handleOpenDelete = (item: CompanyItem) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await deleteMutation.mutateAsync(itemToDelete.companyId);
            setIsDeleteModalOpen(false);
            setItemToDelete(undefined);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleOpenEdit = (item: CompanyItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingItem(undefined);
        setIsModalOpen(true);
    };

    const handleSubmitForm = async (values: CompanyItem) => {
        try {
            if(values.companyId == "" || values.companyId == null) {
                await createMutation.mutateAsync({
                    name: values.name
                });
            } else {
                await updateMutation.mutateAsync({
                    id: values.companyId,
                    request: {
                        name: values.name,
                    },
                });
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to update/create company name:", error);
        }
    };

    const columns: ColumnDef<CompanyItem>[] = [
        {
            accessorKey: 'name',
            header: 'Company Name',
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => (
                <div className="flex justify-end items-center gap-2">
                    <button
                        onClick={() => handleOpenEdit(row.original)}
                        className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-on-primary font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                    </button>

                    <button
                        onClick={() => handleOpenDelete(row.original)}
                        className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-error/10 text-error hover:bg-error hover:text-white font-semibold text-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-error/20"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const tableData = [...(recordsResponse?.items ?? [])].sort((a, b) =>
        a.companyId.localeCompare(b.companyId)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/master-data" className="text-outline hover:text-on-surface">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Company Directory</h1>
                        <p className="text-xs text-on-surface-variant">Active partner associations and carrier clients.</p>
                    </div>
                </div>

                <button
                    onClick={handleOpenCreate}
                    className="inline-flex items-center gap-2 h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Company
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48 rounded-lg border border-outline-variant bg-surface-container-lowest gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-xs text-outline font-medium">Fetching price matrices...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center h-48 rounded-lg border border-error/20 bg-error-container/10 p-4 text-center">
                    <svg className="text-error mb-2" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="text-sm font-bold text-on-surface">Failed to load cost configurations</p>
                    <p className="text-xs text-on-surface-variant mt-1">Please verify your server connection and try again.</p>
                </div>
            ) : (
                <DataTable columns={columns} data={tableData} pageSize={5} />
            )}

            <CompanyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitForm}
                defaultValues={editingItem}
                isSubmitting={updateMutation.isPending}
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(undefined);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Company"
                message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                isDanger={true}
                isPending={deleteMutation.isPending}
            />
        </div>
    );
}