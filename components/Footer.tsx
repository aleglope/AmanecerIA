
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-night-blue text-night-text">
      <div className="container mx-auto px-6 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} AmanecerIA. Todos los derechos reservados.</p>
        <div className="mt-4">
          <a href="#" className="px-3 hover:underline">Términos de Servicio</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="px-3 hover:underline">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};