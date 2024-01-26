import { Cuisine, Location, PRICE, Review } from "@prisma/client";


export interface RestaurantCardType {
    id: number;
    name: string;
    main_image: string;
    cuisine: Cuisine;
    location: Location;
    price: PRICE;
    slug: string;
    reviews: Review[];
    open_time: string;
    close_time: string;
}