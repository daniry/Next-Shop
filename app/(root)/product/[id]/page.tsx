import { Container, GroupVariants, ProductImage, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        // include: {
        //     ingredients: true,
        //     category: {
        //         include: {
        //             products: {
        //                 include: {
        //                     items: true,
        //                 },
        //             },
        //         },
        //     },
        //     items: true,
        // },
    });
    if (!product) return notFound();

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1 relative">
                <ProductImage imageUrl={product.imageUrl} size={40} />
                <div className="w-[490px] bg-[#f8f6f6] p-7">
                    <Title text={product.name} size="md" className="font-extrabold mb-1" />
                    <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, vel!</p>

                    <GroupVariants
                        value="1"
                        items={[
                            {
                                name: "Small",
                                value: "1",
                            },
                            {
                                name: "Average",
                                value: "2",
                            },
                            {
                                name: "Big",
                                value: "3",
                                disabled: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
