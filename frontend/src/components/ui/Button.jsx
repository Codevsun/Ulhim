import PropTypes from 'prop-types'

export function Button({ children, type = "button", className = "", onClick, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-12 bg-transparent border border-blue-500 text-blue-500 rounded-full py-2 px-4 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}