import {useState} from "react";
import {type GeneralCostFormValues, GeneralCostModal} from "./GeneralCostModal.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import {Link} from "@tanstack/react-router";
import {DataTable} from "../../ui/DataTable.tsx";

interface GeneralCostRecord {
    id: string;
    itemName: string;
    costCode: string;
    price: number;
}

const initialCosts: GeneralCostRecord[] = [
    { id: '1', itemName: 'Standard Chemical Wash', costCode: 'WASH-STD', price: 450.00 },
    { id: '2', itemName: 'Heated Recirculation Surcharge', costCode: 'WASH-HEAT', price: 120.00 },
    { id: '3', itemName: 'Overnight Storage Fee', costCode: 'STOR-24H', price: 75.00 },
    { id: '4', itemName: 'Isotainer Nitrogen Purge', costCode: 'GAS-N2', price: 210.00 },
    { id: '5', itemName: 'Late Pick-up Fee', costCode: 'PEN-LATE', price: 150.00 },
];

export function GeneralCostRoute() {
    const [costs, setCosts] = useState<GeneralCostRecord[]>(initialCosts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GeneralCostRecord | undefined>(undefined);

    const handleOpenCreate = () => {
        setEditingItem(undefined);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: GeneralCostRecord) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSubmitForm = (values: GeneralCostFormValues) => {
        if (editingItem) {
            // Edit mode
            setCosts(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...values } : c));
        } else {
            // Create mode
            const newItem: GeneralCostRecord = {
                id: crypto.randomUUID(),
                ...values,
            };
            setCosts(prev => [newItem, ...prev]);
        }
    };

    const columns: ColumnDef<GeneralCostRecord>[] = [
        {
            accessorKey: 'itemName',
            header: 'Item Name',
        },
        {
            accessorKey: 'costCode',
            header: 'Cost Code',
            cell: ({ getValue }) => <code className="bg-surface-container px-2 py-0.5 rounded text-xs text-primary font-bold">{getValue<string>()}</code>,
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ getValue }) => <span className="font-mono text-on-surface font-bold">${getValue<number>().toFixed(2)}</span>,
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

                <button
                    onClick={handleOpenCreate}
                    className="h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors"
                >
                    Add Cost Item
                </button>
            </div>

            <DataTable columns={columns} data={costs} pageSize={5} />

            <GeneralCostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitForm}
                defaultValues={editingItem}
            />
        </div>
    );
}