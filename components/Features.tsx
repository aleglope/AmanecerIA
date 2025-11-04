
import React from 'react';

// FIX: Replaced `JSX.Element` with `React.ReactElement` to resolve TypeScript namespace error.
const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-center">
    <div className="flex justify-center items-center mb-4 text-dawn-purple h-12 w-12 rounded-full bg-dawn-purple/10 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 dark:text-night-text">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{text}</p>
  </div>
);

export const Features: React.FC = () => {
  const featuresData = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.734V6a2 2 0 012-2h4a2 2 0 012 2v4z" /></svg>,
      title: "Psicología Real",
      text: "Mensajes diseñados por expertos en TCC para un impacto real."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Registro de Ánimo",
      text: "Sigue tu progreso emocional en 30 segundos cada día."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
      title: "100% Privado",
      text: "Tus datos son tuyos. Usamos encriptación segura para protegerte."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};