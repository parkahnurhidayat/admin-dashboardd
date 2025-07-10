"use client";

import AlertModal from "@/components/modal/alert-modal";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { Banner } from "@prisma/client";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface BannerFormProps {
  initialData: Banner | null;
}

const formSchema = z.object({
  label: z
    .string()
    .min(1, { message: "harus mengandung setidaknya 1 karakter" }),
  imageUrl: z
    .string()
    .min(1, { message: "harus mengandung setidaknya 1 karakter" }),
});

type BannerFormValues = z.infer<typeof formSchema>;

const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Banner" : "Tambah Banner";
  const description = initialData ? "Edit Banner" : "Tambah Banner";
  const toastMessage = initialData
    ? "Banner berhasil diperbarui"
    : "Banner berhasil dibuat";
  const action = initialData ? "Simpan Banner" : "Buat Banner";

  const params = useParams();
  const router = useRouter();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/banners/${params.bannerId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/banners`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Banner gagal diperbarui" + error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/banners/${params.bannersId}`);
      router.refresh();
      router.push("/");
      toast.success("banner berhasil dihapus");
    } catch (error) {
      toast.error("Banner gagal dihapus" + error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />
      <div className="flex items-center justify-between my-5">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Label Banner"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BannerForm;
