import { Link } from 'react-router-dom'
import logoSrc from '@/images/Adobe Express - file (2).png'

export function Header() {
  return (
    <header className="bg-parchment sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center">
        <Link to="/" aria-label="Biteory home">
          <img src={logoSrc} alt="Biteory" className="h-10 w-auto" />
        </Link>
      </div>
    </header>
  )
}
