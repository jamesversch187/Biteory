import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { blogPosts } from '@/data/blogPosts'

const description = 'Notes on restaurants, cities, and eating well. Denver food guides, neighborhood breakdowns, and the best places to eat right now.'

export default function BlogPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Blog</h1>
        <p className="font-body text-sand mb-12">Notes on restaurants, cities, and eating well.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group border border-warm-border rounded-lg overflow-hidden hover:border-bark transition-colors duration-150"
            >
              <img
                src={post.coverImageUrl}
                alt={post.coverImageAlt}
                className="w-full object-cover aspect-[16/9] group-hover:opacity-90 transition-opacity duration-150"
              />
              <div className="p-6">
                <p className="font-body text-xs text-sand uppercase tracking-widest mb-2">{post.date}</p>
                <h2 className="font-display text-xl font-bold text-ink mb-1 group-hover:text-bark transition-colors duration-150">
                  {post.title}
                </h2>
                <p className="font-body text-sand italic">{post.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
