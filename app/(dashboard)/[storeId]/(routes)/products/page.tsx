import db from "@/lib/db";

import { formatter } from "@/lib/utils";
import { ProductColumn } from "./components/column";
import ProductsClient from "./components/client";

const BannersPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <div className="p-5">
      <ProductsClient data={formattedProducts} />
    </div>
  );
};

export default BannersPage;
