import SectionHeading from "@/components/ui/SectionHeading";
import Carousel from "@/components/ui/Carousel";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { getAverageRating } from "@/data/google-reviews";

function Stars({ rating, size = "h-4 w-4" }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} ${star <= rating ? "text-brand-red" : "text-white/15"}`}
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

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#ffffff"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.75"
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.5"
        d="M5.84 14.11a6.6 6.6 0 010-4.22V7.05H2.18a11 11 0 000 9.9l3.66-2.84z"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.85"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
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

  const average = getAverageRating(reviews);

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-grid opacity-80" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-brand-red/[0.09] blur-[140px]" />

      <div className="section-padding container-wide relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Reviews"
            title="What Clients Say About Our Work"
            accentWord="Clients"
            description="Placeholder review content shown for layout. Verified Google reviews and links can be connected in Supabase before launch."
          />

          {/* Rating summary card */}
          <Reveal delay={120}>
            <div className="panel relative w-full overflow-hidden rounded-3xl p-6 sm:p-7 lg:w-[21rem]">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                  <GoogleGlyph />
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-white">Google Reviews</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-faint">
                    Placeholder data
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-end gap-4">
                <span className="text-[3.25rem] font-extrabold leading-none tracking-tight text-white">
                  {average}
                </span>
                <div className="pb-1.5">
                  <Stars rating={Math.round(average)} size="h-4 w-4" />
                  <p className="mt-2 text-[11.5px] text-brand-muted">
                    {reviews.length} reviews
                  </p>
                </div>
              </div>

              <div className="mt-7">
                {googleBusinessUrl ? (
                  <Button href={googleBusinessUrl} variant="outline" size="sm" external className="w-full">
                    View on Google
                  </Button>
                ) : (
                  <p className="rounded-full border border-dashed border-white/14 px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-faint">
                    Google link — coming soon
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Reviews carousel */}
        <div className="mt-12 sm:mt-16">
          <Carousel
            ariaLabel="Customer reviews"
            itemClassName="min-w-[86%] sm:min-w-[52%] lg:min-w-[33.5%]"
            autoPlay
            interval={6000}
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="glass hover-lift relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-2xl p-5 hover:border-white/16 sm:p-7"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

                <div className="flex items-start justify-between">
                  <Stars rating={review.rating} />
                  <span className="opacity-35">
                    <GoogleGlyph />
                  </span>
                </div>

                <svg
                  className="mt-5 h-6 w-6 text-brand-red/35"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.983 3v7.391C9.983 16.095 6.298 19.65 1 20.995l-.995-2.161c2.632-.811 3.983-2.549 4.062-4.834H0V3h9.983zM24 3v7.391c0 5.704-3.685 9.259-8.983 10.604l-.995-2.161c2.632-.811 3.983-2.549 4.062-4.834H14V3h10z" />
                </svg>

                <p className="mt-4 flex-1 text-[13.5px] leading-[1.75] text-white/80 sm:text-sm">
                  {review.reviewText}
                </p>

                <div className="mt-6 flex items-center gap-3.5 border-t border-white/[0.08] pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-red/20 bg-brand-red/12 text-[13px] font-bold text-brand-red-bright">
                    {review.reviewerName.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-bold text-white">
                      {review.reviewerName}
                    </p>
                    <p className="mt-0.5 text-[11px] text-brand-faint">
                      {formatDate(review.reviewDate)}
                      {review.googleReviewUrl ? (
                        <>
                          {" · "}
                          <a
                            href={review.googleReviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-red hover:underline"
                          >
                            View
                          </a>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
