import type {ColumnDef} from "@tanstack/react-table";
import {Link} from "@tanstack/react-router";
import {DataTable} from "../../ui/DataTable.tsx";

interface WashTypeRecord {
    id: string;
    name: string;
    tempRequired: string;
    durationMinutes: number;
    hazardousCompatible: boolean;
}

const washMockData: WashTypeRecord[] = [
    { id: '1', name: 'Cold Water Flush', tempRequired: 'Ambient', durationMinutes: 20, hazardousCompatible: false },
    { id: '2', name: 'Hot Water Recirculation', tempRequired: '85°C', durationMinutes: 45, hazardousCompatible: true },
    { id: '3', name: 'Steam Sterilization', tempRequired: '130°C', durationMinutes: 60, hazardousCompatible: true },
    { id: '4', name: 'Caustic Rinse Treatment', tempRequired: '60°C', durationMinutes: 40, hazardousCompatible: true },
];

export function WashTypeRoute() {
    const columns: ColumnDef<WashTypeRecord>[] = [
        {
            accessorKey: 'name',
            header: 'Wash Procedure',
        },
        {
            accessorKey: 'tempRequired',
            header: 'Temp Profile',
        },
        {
            accessorKey: 'durationMinutes',
            header: 'Est. Duration',
            cell: ({ getValue }) => <span className="font-semibold">{getValue<number>()} Mins</span>,
        },
        {
            accessorKey: 'hazardousCompatible',
            header: 'Hazmat Safe',
            cell: ({ getValue }) => (
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                    getValue<boolean>() ? 'bg-error-container/20 text-error' : 'bg-surface-container text-outline'
                }`}>
          {getValue<boolean>() ? 'YES' : 'NO'}
        </span>
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
                        <h1 className="text-2xl font-bold text-primary">Wash Types</h1>
                        <p className="text-xs text-on-surface-variant">Operational wash specifications and heating templates.</p>
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={washMockData} pageSize={5} />
        </div>
    );
}