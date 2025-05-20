import { Container, Title, TopBar, Filters } from "@/shared/components/shared";
// import { ProductCard } from "@/components/shared/productCard";
import { ProductsGroupList } from "@/shared/components/shared/productsGroupList";
import { Api } from "@/shared/services/apiClient";
import { Suspense } from "react";

export default async function Home() {
    const categories = await Api.categories.getAll();
    // const categories = await prisma.category.findMany({
    //     include: {
    //         products: {
    //             include: {
    //                 ingredients: true,
    //                 items: true,
    //             },
    //         },
    //     },
    // });
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar categories={categories.filter((category) => category.products.length > 0)} />

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {/* Filters */}
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>

                    {/* Cards list*/}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && <ProductsGroupList key={category.id} title={category.name} items={category.products} categoryId={category.id} />
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
