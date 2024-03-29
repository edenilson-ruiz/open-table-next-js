import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../../../utils/calculateReviewRatingAverage";
import Stars from "../../../components/Stars";

export default function Rating({ reviews }: { reviews: Review[] }) {

    const renderRatingAvg = () => {
        const rating = calculateReviewRatingAverage(reviews);

        return rating.toFixed(1);
    }

    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <p><Stars reviews={reviews} /></p>
                <p className="text-reg ml-3">{renderRatingAvg()}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ? '' : 's'} </p>
            </div>
        </div>
    );
}