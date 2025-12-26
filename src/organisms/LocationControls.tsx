interface LocationControlsProps {
  children: React.ReactNode;
}

export const LocationControls: React.FC<LocationControlsProps> = ({
  children,
}) => <div className="location-controls">{children}</div>;
