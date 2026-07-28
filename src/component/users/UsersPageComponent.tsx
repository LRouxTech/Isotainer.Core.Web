import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/DataTable.tsx";
import { RowActions } from "../ui/RowActions.tsx";
import { ConfirmationModal } from "../ui/ConfirmationModal.tsx";
import {
    useUserRecords,
    useArchiveUser
} from "../../service/hooks/user/useUser.ts";
import {useNavigate} from "@tanstack/react-router";
import type { ListUser } from "../../model/auth/user/response/userListResponse.ts";

export function UsersPageComponent() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<ListUser | undefined>(undefined);

    const { data: recordsResponse, isLoading, isError } = useUserRecords(pagination);

    const deleteMutation = useArchiveUser();

    const handleOpenDelete = (user: ListUser) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await deleteMutation.mutateAsync({userId: userToDelete.userId});
            setIsDeleteModalOpen(false);
            setUserToDelete(undefined);
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleOpenCreate = () => {
        navigate({ to: '/users/new' });
    };

    const handleOpenEdit = (user: ListUser) => {
        navigate({
            to: '/users/edit/$userId',
            params: { userId: user.userId },
        });
    };

    const getRoleBadgeClass = (role: string) => {
        switch (role.toUpperCase()) {
            case 'SYSTEM ADMIN':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'MANAGER':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'OPERATOR':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'FINANCIALS':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-surface-container text-on-surface border-outline-variant';
        }
    };

    const columns: ColumnDef<ListUser>[] = [
        {
            accessorKey: 'name',
            header: 'NAME',
            cell: ({ getValue }) => <span className="font-bold text-on-surface">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'surname',
            header: 'SURNAME',
            cell: ({ getValue }) => <span className="text-on-surface">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'username',
            header: 'USERNAME',
            cell: ({ getValue }) => <span className="font-mono text-xs text-on-surface-variant">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'email',
            header: 'EMAIL',
            cell: ({ getValue }) => <span className="font-mono text-xs text-on-surface-variant">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'role',
            header: 'ROLE',
            cell: ({ getValue }) => {
                const role = getValue<string>() ?? '';
                return (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${getRoleBadgeClass(role)}`}>
                        {role}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div className="text-right">ACTIONS</div>,
            cell: ({ row }) => (
                <RowActions
                    onEdit={() => handleOpenEdit(row.original)}
                    onDelete={() => handleOpenDelete(row.original)}
                />
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header & Main Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-on-surface">User Management</h1>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                        Manage system access, roles, and user profiles across the ISO-Master ecosystem.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleOpenCreate}
                    className="inline-flex items-center gap-2 h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20 shrink-0"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="17" y1="11" x2="23" y2="11" />
                    </svg>
                    Add User
                </button>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Users */}
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">Total Users</span>
                        <span className="text-2xl font-extrabold text-on-surface">1,248</span>
                    </div>
                </div>

                {/* Admins */}
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-600">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">Admins</span>
                        <span className="text-2xl font-extrabold text-on-surface">24</span>
                    </div>
                </div>

                {/* Active Now */}
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">Active Now</span>
                        <span className="text-2xl font-extrabold text-on-surface">156</span>
                    </div>
                </div>

                {/* Disabled */}
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-error/10 text-error">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">Disabled</span>
                        <span className="text-2xl font-extrabold text-on-surface">8</span>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 h-9 px-4 rounded border border-outline-variant bg-surface-container-lowest text-xs font-semibold text-on-surface hover:bg-surface-container/20 cursor-pointer"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        Filter
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 h-9 px-4 rounded border border-outline-variant bg-surface-container-lowest text-xs font-semibold text-on-surface hover:bg-surface-container/20 cursor-pointer"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </button>
                </div>

                <div className="relative w-full sm:w-80">
                    <svg className="absolute left-3 top-2.5 text-outline" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name, email, or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            {/* User Data Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48 rounded-lg border border-outline-variant bg-surface-container-lowest gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-xs text-outline font-medium">Fetching users...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center h-48 rounded-lg border border-error/20 bg-error-container/10 p-4 text-center">
                    <p className="text-sm font-bold text-on-surface">Failed to load user records</p>
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

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setUserToDelete(undefined);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete user "${userToDelete?.userName}"? This action cannot be undone.`}
                confirmText="Delete"
                isDanger={true}
                isPending={deleteMutation.isPending}
            />
        </div>
    );
}