import { Container, Title, TopBar, Filters } from "@/components/shared";
import { ProductCard } from "@/components/shared/productCard";
import { ProductsGroupList } from "@/components/shared/productsGroupList";

export default function Home() {
    const productsPizza = [
        {
            id: 0,
            name: "Чизбургер пицца",
            items: [{ price: 550 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
            price: 550,
        },
        {
            id: 1,
            name: "Мясной микс с говядиной и колбасками ",
            items: [{ price: 650 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif",
            price: 550,
        },
        {
            id: 2,
            name: "Бефстроганов ",
            items: [{ price: 590 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif",
            price: 550,
        },
        {
            id: 3,
            name: "Чизбургер пицца",
            items: [{ price: 550 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
            price: 550,
        },
        {
            id: 4,
            name: "Мясной микс с говядиной и колбасками ",
            items: [{ price: 650 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif",
            price: 550,
        },
        {
            id: 5,
            name: "Бефстроганов ",
            items: [{ price: 590 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif",
            price: 550,
        },
        {
            id: 6,
            name: "Чизбургер пицца",
            items: [{ price: 550 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
            price: 550,
        },
        {
            id: 7,
            name: "Мясной микс с говядиной и колбасками ",
            items: [{ price: 650 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif",
            price: 550,
        },
        {
            id: 8,
            name: "Бефстроганов ",
            items: [{ price: 590 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif",
            price: 550,
        },
    ];
    const productsBreakfast = [
        {
            id: 0,
            name: "Омлет с пепперони в пите ",
            items: [{ price: 350 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/0194b1fadc94784c9f8454c2c68af191.avif",
            price: 350,
        },
        {
            id: 1,
            name: "Дэнвич с говядиной ",
            items: [{ price: 250 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef023c30bf9e6ba72d6abb6375a56d.avif",
            price: 250,
        },
        {
            id: 2,
            name: "Бефстроганов",
            items: [{ price: 590 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif",
            price: 550,
        },
        {
            id: 3,
            name: "Чизбургер пицца",
            items: [{ price: 550 }],
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
            price: 550,
        },
    ];

    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar />

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {/* Filters */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    {/* Cards list*/}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList title={"Пиццы"} items={productsPizza} categoryId={1} />
                            <ProductsGroupList title={"Завтраки"} items={productsBreakfast} categoryId={2} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
