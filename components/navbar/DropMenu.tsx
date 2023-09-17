"use client";

import { SafeUser } from "@/app/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const DropMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px]
         border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropMenu;
