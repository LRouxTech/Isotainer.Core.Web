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
import {RowActions} from "../../ui/RowActions.tsx";

export function CompanyRoute() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CompanyItem | undefined>(undefined);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CompanyItem | undefined>(undefined);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [search, setSearch] = useState<string>();

    const { data: recordsResponse, isLoading, isError } = useCompanyRecords({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search,
    });

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
                <RowActions
                    onEdit={() => handleOpenEdit(row.original)}
                    onDelete={() => handleOpenDelete(row.original)}
                />
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
                <div className="flex">
                    <div className="relative w-full sm:w-80">
                        <svg className="absolute left-3 top-2.5 text-outline" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-9 pl-9 pr-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                        />
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
                <DataTable columns={columns}
                           data={tableData ?? []}
                           pageCount={recordsResponse?.totalPages ?? 0}
                           totalCount={recordsResponse?.totalCount ?? 0}
                           pagination={pagination}
                           onPaginationChange={setPagination}
                           isLoading={isLoading}
                />
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