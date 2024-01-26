import { PrismaClient } from "@prisma/client";
import { RestaurantCardType } from '../types/restaurants';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    }
  });
  return restaurants;
}


export default async function Home() {

  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  )
}
