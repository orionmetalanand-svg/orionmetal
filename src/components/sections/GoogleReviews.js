import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getAverageRating } from "@/data/google-reviews";
import { company } from "@/data/company";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-yellow-400" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    month: "short",
    year: "numeric",
  });
}

export default function GoogleReviews({ reviews, googleBusinessUrl = null }) {
  if (!reviews?.length) return null;

  const averageRating = getAverageRating(reviews);

  return (
    <section className="section-padding bg-brand-dark">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Reviews"
          title="Google Reviews"
          description="Placeholder review content for layout preview. Replace with verified Google review links in Supabase before publishing structured review data."
          align="center"
        />

        <div className="mx-auto mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-white">{averageRating}</span>
            <div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-sm text-brand-muted">{reviews.length} reviews</p>
            </div>
          </div>
          {googleBusinessUrl && (
            <Button href={googleBusinessUrl} variant="outline" size="sm" external className="ml-0 sm:ml-6">
              View on Google
            </Button>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col border border-white/10 bg-brand-black p-6"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                {review.reviewDate && (
                  <time dateTime={review.reviewDate} className="text-xs text-brand-muted">
                    {formatDate(review.reviewDate)}
                  </time>
                )}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-muted">
                &ldquo;{review.reviewText}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-white">— {review.reviewerName}</p>
              {review.googleReviewUrl ? (
                <a
                  href={review.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs font-semibold text-brand-red hover:underline"
                >
                  View on Google →
                </a>
              ) : (
                <span className="mt-3 text-xs text-brand-muted italic">Google link — coming soon</span>
              )}
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-brand-muted">
          Had a great experience with {company.shortName}?{" "}
          {googleBusinessUrl ? (
            <a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">
              Leave us a review on Google
            </a>
          ) : (
            <span>Google Business link — add to Supabase / env when ready</span>
          )}
        </p>
      </div>
    </section>
  );
}
