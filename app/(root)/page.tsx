import { Container, Title, TopBar, Filters, Stories } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/productsGroupList";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/findPizzas";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
    const categories = await findPizzas(searchParams);
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar categories={categories.filter((category) => category.products.length > 0)} />

            <Stories />

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
