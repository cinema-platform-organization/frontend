"use client";

import {
	BellIcon,
	LoaderIcon,
	LogOutIcon,
	SettingsIcon,
	TicketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetMe, useLogout } from "@/api/hooks";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { ROUTES } from "@/constants/routes";
import { deleteCookie } from "@/lib/cookies";

export default function AccountPage() {
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	const router = useRouter();

	const { data: user, isLoading } = useGetMe();

	const { mutateAsync: logout } = useLogout({
		onSuccess() {
			deleteCookie("accessToken");
			router.push(ROUTES.AUTH.LOGIN);
		},
	});

	useEffect(() => {
		if (!isLoading && user && !user.name) {
			router.replace("/onboarding");
		}
	}, [isLoading, user, router]);

	const sections = [
		{
			title: "Tickets",
			items: [
				{
					icon: TicketIcon,
					label: "My tickets",
					href: ROUTES.ACCOUNT.TICKETS,
				},
			],
		},
		{
			title: "Account",
			items: [
				{
					icon: SettingsIcon,
					label: "Settings",
					href: ROUTES.ACCOUNT.SETTINGS,
				},
				{
					icon: BellIcon,
					label: "Notifications",
					href: ROUTES.ACCOUNT.NOTIFICATIONS,
				},
				{
					icon: LogOutIcon,
					label: "Log out",
					action: () => setIsLogoutOpen(true),
				},
			],
		},
	];

	return isLoading ? (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 pt-28 text-white">
			<LoaderIcon className="mb-6 size-14 animate-spin text-rose-700" />
			<h1 className="mb-4 text-3xl font-bold">Loading...</h1>
		</div>
	) : (
		<div className="flex min-h-screen justify-center bg-[#0A0C14] py-10 pt-28 text-white">
			<div className="w-full max-w-2xl space-y-8">
				<div className="flex items-center gap-6 rounded-xl bg-[#1A1C24] p-6">
					{user?.avatar ? (
						<Image
							src={user.avatar}
							alt={user.name || "name"}
							width={96}
							height={96}
							className="rounded-full object-cover"
						/>
					) : (
						<div className="flex size-24 items-center justify-center rounded-full bg-[#242730] text-4xl text-neutral-300">
							{user?.name?.[0]?.toUpperCase()}
						</div>
					)}
					<div className="flex flex-col">
						<h1 className="text-2xl font-semibold">{user?.name}</h1>
						<p className="text-neutral-400">{user?.phone}</p>
					</div>
				</div>

				{sections.map(section => (
					<div
						key={section.title}
						className="space-y-4 rounded-xl bg-[#1A1C24] p-5"
					>
						<h2 className="mb-2 text-xl font-medium">
							{section.title}
						</h2>
						<div className="flex flex-col divide-y divide-gray-800">
							{section.items.map(item =>
								item.href ? (
									<Link
										key={item.label}
										href={item.href}
										className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-[#2A2C34]"
									>
										<item.icon className="size-5" />
										<span>{item.label}</span>
									</Link>
								) : (
									<button
										key={item.label}
										type="button"
										onClick={item.action}
										className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-[#2A2C34]"
									>
										<item.icon className="size-5" />
										<span>{item.label}</span>
									</button>
								),
							)}
						</div>
					</div>
				))}
			</div>

			<AlertDialog
				open={isLogoutOpen}
				onClose={() => setIsLogoutOpen(false)}
				onConfirm={async () => {
					setIsLogoutOpen(false);
					await logout();
				}}
				title="Log out of account?"
				description="Are you sure you want to log out? You will need to sign in again afterwards."
				confirmText="Log out"
				cancelText="Cancel"
			/>
		</div>
	);
}
