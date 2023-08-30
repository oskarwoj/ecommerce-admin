import { Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

import ClientOnly from "@/components/ClientOnly";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { ModalProvider } from "@/providers/modal-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dashboard",
	description: "E-Commerce Dashboard",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ClientOnly>
						<ToastProvider />
						<LoginModal />
						<RegisterModal />
						<ModalProvider />
					</ClientOnly>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
