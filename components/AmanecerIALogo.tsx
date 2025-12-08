import React from "react";
import logo from "../assets/logo-amaneceia.png";

interface AmanecerIALogoProps {
  size?: string;
  className?: string;
}

export const AmanecerIALogo: React.FC<AmanecerIALogoProps> = ({
  size = "h-12",
  className,
}) => {
  return (
    <img
      className={`${size} object-contain bg-dawn-purple/20 rounded-lg ${
        className || ""
      }`}
      src={logo}
      alt="AmanecerIA Logo"
    />
  );
};
