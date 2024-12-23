import { Select as ChakraSelect } from "@chakra-ui/react";
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
}) => (
  <ChakraSelect
    value={value}
    onChange={onChange}
    className={`base-select ${className || ""}`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </ChakraSelect>
);
