import { IoStarSharp } from 'react-icons/io5';

const Star = ({ selected = false, onSelect = (f) => f }) => {
  return (
    <IoStarSharp
      color={selected ? 'yellow' : 'grey'}
      className="inline-block"
      onClick={onSelect}
    />
  );
};

export default function StarRating({
  totalStars = 5,
  selectedStars = 0,
  onRate,
}) {
  return (
    <>
      {[...new Array(totalStars)].map((star, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        />
      ))}
      <p className="text-xs text-gray-700">
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
