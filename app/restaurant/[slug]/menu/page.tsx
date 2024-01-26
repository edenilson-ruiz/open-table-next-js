import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantMenu from "./components/RestaurantMenu";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            items: true
        }
    });

    if (!restaurant) {
        throw new Error;
    }

    return restaurant.items;
}


export default async function Menu({ params }: Readonly<{ params: { slug: string } }>) {

    const items = await fetchRestaurantMenu(params.slug);

    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar slug={params.slug} />
            <RestaurantMenu items={items} />
        </div>
    )
}
