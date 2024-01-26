import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient, Cuisine } from '@prisma/client';

export const metadata = {
    title: 'Restaurant Search | OpenTable',
    openGraph: {
        title: 'Restaurant Search | OpenTable',
        description: 'Restaurant OpenTable is a...',
    },
}

const prisma = new PrismaClient();

interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurantsByCity = (searchParams: SearchParams) => {


    const where: any = {}

    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location
    }

    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine
    }

    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price
    }

    const select = {
        id: true,
        name: true,
        main_image: true,
        slug: true,
        cuisine: true,
        location: true,
        price: true,
        reviews: true,
    }

    return prisma.restaurant.findMany({
        where,
        select
    });
}

const fetchLocations = async () => {
    const locations = await prisma.location.findMany();
    return locations;
}

const fetchCuisines = async () => {
    const cuisines = await prisma.cuisine.findMany();
    return cuisines;
}

export default async function Search({ searchParams }: Readonly<{ searchParams: SearchParams }>) {

    const restaurants = await fetchRestaurantsByCity(searchParams);
    const locations = await fetchLocations();
    const cuisines = await fetchCuisines();

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
                <div className="w-5/6">
                    {(restaurants.length)
                        ? (restaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        )))
                        : <p>No restaurants were found for this location</p>
                    }
                </div>
            </div>
        </>
    )
}
