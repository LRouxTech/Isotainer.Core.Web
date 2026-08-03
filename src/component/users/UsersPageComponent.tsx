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
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [search, setSearch] = useState<string>();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<ListUser | undefined>(undefined);

    const { data: recordsResponse, isLoading, isError } = useUserRecords({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search,
    });

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
            accessorKey: 'roles',
            header: 'ROLE',
            cell: ({ getValue }) => {
                const roles = getValue<string[]>() ?? [];
                const role = roles[0] ?? '';

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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="relative w-full sm:w-80">
                    <svg className="absolute left-3 top-2.5 text-outline" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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