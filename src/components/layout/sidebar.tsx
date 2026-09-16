import Link from "next/link";

import { Button } from "../ui/button";

export function Sidebar() {
	const links = [
		{ label: "Movies", href: "/movies" },
		{ label: "Schedule", href: "/schedule" },
		{ label: "Promotions", href: "/promotions" },
		{ label: "Theaters", href: "/theaters" },
		{ label: "About Us", href: "/about" },
		{ label: "Careers", href: "/careers" },
		{ label: "Advertising", href: "/advertising" },
		{ label: "Contacts", href: "/contacts" },
	];

	return (
		<nav className="w-full lg:w-64 lg:pr-8">
			<div className="lg:sticky lg:top-8">
				<ul className="custom-scrollbar flex gap-2 overflow-x-auto rounded-xl bg-zinc-900 p-4 shadow-md lg:flex-col lg:gap-4 lg:overflow-visible">
					{links.map((link, index) => {
						return (
							<li
								key={index}
								className={`flex-shrink-0 ${
									index >= 4 ? "hidden lg:block" : ""
								}`}
							>
								<Link
									href={link.href}
									className="nav-link whitespace-nowrap"
								>
									{link.label}
								</Link>
							</li>
						);
					})}
				</ul>

				<div className="bg-primary mt-6 rounded-xl p-4 text-white shadow-lg">
					<h3 className="text-lg font-semibold">
						20% off all tickets!
					</h3>
					<p className="mt-1 text-sm font-medium">
						Hurry up to take advantage of the promotion and see the
						best movies of this season.
					</p>
					<Button variant="secondary" className="mt-3 w-full">
						<Link href="/promotions">Learn More</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
}
