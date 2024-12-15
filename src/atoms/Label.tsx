// atoms/Label.tsx
interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
}) => (
  <label htmlFor={htmlFor} className={`base-label ${className || ""}`}>
    {children}
  </label>
);
