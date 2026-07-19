import { useState } from "react";
import { GeneralCostModal } from "./GeneralCostModal.tsx";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { DataTable } from "../../ui/DataTable.tsx";
import type { GeneralCostItem } from "../../../model/finance/generalCost/generalCostListResponse.ts";
import { useGeneralCostRecords } from "../../../service/hooks/finance/useGeneralCost.ts";

export function GeneralCostRoute() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GeneralCostItem | undefined>(undefined);

    const { data: recordsResponse, isLoading, isError } = useGeneralCostRecords();

    const handleOpenEdit = (item: GeneralCostItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSubmitForm = (values: GeneralCostItem) => {
        if (editingItem) {
            console.log("Submitting updates via form entry:", values);
            setIsModalOpen(false);
        }
    };

    const columns: ColumnDef<GeneralCostItem>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'cost',
            header: 'Price',
            cell: ({ getValue }) => (
                <span className="font-mono text-on-surface font-bold">
                    ${getValue<number>().toFixed(2)}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Action',
            cell: ({ row }) => (
                <button
                    onClick={() => handleOpenEdit(row.original)}
                    className="text-primary hover:text-primary/80 font-bold text-xs"
                >
                    Edit
                </button>
            ),
        },
    ];

    const tableData = recordsResponse?.generalCosts ?? [];

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
                        <h1 className="text-2xl font-bold text-primary">General Costs</h1>
                        <p className="text-xs text-on-surface-variant">Manage global service pricing structures.</p>
                    </div>
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
                <DataTable columns={columns} data={tableData} pageSize={5} />
            )}

            <GeneralCostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitForm}
                defaultValues={editingItem}
            />
        </div>
    );
}