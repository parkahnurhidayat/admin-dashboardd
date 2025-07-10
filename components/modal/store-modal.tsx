"use client";
import { z } from "zod";
import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";

import { AlertCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const storeModal = useStoreModal();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-green-50 border border-green-400 text-green-800 shadow-lg rounded-lg px-4 py-3 flex items-start gap-3`}
        >
          <CheckCircle className="text-green-500 mt-1" size={20} />
          <div className="flex-1">
            <p className="font-semibold">Store berhasil ditambahkan</p>
            <p className="text-sm">Store kamu sudah masuk ke sistem 🎉</p>
          </div>
        </div>
      ));

      window.location.assign(`/${response.data.id}`);
      console.log(response.data);
    } catch (error) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-red-50 border border-red-400 text-red-800 shadow-lg rounded-lg px-4 py-3 flex items-start gap-3`}
        >
          <AlertCircle className="text-red-500 mt-1" size={20} />
          <div className="flex-1">
            <p className="font-semibold">Gagal menambahkan data</p>
            <p className="text-sm">Terjadi kesalahan saat menyimpan data 🚫</p>
          </div>
        </div>
      ));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Buat Store"
      description="Tambah store untuk membuat produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Toko</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Toko" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button variant={"outline"} onClick={storeModal.onClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
