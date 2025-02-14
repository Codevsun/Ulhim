import PropTypes from 'prop-types'

export function Button({ children = 'Button', type = 'button', className = '', onClick, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 w-full cursor-pointer rounded-full border border-blue-500 bg-transparent px-4 py-2 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
