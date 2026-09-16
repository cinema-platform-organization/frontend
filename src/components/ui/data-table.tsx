"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData> {
	columns: ColumnDef<TData, any>[];
	data: TData[];
	isLoading?: boolean;
	emptyMessage?: string;
}

export function DataTable<TData>({
	columns,
	data,
	isLoading,
	emptyMessage = "No records found",
}: DataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#12141C]">
			<table className="w-full text-left text-sm">
				<thead className="border-b border-zinc-800 bg-[#1A1C24]">
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									className="px-4 py-3 font-medium text-neutral-400"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td
								colSpan={columns.length}
								className="px-4 py-10 text-center text-neutral-500"
							>
								Loading…
							</td>
						</tr>
					) : data.length === 0 ? (
						<tr>
							<td
								colSpan={columns.length}
								className="px-4 py-10 text-center text-neutral-500"
							>
								{emptyMessage}
							</td>
						</tr>
					) : (
						table.getRowModel().rows.map(row => (
							<tr
								key={row.id}
								className="border-b border-zinc-800/60 last:border-0 hover:bg-white/[0.02]"
							>
								{row.getVisibleCells().map(cell => (
									<td
										key={cell.id}
										className="px-4 py-3 text-white"
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
