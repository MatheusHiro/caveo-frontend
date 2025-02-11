import { Rating } from "../domain/types/rating";
import StarRating from "./StarRating";

interface RatingGroupProps {
    rating: Rating
}

export default function RatingGroup({ rating }: RatingGroupProps) {
    return (
        <div className="flex items-center space-x-[.25rem]">
            <p className="font-semibold">{rating.rate}</p>
            <StarRating rating={rating.rate} />
            <p className="text-gray-400">{rating.count}</p>
        </div>

    )
}