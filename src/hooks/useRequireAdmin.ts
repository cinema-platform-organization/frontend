"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetMe } from "@/api/hooks";

export function useRequireAdmin() {
	const router = useRouter();
	const { data: user, isLoading, isError } = useGetMe();

	useEffect(() => {
		if (isLoading) return;

		if (isError || !user || user.role !== "ADMIN") {
			router.replace("/");
		}
	}, [isLoading, isError, user, router]);

	const isAdmin = !isLoading && !isError && user?.role === "ADMIN";

	return { user, isLoading, isAdmin };
}
