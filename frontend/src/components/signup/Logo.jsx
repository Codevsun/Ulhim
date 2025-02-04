import PropTypes from 'prop-types'
import logo from '../../assets/logo.png'

export function Logo({ className = '' }) {
  return (
    <div className={`relative z-10 ${className}`}>
      <img 
        src={logo} 
        alt="Ulhim Platform" 
        className="w-16"
      />
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string
} 