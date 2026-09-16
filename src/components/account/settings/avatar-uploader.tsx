"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";

import type { GetMeResponse } from "@/api/generated";
import { useChangeAvatar } from "@/api/hooks";

interface AvatarUploaderProps {
	user: GetMeResponse;
}

export function AvatarUploader({ user }: AvatarUploaderProps) {
	const fileRef = useRef<HTMLInputElement | null>(null);

	const queryClient = useQueryClient();

	const { mutate: changeAvatar } = useChangeAvatar({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["get me"] });
		},
	});

	function handleFile(e: any) {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		changeAvatar(file);
	}

	return (
		<div className="flex items-center gap-6">
			<div
				className="relative cursor-pointer"
				onClick={() => fileRef.current?.click()}
			>
				{user?.avatar ? (
					<Image
						src={user.avatar}
						alt="Avatar"
						width={90}
						height={90}
						className="rounded-full object-cover"
					/>
				) : (
					<div className="flex size-[90px] items-center justify-center rounded-full bg-[#242730] text-3xl text-neutral-300">
						{user?.name?.[0].toUpperCase()}
					</div>
				)}

				<input
					type="file"
					ref={fileRef}
					className="hidden"
					accept="image/*"
					onChange={handleFile}
				/>
			</div>

			<div>
				<h2 className="text-xl font-medium">Avatar</h2>
				<p className="text-sm text-neutral-400">
					Formats: JPEG, PNG, WEBP, GIF. Maximum size: 10 MB.
				</p>
			</div>
		</div>
	);
}
