export const googleReviews = [
  {
    id: "review-1",
    reviewerName: "James M.",
    rating: 5,
    reviewText:
      "Excellent quality on our custom metal enclosures. Precision was spot-on and delivery was on schedule. Highly recommend for commercial fabrication work.",
    reviewDate: "2025-11-15",
    googleReviewUrl: null,
    includeInSchema: false,
  },
  {
    id: "review-2",
    reviewerName: "Sarah T.",
    rating: 5,
    reviewText:
      "Orion handled our laser cutting and powder coating requirements professionally. Good communication throughout and competitive pricing for the quality delivered.",
    reviewDate: "2025-12-02",
    googleReviewUrl: null,
    includeInSchema: false,
  },
  {
    id: "review-3",
    reviewerName: "David K.",
    rating: 5,
    reviewText:
      "Used Orion for a custom fabrication project in Moorabbin. The team understood our specifications and delivered exactly what we needed. Will use again.",
    reviewDate: "2026-01-20",
    googleReviewUrl: null,
    includeInSchema: false,
  },
  {
    id: "review-4",
    reviewerName: "Priya R.",
    rating: 4,
    reviewText:
      "Good workmanship on our sheet metal bending and assembly job. Responsive service and fair turnaround time for our industrial project.",
    reviewDate: "2026-02-08",
    googleReviewUrl: null,
    includeInSchema: false,
  },
  {
    id: "review-5",
    reviewerName: "Michael B.",
    rating: 5,
    reviewText:
      "Professional fabrication shop. They processed our drawings quickly and the finished product met our commercial standards. Recommended for Melbourne industrial work.",
    reviewDate: "2026-03-01",
    googleReviewUrl: null,
    includeInSchema: false,
  },
];

export function getAverageRating(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
