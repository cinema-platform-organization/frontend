"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { GetMeResponse } from "@/api/generated";
import { useConfirmPhoneChange, useInitPhoneChange } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { translateError } from "@/lib/utils/error-map";

interface ChangePhoneModalProps {
	open: boolean;
	onClose: () => void;
	user: GetMeResponse;
}

const changePhoneSchema = z.object({
	phone: z.string().min(1, "Enter a valid phone number"),
	code: z.string().optional(),
});

type ChangePhoneFormValues = z.infer<typeof changePhoneSchema>;

export function ChangePhoneModal({
	open,
	onClose,
	user,
}: ChangePhoneModalProps) {
	const [step, setStep] = useState<"phone" | "code">("phone");

	const form = useForm<ChangePhoneFormValues>({
		resolver: zodResolver(changePhoneSchema),
		defaultValues: {
			phone: "",
			code: "",
		},
		mode: "onSubmit",
	});

	const queryClient = useQueryClient();

	const { mutate: init, isPending: isInitPending } = useInitPhoneChange({
		onSuccess() {
			setStep("code");
		},
		onError(error: any) {
			const msg = error?.response?.data?.message || error?.message;
			form.setError("phone", { message: translateError(msg) });
		},
	});

	const { mutate: confirm, isPending: isConfirmPending } =
		useConfirmPhoneChange({
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ["get me"] });
				onClose();
			},
			onError(error: any) {
				const msg = error?.response?.data?.message || error?.message;
				form.setError("code", { message: translateError(msg) });
			},
		});

	function closeModal() {
		onClose();
		setStep("phone");
		form.reset({
			phone: user?.phone ?? "",
			code: "",
		});
	}

	async function onSubmit(values: ChangePhoneFormValues) {
		if (step === "phone") {
			init({ phone: values.phone });
		} else {
			confirm({
				phone: values.phone,
				code: values.code!,
			});
		}
	}

	return (
		<Dialog open={open} onClose={closeModal} title="Change Phone Number">
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{step === "phone" && (
					<Input
						label="New Phone Number"
						placeholder="+380000000000"
						error={form.formState.errors.phone?.message}
						{...form.register("phone")}
					/>
				)}

				{step === "code" && (
					<Input
						label="Confirmation Code"
						placeholder="123456"
						error={form.formState.errors.code?.message}
						autoFocus
						{...form.register("code")}
					/>
				)}

				<div className="flex justify-end gap-2">
					<Button
						variant="outline"
						type="button"
						onClick={
							step === "phone"
								? closeModal
								: () => setStep("phone")
						}
					>
						{step === "phone" ? "Cancel" : "Back"}
					</Button>

					<Button
						type="submit"
						disabled={isInitPending || isConfirmPending}
					>
						{step === "phone" ? "Next" : "Confirm"}
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
