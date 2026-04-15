import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Biteory</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
        <p className="font-body text-sm text-sand uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display text-4xl font-bold text-ink mb-4">Page not found</h1>
        <p className="font-body text-bark mb-8">
          This page doesn't exist — but there are plenty of great restaurants that do.
        </p>
        <Link
          to="/"
          className="inline-block font-body text-sm text-earth border border-earth rounded px-5 py-2 hover:bg-earth hover:text-white-warm transition-colors"
        >
          Back to all lists
        </Link>
      </div>
    </>
  )
}
