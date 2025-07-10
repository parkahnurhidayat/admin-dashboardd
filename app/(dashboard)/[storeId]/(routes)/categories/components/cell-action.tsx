"use client";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryColumn } from "./column";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modal/alert-modal";

interface CellActionProps {
  data: CategoryColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("API Berhasil diCopy.");
  };

  const onDelete = async (categoryId: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category berhasil dihapus");
    } catch (error) {
      toast.error("Category gagal dihapus" + error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <AlertModal
        name={data.name}
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          color="slate"
          className="z-10 border shadow-lg rounded-lg p-2 bg-white"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
