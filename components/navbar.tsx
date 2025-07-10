import { UserButton } from "@clerk/nextjs";
import MainNavbar from "./main-nav";

import StoreSwicther from "./store-swicther";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwicther items={store} />
        <MainNavbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
