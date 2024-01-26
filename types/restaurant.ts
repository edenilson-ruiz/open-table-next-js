import { Review } from "@prisma/client";

export interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    open_time: string;
    close_time: string;
    slug: string;
    reviews: Review[];
}