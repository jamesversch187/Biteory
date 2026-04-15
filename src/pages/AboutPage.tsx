import { Helmet } from 'react-helmet-async'

const description = 'Biteory cuts through rating inflation to help you find restaurants actually worth going to — with curated ranked lists and dish-level recommendations.'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Biteory</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="About — Biteory" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://foodranker.com/about" />
        <meta name="twitter:title" content="About — Biteory" />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://foodranker.com/about" />
      </Helmet>

    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 space-y-16">

      {/* Hero */}
      <section>
        <h1 className="font-display text-5xl font-bold text-ink mb-6 leading-tight">
          Make every meal count
        </h1>
        <p className="font-body text-lg text-bark leading-relaxed">
          Biteory exists because finding a truly great restaurant has become harder than it should be. Open Google Maps in any city and you'll find hundreds of places rated 4.6 stars. The scale is broken — and the stakes are real.
        </p>
      </section>

      {/* Problem */}
      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-4">The rating problem</h2>
        <p className="font-body text-bark leading-relaxed mb-4">
          Star ratings were supposed to cut through the noise. Instead, rating inflation has made them nearly useless. When everything is 4.5 or above, there's no signal left — just a sea of mediocrity masquerading as excellence.
        </p>
        <p className="font-body text-bark leading-relaxed">
          The problem isn't just the numbers. It's what gets lost in them: the specific dish that makes a restaurant worth going to, the neighborhood gem that outperforms its hype-driven competition, the hole-in-the-wall that a well-travelled local would take you to on your first night in town.
        </p>
      </section>

      {/* Who it's for */}
      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Who this is for</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink mb-2">The occasional diner</h3>
            <p className="font-body text-bark leading-relaxed">
              Not everyone eats out every week. When a dinner out is a treat — a birthday, an anniversary, a rare splurge — you shouldn't have to gamble on it. Biteory helps you walk in knowing exactly what to order and why it's worth your time.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink mb-2">The traveler</h3>
            <p className="font-body text-bark leading-relaxed">
              You have two nights in a city you've never been to. You could spend an hour scrolling through identical-looking review pages, or you could open a ranked list and know in thirty seconds where to go and what to get. Biteory is built for that moment.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink mb-2">The curious local</h3>
            <p className="font-body text-bark leading-relaxed">
              Even if you live somewhere, it's easy to default to the same handful of places. Our lists surface the restaurants your city is quietly proud of — the ones that earn their reputation through the food, not the marketing.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-4">How it works</h2>
        <p className="font-body text-bark leading-relaxed mb-4">
          Each list on Biteory is a curated ranking, not an algorithm. We focus on specific cuisines and cities, ordering restaurants from best to good — not filtering out anything below a threshold. Rank matters. First place is better than second.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          Crucially, we go beyond the restaurant. Where we can, we tell you which dishes to order. A great restaurant with a bad order is a disappointing meal. The best bowl of ramen in the city doesn't help you if you didn't know to ask for the rich broth.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Community votes keep rankings honest over time. A restaurant that was brilliant two years ago but has slipped shouldn't stay at the top — and one that's quietly become the best in its category should rise.
        </p>
      </section>

      {/* Ethos */}
      <section className="border-l-2 border-warm-border pl-6">
        <p className="font-body text-bark leading-relaxed italic">
          "A meal out is a small act of optimism — you're choosing to believe the next two hours will be memorable. We think you deserve better odds than a 4.6-star average gives you."
        </p>
      </section>

    </div>
    </>
  )
}
