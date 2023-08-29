import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import UserMenu from "./navbar/UserMenu";

const Navbar = async () => {
	const currentUser = await getCurrentUser();

	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const stores = await prismadb.store.findMany({
		where: {
			userId,
		},
	});

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher items={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<ThemeToggle />
					<UserMenu currentUser={currentUser} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
