import db from "@/lib/db";
import { CategoryColumn } from "./components/column";
import CategoryClient from "./components/client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      banner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    bannerLabel: item.banner.label,
    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <div className="p-5">
      <CategoryClient data={formattedCategories} />
    </div>
  );
};

export default CategoriesPage;
