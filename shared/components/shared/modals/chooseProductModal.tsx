"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
                <DialogTitle style={{ display: "none" }}>{product.name}</DialogTitle>

                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    );
};
