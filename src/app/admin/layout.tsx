"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading, isAdmin } = useRequireAdmin();

	if (isLoading || !isAdmin) {
		return null;
	}

	return (
		<div className="flex min-h-screen bg-[#0A0C14]">
			<AdminSidebar />
			<div className="flex flex-1 flex-col">
				<AdminHeader user={user} />
				<main className="flex-1 overflow-x-auto p-6">{children}</main>
			</div>
		</div>
	);
}
