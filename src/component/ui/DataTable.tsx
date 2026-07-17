import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender, type ColumnDef
} from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize?: number;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             pageSize = 5,
                                         }: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const table = useReactTable({
        data,
        columns,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">

                    {/* Mockup matching Dark Industrial Header Header */}
                    <thead className="bg-[#1A1A1A] text-white select-none">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="h-11 px-6 text-[11px] font-bold tracking-wider uppercase align-middle text-on-primary-container/80"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    {/* Table Body rows */}
                    <tbody className="divide-y divide-outline-variant/30">
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-surface-container/5 transition-colors group h-14"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 text-sm text-on-surface font-semibold align-middle">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="h-24 text-center text-sm text-outline font-medium">
                                No records found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="flex h-14 items-center justify-between border-t border-outline-variant/60 px-6 bg-surface-container-lowest text-sm text-on-surface-variant font-medium select-none">
                <div>
                    Showing <span className="font-bold text-on-surface">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                    <span className="font-bold text-on-surface">
            {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                data.length
            )}
          </span>{' '}
                    of <span className="font-bold text-on-surface">{data.length}</span> entries
                </div>

                <div className="flex items-center gap-2">
                    {/* Previous Page */}
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant hover:bg-surface-container/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    {/* Page Indicator */}
                    <span className="text-xs font-bold text-on-surface">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>

                    {/* Next Page */}
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant hover:bg-surface-container/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}