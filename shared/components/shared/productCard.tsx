import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";

interface Props {
    id: number;
    name: string;
    price: number;
    count?: number;
    ingredients?: Ingredient[];
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <Image src={imageUrl} alt={name} width={215} height={215} />
                </div>
                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">{ingredients ? ingredients.map((item) => item.name).join(", ") : ""}</p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>
                    {/* {count ? (
                        <CountButton value={count} size="lg" />
                    ) : ( */}
                    <Button variant="secondary">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                    {/* )} */}
                </div>
            </Link>
        </div>
    );
};
