import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function Navbar({ transparent = false }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 ${transparent ? 'bg-transparent' : 'bg-slate-950'}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Ulhim
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/features" className="text-sm text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  transparent: PropTypes.bool
} 