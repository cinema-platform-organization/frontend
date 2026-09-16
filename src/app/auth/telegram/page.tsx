"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useVerifyTelegramAuth } from "@/api/hooks/useVerifyTelegramAuth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { setCookie } from "@/lib/cookies";

export default function TelegramCallbackPage() {
	const router = useRouter();

	const { mutate, isPending, isError } = useVerifyTelegramAuth({
		onSuccess(data) {
			if (data.accessToken) {
				setCookie("accessToken", data.accessToken);
				router.push(ROUTES.ACCOUNT.ROOT);

				return;
			}

			if (data.url) {
				router.push(data.url);

				return;
			}
		},
	});

	useEffect(() => {
		const hash = window.location.hash;
		const params = new URLSearchParams(hash.slice(1));

		const result = params.get("tgAuthResult");

		if (!result) {
			router.push(ROUTES.AUTH.LOGIN);

			return;
		}

		mutate({ tgAuthResult: result });
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white">
			{isPending && (
				<>
					<LoaderIcon className="mb-6 size-14 animate-spin" />
					<h1 className="mb-4 text-3xl font-bold">
						Signing in via Telegram…
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
						Failed to authorize via Telegram.
					</p>

					<Button onClick={() => router.push(ROUTES.AUTH.LOGIN)}>
						Go back
					</Button>
				</>
			)}
		</div>
	);
}
