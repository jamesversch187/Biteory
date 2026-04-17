import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { blogPosts } from '@/data/blogPosts'

const description = 'Notes on restaurants, cities, and eating well. Denver food guides, neighborhood breakdowns, and the best places to eat right now.'

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <Helmet>
        <title>Blog — Biteory</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Blog — Biteory" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://foodranker.com/blog" />
        <meta name="twitter:title" content="Blog — Biteory" />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://foodranker.com/blog" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold text-ink mb-1">Blog</h1>
        <p className="font-body text-sand mb-10">Notes on restaurants, cities, and eating well.</p>

        {/* Featured post */}
        <Link
          to={`/blog/${featured.slug}`}
          className="block relative rounded-2xl overflow-hidden mb-8 group aspect-[21/9] border border-warm-border hover:border-bark transition-colors duration-200"
        >
          <img
            src={featured.coverImageUrl}
            alt={featured.coverImageAlt}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="font-body text-xs text-sand uppercase tracking-widest mb-2">{featured.date}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white-warm leading-tight mb-2 max-w-2xl">
              {featured.title}
            </h2>
            <p className="font-body text-sm text-sand italic">{featured.subtitle}</p>
          </div>
        </Link>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex flex-col group rounded-xl border border-warm-border overflow-hidden hover:border-bark hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex flex-col flex-1 bg-cream">
                <p className="font-body text-xs text-sand uppercase tracking-widest mb-1.5">{post.date}</p>
                <h2 className="font-display text-base font-bold text-ink leading-snug mb-1 group-hover:text-earth transition-colors duration-150">
                  {post.title}
                </h2>
                <p className="font-body text-xs text-bark italic line-clamp-2 mt-auto pt-2">{post.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
