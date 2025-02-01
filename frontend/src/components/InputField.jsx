const InputField = ({ label, type, name, value, onChange, placeholder, className }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-white mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`w-full bg-black text-white  border-blue-500 p-2 border-b-2 focus:outline-none ${className}`}
      />
    </div>
  );
};

export default InputField;
