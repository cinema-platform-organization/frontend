"use client";

import { useEffect, useState } from "react";

import type { GetSeatsByHallResponse } from "@/api/generated";
import { useUpdateSeat } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SeatEditModalProps {
	open: boolean;
	seat: GetSeatsByHallResponse | null;
	hallId: string;
	onClose: () => void;
}

const SEAT_TYPES = ["standard", "vip", "premium"];

export function SeatEditModal({
	open,
	seat,
	hallId,
	onClose,
}: SeatEditModalProps) {
	const [price, setPrice] = useState(0);
	const [type, setType] = useState("standard");

	useEffect(() => {
		if (open && seat) {
			setPrice(seat.price);
			setType(seat.type);
		}
	}, [open, seat]);

	const { mutate: update, isPending } = useUpdateSeat(hallId, {
		onSuccess: () => onClose(),
	});

	if (!seat) {
		return null;
	}

	function handleSave() {
		if (!seat) {
			return;
		}
		update({ id: seat.id, values: { price, type } });
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={`Edit seat — row ${seat.row}, seat ${seat.number}`}
		>
			<div className="space-y-4">
				<Input
					label="Price"
					type="number"
					value={price}
					onChange={e => setPrice(Number(e.target.value))}
				/>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-neutral-300">
						Type
					</label>
					<select
						value={type}
						onChange={e => setType(e.target.value)}
						className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
					>
						{SEAT_TYPES.map(t => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={isPending}>
						Save changes
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
