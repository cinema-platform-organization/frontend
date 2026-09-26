"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useFinalizeTelegramAuth } from "@/api/hooks/useFinalizeTelegramAuth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { setCookie } from "@/lib/cookies";

export default function TelegramFinalizePage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { mutate, isPending, isError } = useFinalizeTelegramAuth({
		onSuccess(data) {
			setCookie("accessToken", data.accessToken);
			router.push(ROUTES.ACCOUNT.ROOT);
		},
	});

	useEffect(() => {
		const sessionId = searchParams.get("sessionId");

		if (!sessionId) {
			router.push(ROUTES.AUTH.LOGIN);

			return;
		}

		mutate({ sessionId });
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white">
			{isPending && (
				<>
					<LoaderIcon className="mb-6 size-14 animate-spin" />
					<h1 className="mb-4 text-3xl font-bold">
						Finalizing sign-in…
					</h1>
					<p className="max-w-sm text-center text-neutral-400">
						Please wait a few seconds.
					</p>
				</>
			)}

			{isError && (
				<>
					<div className="mb-6 text-6xl">❌</div>
					<h1 className="mb-4 text-3xl font-bold">Sign-in Error</h1>
					<p className="mb-6 max-w-sm text-center text-neutral-400">
						Failed to finalize Telegram sign-in.
					</p>

					<Button onClick={() => router.push(ROUTES.AUTH.LOGIN)}>
						Go back
					</Button>
				</>
			)}
		</div>
	);
}
