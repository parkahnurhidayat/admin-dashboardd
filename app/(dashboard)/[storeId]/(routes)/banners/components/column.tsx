"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BannerColumn = {
  id: string;
  label: string;
  createdAt: Date;
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
