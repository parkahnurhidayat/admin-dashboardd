"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, ProductColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductsClientProps {
  data: ProductColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={`Produtcs (${data.length})`}
          description="Atur Product untuk Toko"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Heading title="API" description="API untuk Products" />
      <Separator className="my-4" />
      <ApiList namaIndikator="products" idIndikator="{productId}" />
    </>
  );
};

export default ProductsClient;
