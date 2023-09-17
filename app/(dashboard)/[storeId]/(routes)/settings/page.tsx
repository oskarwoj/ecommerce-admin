import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";
import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
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
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default SettingsPage;
