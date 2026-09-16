import type { Metadata } from "next";

import { Tickets } from "@/components/account/tickets/tickets";

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const metadata: Metadata = {
	title: "My Tickets",
};

export default async function AccountTicketsPage({ searchParams }: Props) {
	const resolvedParams = await searchParams;
	const page = Number(resolvedParams.page) || 1;

	return <Tickets page={page} searchParams={resolvedParams} />;
}
