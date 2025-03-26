import React from "react";
import { Title, FilterCheckbox } from "@/components/shared";
import { Input } from "../ui";
import { RangeSlider } from "./rangeSlider";
import { CheckboxFiltersGroup } from "./checkboxFiltersGroup";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients } = useFilterIngredients()

    const items = ingredients.map((item) => ({value: String(item.id), text: item.name }))

    const data_ingredients = [
        {
            text: "Сырный соус",
            value: "1",
        },
        {
            text: "Моццарелла",
            value: "2",
        },
        {
            text: "Чеснок",
            value: "3",
        },
        {
            text: "Солённые огурчики",
            value: "4",
        },
        {
            text: "Красный лук",
            value: "5",
        },
        {
            text: "Томаты",
            value: "6",
        },
        {
            text: "Сырный соус",
            value: "1",
        },
        {
            text: "Моццарелла",
            value: "2",
        },
        {
            text: "Чеснок",
            value: "3",
        },
        {
            text: "Солённые огурчики",
            value: "4",
        },
        {
            text: "Красный лук",
            value: "5",
        },
        {
            text: "Томаты",
            value: "6",
        },
    ];

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            {/* Top checkboxes */}
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>

            {/* Price inputs */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={30000} defaultValue={0} />
                    <Input type="number" min={100} max={30000} defaultValue={500} placeholder="30000" />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>

            {/* Bottom checkboxes */}
            <CheckboxFiltersGroup title="Ингредиенты" className="mt-5" limit={6} defaultItems={items.slice(0, 6)} items={items} />
        </div>
    );
};
