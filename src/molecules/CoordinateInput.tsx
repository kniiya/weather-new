import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
interface CoordinateInputProps {
  latitude: number;
  longitude: number;
  onLatitudeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLongitudeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CoordinateInput: React.FC<CoordinateInputProps> = ({
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
}) => (
  <div className="coordinate-inputs">
    <div className="input-group">
      <Label htmlFor="latitude">Latitude:</Label>
      <Input
        id="latitude"
        type="number"
        value={latitude}
        onChange={onLatitudeChange}
        step="0.01"
        placeholder="Enter latitude"
      />
    </div>
    <div className="input-group">
      <Label htmlFor="longitude">Longitude:</Label>
      <Input
        id="longitude"
        type="number"
        value={longitude}
        onChange={onLongitudeChange}
        step="0.01"
        placeholder="Enter longitude"
      />
    </div>
  </div>
);
