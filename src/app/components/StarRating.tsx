import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
    rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
    const maxStars = 5;
    const percentage = (rating / maxStars) * 100;

    return (
        <div className="relative">
            <div className="flex text-gray-300">
                {[...Array(maxStars)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                ))}
            </div>

            <div
                className="absolute top-0 left-0 flex text-yellow-500 overflow-hidden"
                style={{ width: `${percentage}%` }}
            >
                {[...Array(maxStars)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                ))}
            </div>
        </div>
    );
}
