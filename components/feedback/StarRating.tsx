"use client";

interface StarRatingProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div className="flex gap-3 justify-center py-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform active:scale-90 focus:outline-none"
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill={value !== null && star <= value ? "#ffd966" : "none"}
            stroke={value !== null && star <= value ? "#f5c842" : "#d1d5db"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}
