"use client";
import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, PlusCircle, StoreIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwictherProps extends PopOverTriggerProps {
  items: Store[];
}

const StoreSwicther = ({ className, items = [] }: StoreSwictherProps) => {
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formmatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formmatedItems.find(
    (items) => items.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            role="combobox"
            aria-expanded={open}
            aria-label="Pilih Toko"
            className={cn("w-[200px]", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            <div className="font-semibold text-sm">{currentStore?.label}</div>
            <ChevronDown className="ml-auto h-4 w-4 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              <CommandInput placeholder="Cari Toko..." />
              <CommandEmpty>Tidak Ada Toko</CommandEmpty>
              <CommandGroup heading="Toko">
                {formmatedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Buat Toko
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StoreSwicther;
