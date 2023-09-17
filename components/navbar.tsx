import { redirect } from "next/navigation";

import getCurrentUser from "@/actions/getCurrentUser";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import DropMenu from "./navbar/DropMenu";

const Navbar = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <DropMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
