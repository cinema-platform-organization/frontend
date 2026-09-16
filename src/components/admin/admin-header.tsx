"use client";

import type { GetMeResponse } from "@/api/generated";

interface AdminHeaderProps {
	user?: GetMeResponse;
}

export function AdminHeader({ user }: AdminHeaderProps) {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#0A0C14] px-6">
			<h1 className="text-lg font-semibold text-white">Admin Panel</h1>

			{user && (
				<div className="flex items-center gap-3 text-sm text-neutral-400">
					<span>{user.name}</span>
					<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
						{user.role}
					</span>
				</div>
			)}
		</header>
	);
}
