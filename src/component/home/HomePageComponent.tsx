import type {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "../ui/DataTable.tsx";

export interface TankRecord {
    tankNumber: string;
    washStatus: 'Clean' | 'Dirty' | 'In-Progress';
    company: string;
    loadedDate: string;
    unloadedDate: string;
}

const mockTankData: TankRecord[] = [
    { tankNumber: 'ISO-9921-A', washStatus: 'Clean', company: 'Global Logistics Corp', loadedDate: 'Oct 24, 2023', unloadedDate: 'Oct 28, 2023' },
    { tankNumber: 'ISO-4482-B', washStatus: 'Dirty', company: 'Hofmann & Co', loadedDate: 'Oct 26, 2023', unloadedDate: '—' },
    { tankNumber: 'ISO-1120-X', washStatus: 'In-Progress', company: 'Oceanic Carriers', loadedDate: 'Oct 27, 2023', unloadedDate: '—' },
    { tankNumber: 'ISO-7731-C', washStatus: 'Clean', company: 'Vertex Chemicals', loadedDate: 'Oct 20, 2023', unloadedDate: 'Oct 25, 2023' },
    { tankNumber: 'ISO-8842-M', washStatus: 'Dirty', company: 'Global Logistics Corp', loadedDate: 'Oct 29, 2023', unloadedDate: '—' },
    { tankNumber: 'ISO-5512-R', washStatus: 'In-Progress', company: 'Sino-Wash', loadedDate: 'Oct 28, 2023', unloadedDate: '—' },
];

export function HomePageComponent() {
    const columns: ColumnDef<TankRecord>[] = [
        {
            accessorKey: 'tankNumber',
            header: 'Tank Number',
            cell: ({ getValue }) => <span className="font-mono">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'washStatus',
            header: 'Wash Status',
            cell: ({ getValue }) => {
                const status = getValue<'Clean' | 'Dirty' | 'In-Progress'>();

                const badgeClasses = {
                    Clean: 'bg-green-100 text-green-800 border-green-200',
                    Dirty: 'bg-amber-100 text-amber-800 border-amber-200',
                    'In-Progress': 'bg-blue-100 text-blue-800 border-blue-200',
                };

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeClasses[status]}`}>
            {status}
          </span>
                );
            },
        },
        {
            accessorKey: 'company',
            header: 'Company',
            cell: ({ getValue }) => <span className="text-on-surface/80">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'loadedDate',
            header: 'Loaded Date',
            cell: ({ getValue }) => <span className="text-on-surface-variant font-medium">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'unloadedDate',
            header: 'Unloaded Date',
            cell: ({ getValue }) => <span className="text-on-surface-variant font-medium">{getValue<string>()}</span>,
        },
        {
            id: 'actions',
            header: 'Action',
            cell: () => (
                <div className="flex items-center gap-4 text-outline select-none">
                    <button className="hover:text-primary transition-colors cursor-pointer" title="Manage Wash Station">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                    </button>
                    <button className="hover:text-primary transition-colors cursor-pointer" title="Discharge / Unload">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 19V5m0 0l-7 7m7-7l7 7" />
                        </svg>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-primary">Tank Dashboard</h1>
                <p className="text-sm text-on-surface-variant mt-1">
                    Real-time isotainer status and operational management.
                </p>
            </div>

            <hr className="border-outline-variant/60" />

            <DataTable columns={columns} data={mockTankData} pageSize={5} />
        </div>
    );
}