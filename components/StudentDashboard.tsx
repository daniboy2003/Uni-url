import React, { useState } from 'react';
import { User, Vacancy, Application } from '../types';
import { LogOut, Briefcase, MapPin, Clock, Search, BookOpen, Building2, CheckCircle, XCircle, Clock3 } from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  vacancies: Vacancy[];
  applications: Application[];
  onLogout: () => void;
  onApply: (vacancyId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  vacancies,
  applications,
  onLogout,
  onApply
}) => {
  const [activeTab, setActiveTab] = useState<'vacancies' | 'applications'>('vacancies');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Prácticas Profesionales' | 'Servicio Social'>('all');

  // Logic to determine if applied
  const hasApplied = (vacancyId: string) => {
    return applications.some(app => app.vacancyId === vacancyId);
  };

  // Filter vacancies
  const filteredVacancies = vacancies.filter(v => {
    const matchesSearch = v.position.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || v.type === typeFilter || v.type === 'Ambos';
    return matchesSearch && matchesType && v.status === 'active';
  });

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'reviewing': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-5 h-5" />;
      case 'rejected': return <XCircle className="w-5 h-5" />;
      default: return <Clock3 className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return 'Aceptado';
      case 'rejected': return 'Rechazado';
      case 'reviewing': return 'En Revisión';
      default: return 'Pendiente';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">UniConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
                <span className="text-xs text-gray-500">{user.career} • Semestre {user.semester}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'vacancies'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Explorar Vacantes
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'applications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Mis Postulaciones ({applications.length})
          </button>
        </div>

        {activeTab === 'vacancies' ? (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por puesto o empresa..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                >
                  <option value="all">Todos los programas</option>
                  <option value="Prácticas Profesionales">Prácticas Profesionales</option>
                  <option value="Servicio Social">Servicio Social</option>
                </select>
              </div>
            </div>

            {/* Vacancy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVacancies.map((vacancy) => {
                const isApplied = hasApplied(vacancy.id);
                return (
                  <div key={vacancy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <img 
                          src={vacancy.logo} 
                          alt={vacancy.company} 
                          className="w-12 h-12 rounded-lg object-cover bg-gray-50"
                        />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          vacancy.type === 'Servicio Social' ? 'bg-purple-100 text-purple-700' : 
                          vacancy.type === 'Prácticas Profesionales' ? 'bg-blue-100 text-blue-700' :
                          'bg-indigo-100 text-indigo-700'
                        }`}>
                          {vacancy.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{vacancy.position}</h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span className="text-sm">{vacancy.company}</span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {vacancy.location} ({vacancy.modality})
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {vacancy.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                          {vacancy.area}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {vacancy.requirements.slice(0, 3).map((req, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {req}
                          </span>
                        ))}
                        {vacancy.requirements.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{vacancy.requirements.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                      <button
                        onClick={() => onApply(vacancy.id)}
                        disabled={isApplied}
                        className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                          isApplied
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                      >
                        {isApplied ? 'Postulación Enviada' : 'Aplicar Ahora'}
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {filteredVacancies.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>No se encontraron vacantes que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Applications Tab */
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((app) => {
                const vacancy = vacancies.find(v => v.id === app.vacancyId);
                if (!vacancy) return null;

                return (
                  <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img 
                        src={vacancy.logo} 
                        alt={vacancy.company} 
                        className="w-16 h-16 rounded-lg object-cover bg-gray-50"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{vacancy.position}</h3>
                        <p className="text-gray-600">{vacancy.company}</p>
                        <p className="text-sm text-gray-400 mt-1">Aplicado el: {new Date(app.appliedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      <span className="font-medium text-sm capitalize">
                        {getStatusText(app.status)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Aún no tienes postulaciones</h3>
                <p className="text-gray-500 mb-6">Explora las vacantes disponibles y da el primer paso.</p>
                <button 
                  onClick={() => setActiveTab('vacancies')}
                  className="text-blue-600 font-medium hover:text-blue-800"
                >
                  Ir a Vacantes &rarr;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};