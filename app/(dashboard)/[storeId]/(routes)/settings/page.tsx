import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SettingsForm from "./components/settings-forms";

interface SettingsPageProps {
  params: { storeId: string };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="mx-5">
      <SettingsForm initialData={store} />
    </div>
  );
};

export default SettingsPage;
