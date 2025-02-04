import PropTypes from 'prop-types'

export function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  className,
  inputMode,
  pattern,
  maxLength,
  required,
  ...props
}) {
  return (
    <div className="space-y-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        required={required}
        className={`w-full bg-transparent border-b ${
          error ? 'border-red-500' : 'border-gray-600'
        } px-4 py-2 focus:outline-none ${
          !error ? 'focus:border-blue-500' : 'focus:border-red-500'
        } transition-all duration-200 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  inputMode: PropTypes.string,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool
} 