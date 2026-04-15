import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-between">
        <span className="text-sm font-body font-medium text-bark">© {new Date().getFullYear()} Biteory</span>
        <nav className="flex items-center gap-8 text-sm font-body text-bark">
          <Link to="/about" className="hover:text-ink transition-colors">About</Link>
          <Link to="/blog" className="hover:text-ink transition-colors">Blog</Link>
        </nav>
      </div>
    </footer>
  )
}
