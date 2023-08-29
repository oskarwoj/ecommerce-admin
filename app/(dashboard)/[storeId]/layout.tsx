import { redirect } from "next/navigation";

import getCurrentUser from "@/actions/getCurrentUser";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/");
	}

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId: currentUser.id,
		},
	});

	if (!store) {
		redirect("/");
	}

	return (
		<>
			<LoginModal />
			<RegisterModal />
			<Navbar />
			{children}
		</>
	);
}
