import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultView = 'register' }) => {
  const [view, setView] = useState(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [resentEmail, setResentEmail] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const { login, register, resendConfirmationEmail } = useContext(AuthContext);

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);
  
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setName('');
        setError('');
        setIsLoading(false);
        setShowConfirmationMessage(false);
        setResentEmail(false);
        setNeedsConfirmation(false);
      }, 300); 
    } else {
        setError('');
        setShowConfirmationMessage(false);
        setResentEmail(false);
        setNeedsConfirmation(false);
    }
  }, [isOpen, view]);

  const handleResendEmail = async () => {
    if (!email) return;
    setIsLoading(true);
    setResentEmail(false);
    try {
        await resendConfirmationEmail(email);
        setResentEmail(true);
        setError('');
        setNeedsConfirmation(false);
    } catch (err: any) {
        setError('Error al reenviar el correo. Inténtalo de nuevo.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNeedsConfirmation(false);
    setIsLoading(true);
    setResentEmail(false);
    try {
      if (view === 'login') {
        if (!email || !password) {
            setError('Por favor, introduce tu email y contraseña.');
            setIsLoading(false);
            return;
        }
        await login(email, password);
        onClose();
      } else {
        if (!name || !email || !password) {
            setError('Por favor, completa todos los campos.');
            setIsLoading(false);
            return;
        }
        await register(name, email, password);
        setShowConfirmationMessage(true);
      }
    } catch (err: any) {
      // Safely convert the error message to a lowercase string to make detection robust.
      const message = String(err?.message || '').toLowerCase();

      // Check for the "email not confirmed" case first.
      if (message.includes('email not confirmed')) {
        setNeedsConfirmation(true);
        // Crucially, ensure no other error message is displayed.
        setError(''); 
      } else if (message.includes('invalid login credentials')) {
        setError('El correo electrónico o la contraseña son incorrectos. Por favor, inténtalo de nuevo.');
        setNeedsConfirmation(false); // Ensure the confirmation banner is hidden.
      } else {
        setError('Ha ocurrido un error. Revisa tus datos o inténtalo más tarde.');
        setNeedsConfirmation(false);
      }
      console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all duration-300 animate-[scaleUp_0.3s_ease-out_forwards]"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {showConfirmationMessage ? (
          <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-night-text mb-2">¡Casi listo!</h2>
              <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                  Te hemos enviado un correo a <strong>{email}</strong>. Por favor, haz clic en el enlace de confirmación para activar tu cuenta.
              </p>
              <button onClick={onClose} className="w-full bg-night-blue hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-white dark:text-night-blue text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
                  Entendido
              </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-night-text mb-2">
              {view === 'login' ? 'Bienvenido/a' : 'Respira. Estamos aquí.'}
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              {view === 'login' ? 'Inicia sesión para continuar.' : 'Crea tu cuenta para empezar.'}
            </p>
            
            <button className="w-full bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-night-text font-semibold py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-colors duration-300 flex items-center justify-center mb-4">
                <img src="https://www.google.com/favicon.ico" alt="Google icon" className="h-5 w-5 mr-3"/>
                Continuar con Google
            </button>

            <div className="my-4 flex items-center">
                <hr className="w-full border-t border-gray-200 dark:border-gray-600" />
                <span className="px-2 text-gray-400 text-xs">O</span>
                <hr className="w-full border-t border-gray-200 dark:border-gray-600" />
            </div>

            <form onSubmit={handleSubmit}>
              {view === 'register' && (
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                  <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="shadow-sm appearance-none border dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-700 dark:text-night-text bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-dawn-blue" />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="shadow-sm appearance-none border dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-700 dark:text-night-text bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-dawn-blue" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="shadow-sm appearance-none border dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-700 dark:text-night-text bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-dawn-blue" />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-3 rounded-r-lg mb-4">
                  <p className="text-red-800 dark:text-red-200 text-sm font-semibold text-center">{error}</p>
                </div>
              )}
              
              {view === 'login' && needsConfirmation && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4 text-sm">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Confirma tu correo electrónico</h4>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                        Revisa tu bandeja de entrada y haz clic en el enlace de activación.
                    </p>
                    <button type="button" onClick={handleResendEmail} disabled={isLoading} className="font-semibold text-yellow-800 dark:text-yellow-200 hover:underline mt-2 disabled:opacity-50">
                        {isLoading ? 'Enviando...' : 'Reenviar correo'}
                    </button>
                </div>
              )}
              
              {resentEmail && <p className="text-green-600 text-xs text-center mb-4">¡Correo de confirmación reenviado con éxito a <strong>{email}</strong>!</p>}

              <div className="mt-6">
                <button type="submit" disabled={isLoading} className="w-full bg-night-blue hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-white dark:text-night-blue text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400">
                  {isLoading ? <LoadingSpinner /> : (view === 'login' ? 'Iniciar Sesión' : 'Registrarse con Email')}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              {view === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              <button onClick={() => setView(view === 'login' ? 'register' : 'login')} className="font-semibold text-dawn-purple hover:underline ml-1">
                {view === 'login' ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">Al continuar, aceptas nuestros <a href="#" className="underline">Términos</a> y <a href="#" className="underline">Política de Privacidad</a>.</p>
          </>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};