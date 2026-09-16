"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "Movies", href: ROUTES.ADMIN.MOVIES },
	{ label: "Categories", href: ROUTES.ADMIN.CATEGORIES },
	{ label: "Cinemas", href: ROUTES.ADMIN.CINEMAS },
	{ label: "Screenings", href: ROUTES.ADMIN.SCREENINGS },
];

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-80 shrink-0 border-r border-zinc-800 bg-[#12141C] p-4">
			<Link href="/" className="mb-6 flex items-center space-x-2 px-3">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-700">
					<svg
						className="text-primary-foreground h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
					</svg>
				</div>
				<span className="text-foreground text-lg font-bold">
					Cinema Platform
				</span>
			</Link>

			<nav className="space-y-1">
				{NAV_ITEMS.map(item => {
					const isActive = pathname?.startsWith(item.href);

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
								isActive
									? "bg-primary/10 text-primary"
									: "text-neutral-400 hover:bg-white/5 hover:text-white",
							)}
						>
							{item.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
