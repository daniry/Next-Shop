"use client";

import React, { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./productCard";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    title: string;
    items: ProductWithRelations[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, className, listClassName }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.2,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting, title, categoryId]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
                {items.map((item, i) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.items[0].price}
                        count={i % 2}
                        ingredients={item.ingredients || []}
                    />
                ))}
            </div>
        </div>
    );
};
