import React from 'react';

interface AmanecerIALogoProps {
  size?: string;
  className?: string;
}

export const AmanecerIALogo: React.FC<AmanecerIALogoProps> = ({ size = 'h-12', className }) => {
  const logoSrc = '/AmanecerIA-Logo.png'; 

  return (
    <img 
      className={`${size} ${className || ''}`}
      src={logoSrc} 
      alt="AmanecerIA Logo" 
    />
  );
};