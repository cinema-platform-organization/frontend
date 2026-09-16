import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import type { ReactNode } from "react";

import "@/assets/styles/globals.css";
import { cn } from "@/lib/utils";
import { HealthCheckProvider } from "@/providers/health-check";
import { ReactQueryProvider } from "@/providers/react-query";

const font = Geologica({
	subsets: ["latin"],
	variable: "--font-geist",
	preload: true,
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		absolute: "Cinema Platform",
		template: `%s - Cinema Platform`,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen font-sans antialiased",
					font.variable,
				)}
			>
				<ReactQueryProvider>
					<HealthCheckProvider>{children}</HealthCheckProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
