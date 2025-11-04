
import React from 'react';

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=2071&auto=format&fit=crop" 
              alt="Persona sentada en la cama por la mañana, con aspecto pensativo" 
              className="rounded-2xl shadow-lg object-cover w-full max-w-lg aspect-[4/3]"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-night-text mb-4">
              Las mañanas pueden ser difíciles.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto md:mx-0">
              ¿Te despiertas con ansiedad, revisas el móvil y ya te sientes agotado? No estás solo. La primera hora del día define tu estado de ánimo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};