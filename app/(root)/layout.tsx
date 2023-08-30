import { redirect } from "next/navigation";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	console.log("currentUser", currentUser);

	if (!currentUser) {
		redirect("/sign-up");
	}

	const store = await prismadb.store.findFirst({
		where: {
			userId: currentUser.id,
		},
	});

	if (store) {
		redirect(`/${store.id}`);
	}

	return <>{children}</>;
}
