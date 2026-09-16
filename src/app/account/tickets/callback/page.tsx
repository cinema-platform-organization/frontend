"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TicketsCallbackPage() {
	const router = useRouter();
	const [state, setState] = useState<"loading" | "success">("loading");

	useEffect(() => {
		const timer = setTimeout(() => {
			setState("success");
			setTimeout(() => router.replace("/account/tickets"), 2000);
		}, 1500);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white">
			{state === "loading" && (
				<>
					<LoaderIcon className="mb-6 size-14 animate-spin" />
					<h1 className="mb-4 text-3xl font-bold">
						Processing Payment...
					</h1>
					<p className="max-w-sm text-center text-neutral-400">
						Your payment is being confirmed. This will take a few
						seconds.
					</p>
				</>
			)}

			{state === "success" && (
				<>
					<div className="mb-6 text-6xl">✅</div>
					<h1 className="mb-4 text-3xl font-bold">
						Payment Successful!
					</h1>
					<p className="max-w-sm text-center text-neutral-400">
						Your tickets are ready. You are being redirected...
					</p>
				</>
			)}
		</div>
	);
}
