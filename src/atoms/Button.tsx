import { Button as ChakraButton } from "@chakra-ui/react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => (
  <ChakraButton onClick={onClick} className={className} colorScheme="blue">
    {children}
  </ChakraButton>
);
