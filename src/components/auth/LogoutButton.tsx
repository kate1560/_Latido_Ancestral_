'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface LogoutButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children = 'Cerrar sesión',
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Aquí podrías hacer una llamada a la API para invalidar el token si es necesario
      // await api.post('/api/auth/logout');
      
      // Eliminar el usuario del almacenamiento local
      localStorage.removeItem('user');
      
      // Redirigir al login
      router.push('/login');
      router.refresh(); // Forzar recarga de la página para actualizar el estado de autenticación
      
      toast.success('Has cerrado sesión correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Ocurrió un error al cerrar sesión');
    }
  };

  // Estilos base
  const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variantes de estilo
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500',
  };
  
  // Tamaños
  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Ancho completo
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={handleLogout}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}
