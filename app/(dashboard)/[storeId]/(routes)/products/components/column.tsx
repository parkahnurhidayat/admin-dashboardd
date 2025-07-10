"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
  isFeatured: boolean;
  price: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("createdAt") as string | Date; // pastikan field-nya sesuai
      const date = new Date(rawDate);

      const formatted = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
