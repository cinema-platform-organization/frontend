"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { GetTheatersResponse } from "@/api/generated";
import { useCreateTheater, useUpdateTheater } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface TheaterFormModalProps {
	open: boolean;
	theater: GetTheatersResponse | null;
	onClose: () => void;
}

const theaterSchema = z.object({
	name: z.string().min(1, "Name is required"),
	address: z.string().min(1, "Address is required"),
});

type TheaterFormValues = z.infer<typeof theaterSchema>;

export function TheaterFormModal({
	open,
	theater,
	onClose,
}: TheaterFormModalProps) {
	const isEdit = !!theater;

	const form = useForm<TheaterFormValues>({
		resolver: zodResolver(theaterSchema) as any,
		defaultValues: { name: "", address: "" },
	});

	useEffect(() => {
		if (open) {
			form.reset({
				name: theater?.name ?? "",
				address: theater?.address ?? "",
			});
		}
	}, [open, theater]);

	const { mutate: create, isPending: isCreating } = useCreateTheater({
		onSuccess: () => onClose(),
	});

	const { mutate: update, isPending: isUpdating } = useUpdateTheater({
		onSuccess: () => onClose(),
	});

	function onSubmit(values: TheaterFormValues) {
		if (isEdit && theater) {
			update({ id: theater.id, values });
		} else {
			create(values);
		}
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={isEdit ? "Edit theater" : "New theater"}
		>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Name"
					error={form.formState.errors.name?.message}
					{...form.register("name")}
				/>
				<Input
					label="Address"
					error={form.formState.errors.address?.message}
					{...form.register("address")}
				/>

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" disabled={isCreating || isUpdating}>
						{isEdit ? "Save changes" : "Create theater"}
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
