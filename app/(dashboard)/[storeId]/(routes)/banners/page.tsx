import db from "@/lib/db";
import BannersClient from "./components/client";

const BannersPage = async ({ params }: { params: { storeId: string } }) => {
  const banners = await db.banner.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-5">
      <BannersClient data={banners} />
    </div>
  );
};

export default BannersPage;
