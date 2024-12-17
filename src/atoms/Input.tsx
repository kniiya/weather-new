interface InputProps {
  id: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  step?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  step,
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    step={step}
    placeholder={placeholder}
    className="base-input"
  />
);
