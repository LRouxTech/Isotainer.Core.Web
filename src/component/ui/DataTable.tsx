import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
    type PaginationState,
} from '@tanstack/react-table';

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    pageCount?: number;
    totalCount?: number;
    pagination?: PaginationState;
    onPaginationChange?: (pagination: PaginationState | ((old: PaginationState) => PaginationState)) => void;
    isLoading?: boolean;
}

export function DataTable<TData>({
                                     columns,
                                     data,
                                     pageCount = 0,
                                     totalCount = 0,
                                     pagination = { pageIndex: 0, pageSize: 10 }, // Default fallback
                                     onPaginationChange,
                                     isLoading,
                                 }: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: { pagination },
        onPaginationChange,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden">
                <table className="w-full text-left text-sm text-on-surface">
                    <thead className="border-b border-outline-variant bg-surface-container/30 text-xs uppercase text-on-surface-variant">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-3 font-bold">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="divide-y divide-outline-variant/60">
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} className="h-24 text-center text-outline">
                                Loading...
                            </td>
                        </tr>
                    ) : table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="h-24 text-center text-outline">
                                No records found.
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-surface-container/20">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="flex items-center justify-between px-2 text-xs text-on-surface-variant">
                <div>
                    Showing {data.length} of {totalCount} results
                </div>
                <div className="flex items-center gap-6">
                    {/* Rows per page selector */}
                    <div className="flex items-center gap-2">
                        <span>Rows per page:</span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="h-8 rounded border border-outline-variant bg-surface-container-lowest px-2 font-medium"
                        >
                            {[5, 10, 20, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Page Numbers */}
                    <div>
                        Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of <strong>{pageCount || 1}</strong>
                    </div>

                    {/* Next / Previous Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 px-2.5 rounded border border-outline-variant hover:bg-surface-container/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 px-2.5 rounded border border-outline-variant hover:bg-surface-container/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}