import { Helmet } from 'react-helmet-async'
import { Link, useParams, Navigate } from 'react-router-dom'
import { blogPosts } from '@/data/blogPosts'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const canonicalUrl = `https://foodranker.com/blog/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.subtitle,
    image: post.coverImageUrl,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Biteory',
      url: 'https://foodranker.com',
    },
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Biteory</title>
        <meta name="description" content={post.subtitle} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.subtitle} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.coverImageUrl} />
        <meta property="article:published_time" content={post.isoDate} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.subtitle} />
        <meta name="twitter:image" content={post.coverImageUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link
          to="/blog"
          className="font-body text-sm text-sand hover:text-bark transition-colors duration-150 inline-flex items-center gap-1 mb-10"
        >
          ← Blog
        </Link>

        <header className="mb-6">
          <p className="font-body text-sm text-sand uppercase tracking-widest mb-3">{post.date}</p>
          <h1 className="font-display text-4xl font-bold text-ink mb-3 leading-tight">{post.title}</h1>
          <p className="font-body text-lg text-sand italic">{post.subtitle}</p>
        </header>

        <img
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          className="w-full rounded-lg object-cover aspect-[16/9] mb-10"
        />

        {post.body}
      </div>
    </>
  )
}
