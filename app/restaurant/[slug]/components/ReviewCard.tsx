import { Review } from "@prisma/client";
import Stars from "../../../components/Stars";

function getFirstLetters(str: string) {
    const firstLetters = str
        .split(' ')
        .map(word => word.charAt(0))
        .join('');

    return firstLetters;
}



export default function ReviewCard({ review }: { review: Review }) {

    const initialFirstName = getFirstLetters(review.first_name);
    const initialLastName = getFirstLetters(review.last_name);

    return (
        <div className="border-b pb-7 mb-7">
            <div className="flex">
                <div className="w-1/6 flex flex-col items-center">
                    <div
                        className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center"
                    >
                        <h2 className="text-white text-2xl">{initialFirstName}{initialLastName}</h2>
                    </div>
                    <p className="text-center">{review.first_name} {review.last_name}</p>
                </div>
                <div className="ml-10 w-5/6">
                    <div className="flex items-center">
                        <div className="flex mr-5">
                            <Stars rating={review.rating} reviews={[]} />
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-light">
                            {review.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}