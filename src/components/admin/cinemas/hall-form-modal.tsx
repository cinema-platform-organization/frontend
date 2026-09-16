"use client";

import { useEffect, useState } from "react";

import type { GetHallsResponse } from "@/api/generated";
import { useCreateHall, useUpdateHall } from "@/api/hooks";
import { RowLayoutInput } from "@/api/requests/hall";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface HallFormModalProps {
	open: boolean;
	theaterId: string;
	hall: GetHallsResponse | null;
	onClose: () => void;
}

const SEAT_TYPES = ["standard", "vip", "premium"];

function emptyRow(row: number): RowLayoutInput {
	return { row, columns: 10, type: "standard", price: 200 };
}

export function HallFormModal({
	open,
	theaterId,
	hall,
	onClose,
}: HallFormModalProps) {
	const isEdit = !!hall;

	const [name, setName] = useState("");
	const [rows, setRows] = useState<RowLayoutInput[]>([emptyRow(1)]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (open) {
			setName(hall?.name ?? "");
			setRows([emptyRow(1)]);
			setError(null);
		}
	}, [open, hall]);

	const { mutate: create, isPending: isCreating } = useCreateHall({
		onSuccess: () => onClose(),
	});

	const { mutate: update, isPending: isUpdating } = useUpdateHall(theaterId, {
		onSuccess: () => onClose(),
	});

	function addRow() {
		setRows(prev => [...prev, emptyRow(prev.length + 1)]);
	}

	function removeRow(index: number) {
		setRows(prev => prev.filter((_, i) => i !== index));
	}

	function updateRow(index: number, patch: Partial<RowLayoutInput>) {
		setRows(prev =>
			prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
		);
	}

	function handleSubmit() {
		if (!name.trim()) {
			setError("Hall name is required");
			return;
		}

		if (isEdit && hall) {
			setError(null);
			update({ id: hall.id, values: { name } });
			return;
		}

		if (rows.length === 0) {
			setError("At least one row is required");
			return;
		}

		setError(null);
		create({ name, theaterId, layout: rows });
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={isEdit ? "Edit hall" : "New hall"}
		>
			<div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
				<Input
					label="Name"
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				{!isEdit && (
					<div>
						<div className="mb-2 flex items-center justify-between">
							<label className="text-sm font-medium text-neutral-300">
								Row layout
							</label>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={addRow}
							>
								Add row
							</Button>
						</div>

						<div className="space-y-2">
							{rows.map((row, index) => (
								<div
									key={index}
									className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-2 rounded-lg border border-zinc-800 bg-[#12141C] p-3"
								>
									<div>
										<label className="mb-1 block text-xs text-neutral-500">
											Row
										</label>
										<input
											type="number"
											value={row.row}
											onChange={e =>
												updateRow(index, {
													row: Number(e.target.value),
												})
											}
											className="w-full rounded border border-zinc-700 bg-[#1A1C24] px-2 py-1.5 text-sm text-white outline-none"
										/>
									</div>
									<div>
										<label className="mb-1 block text-xs text-neutral-500">
											Columns
										</label>
										<input
											type="number"
											value={row.columns}
											onChange={e =>
												updateRow(index, {
													columns: Number(
														e.target.value,
													),
												})
											}
											className="w-full rounded border border-zinc-700 bg-[#1A1C24] px-2 py-1.5 text-sm text-white outline-none"
										/>
									</div>
									<div>
										<label className="mb-1 block text-xs text-neutral-500">
											Type
										</label>
										<select
											value={row.type}
											onChange={e =>
												updateRow(index, {
													type: e.target.value,
												})
											}
											className="w-full rounded border border-zinc-700 bg-[#1A1C24] px-2 py-1.5 text-sm text-white outline-none"
										>
											{SEAT_TYPES.map(type => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="mb-1 block text-xs text-neutral-500">
											Price
										</label>
										<input
											type="number"
											value={row.price}
											onChange={e =>
												updateRow(index, {
													price: Number(
														e.target.value,
													),
												})
											}
											className="w-full rounded border border-zinc-700 bg-[#1A1C24] px-2 py-1.5 text-sm text-white outline-none"
										/>
									</div>
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="border-red-900/50 text-red-400"
										onClick={() => removeRow(index)}
										disabled={rows.length === 1}
									>
										Remove
									</Button>
								</div>
							))}
						</div>
					</div>
				)}

				{isEdit && (
					<p className="text-xs text-neutral-500">
						Seat layout can't be changed after creation. Manage
						individual seats from the hall's seats page.
					</p>
				)}

				{error && <p className="text-sm text-red-500">{error}</p>}

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isCreating || isUpdating}
					>
						{isEdit ? "Save changes" : "Create hall"}
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
