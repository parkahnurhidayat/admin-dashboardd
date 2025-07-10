"use client";

import AlertModal from "@/components/modal/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "harus mengandung setidaknya 1 karakter" }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      router.push(`/`);
      toast.success("Toko berhasil diperbarui");
    } catch (error) {
      toast.error("Toko gagal diperbarui" + error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Toko berhasil dihapus");
    } catch (error) {
      toast.error("Toko gagal dihapus" + error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        name={initialData.name}
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />
      <div className="flex items-center justify-between my-5">
        <Heading title="Settings" description="Atur Toko" />
        <Button
          variant={"destructive"}
          size={"sm"}
          disabled={loading}
          onClick={() => setOpen(true)}
        >
          <Trash className=" h-4 w-4" />
        </Button>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Toko</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Toko"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
      <Separator className="my-5" />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
