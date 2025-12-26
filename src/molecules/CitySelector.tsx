import { Label } from "../atoms/Label";
import { Select } from "../atoms/Select";

interface CitySelectorProps {
  selectedCity: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CITY_OPTIONS = [
  { value: "Tokyo", label: "Tokyo" },
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Paris", label: "Paris" },
  { value: "Berlin", label: "Berlin" },
  { value: "Sydney", label: "Sydney" },
  { value: "Mumbai", label: "Mumbai" },
];

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onChange,
}) => (
  <div className="city-selector">
    <Label htmlFor="city-select">Select City:</Label>
    <Select
      options={CITY_OPTIONS}
      value={selectedCity}
      onChange={onChange}
      className="city-select"
    />
  </div>
);
