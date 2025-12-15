import React, { useState } from 'react';
import { School, User, Shield, GraduationCap } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string, role: 'student' | 'admin') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('usuario@universidad.edu.mx');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<'student' | 'admin'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden">
        
        {/* Left Side - Image/Brand */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-blue-900 opacity-20 z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <School className="w-10 h-10" />
              <h1 className="text-3xl font-bold">UniConnect</h1>
            </div>
            <p className="text-xl font-light leading-relaxed">
              Tu puente hacia el futuro profesional. Encuentra prácticas profesionales y servicio social en las mejores empresas.
            </p>
          </div>
          <div className="relative z-10 text-sm opacity-80">
            © 2024 Portal Universitario
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido de nuevo</h2>
          <p className="text-gray-500 mb-8">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all text-sm font-medium ${
                  role === 'student' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Estudiante
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all text-sm font-medium ${
                  role === 'admin' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                Administrador
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Institucional</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="nombre@universidad.edu.mx"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};