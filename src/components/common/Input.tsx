interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
}

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  multiline = false,
  rows = 4,
}: InputProps) {
  const inputClasses =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary/30 focus:border-teal-primary transition-all duration-200';

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-coral ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      )}
    </div>
  );
}
