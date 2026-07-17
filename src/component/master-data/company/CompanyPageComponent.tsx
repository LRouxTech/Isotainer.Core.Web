import type {ColumnDef} from "@tanstack/react-table";
import {Link} from "@tanstack/react-router";
import {DataTable} from "../../ui/DataTable.tsx";

interface CompanyRecord {
    id: string;
    name: string;
    role: 'Carrier' | 'Shipper' | 'Consignee';
    contactEmail: string;
    status: 'Active' | 'Inactive';
}

const companyMockData: CompanyRecord[] = [
    { id: '1', name: 'Global Logistics Corp', role: 'Carrier', contactEmail: 'dispatch@globallogistics.com', status: 'Active' },
    { id: '2', name: 'Hofmann & Co', role: 'Shipper', contactEmail: 'info@hofmann.de', status: 'Active' },
    { id: '3', name: 'Oceanic Carriers Inc.', role: 'Carrier', contactEmail: 'marine@oceanic.com', status: 'Active' },
    { id: '4', name: 'Vertex Chemicals', role: 'Shipper', contactEmail: 'logistics@vertexchem.com', status: 'Active' },
    { id: '5', name: 'Sino-Wash Facility', role: 'Consignee', contactEmail: 'ops@sinowash.cn', status: 'Inactive' },
];

export function CompanyRoute() {
    const columns: ColumnDef<CompanyRecord>[] = [
        {
            accessorKey: 'name',
            header: 'Company Name',
        },
        {
            accessorKey: 'role',
            header: 'Role Type',
            cell: ({ getValue }) => <span className="font-semibold text-on-surface-variant">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'contactEmail',
            header: 'Contact Email',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ getValue }) => {
                const status = getValue<'Active' | 'Inactive'>();
                return (
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${
                        status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-outline/10 text-outline border-outline-variant/30'
                    }`}>
            {status}
          </span>
                );
            },
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
                        <h1 className="text-2xl font-bold text-primary">Company Directory</h1>
                        <p className="text-xs text-on-surface-variant">Active partner associations and carrier clients.</p>
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={companyMockData} pageSize={5} />
        </div>
    );
}