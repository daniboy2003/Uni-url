import React, { useState } from 'react';
import { User, Vacancy, Application } from '../types';
import { LogOut, LayoutDashboard, FileText, Users, Plus, Edit2, Trash2, Check, X, Search, Building, MapPin } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  vacancies: Vacancy[];
  applications: Application[];
  onLogout: () => void;
  onAddVacancy: (vacancy: Omit<Vacancy, 'id' | 'posted' | 'applicants'>) => void;
  onUpdateVacancy: (id: string, updates: Partial<Vacancy>) => void;
  onDeleteVacancy: (id: string) => void;
  onUpdateApplicationStatus: (id: string, status: Application['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  vacancies,
  applications,
  onLogout,
  onAddVacancy,
  onUpdateVacancy,
  onDeleteVacancy,
  onUpdateApplicationStatus
}) => {
  const [activeView, setActiveView] = useState<'vacancies' | 'applications'>('vacancies');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for new vacancy form
  const [newVacancy, setNewVacancy] = useState<Partial<Vacancy>>({
    company: '',
    logo: 'https://picsum.photos/200/200',
    position: '',
    type: 'Prácticas Profesionales',
    area: '',
    location: '',
    modality: 'Presencial',
    duration: '',
    requirements: [],
    description: '',
    benefits: [],
    status: 'active'
  });
  const [reqInput, setReqInput] = useState('');
  const [benInput, setBenInput] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVacancy(newVacancy as any);
    setIsModalOpen(false);
    // Reset form
    setNewVacancy({
      company: '',
      logo: 'https://picsum.photos/200/200',
      position: '',
      type: 'Prácticas Profesionales',
      area: '',
      location: '',
      modality: 'Presencial',
      duration: '',
      requirements: [],
      description: '',
      benefits: [],
      status: 'active'
    });
  };

  const addRequirement = () => {
    if (reqInput.trim()) {
      setNewVacancy({ ...newVacancy, requirements: [...(newVacancy.requirements || []), reqInput] });
      setReqInput('');
    }
  };

  const addBenefit = () => {
    if (benInput.trim()) {
      setNewVacancy({ ...newVacancy, benefits: [...(newVacancy.benefits || []), benInput] });
      setBenInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="text-blue-400" />
            Panel Admin
          </h1>
          <p className="text-xs text-slate-400 mt-1">{user.university}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('vacancies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'vacancies' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-5 h-5" />
            Gestionar Vacantes
          </button>
          <button
            onClick={() => setActiveView('applications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'applications' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Users className="w-5 h-5" />
            Solicitudes
            {applications.filter(a => a.status === 'pending').length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {applications.filter(a => a.status === 'pending').length}
              </span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeView === 'vacancies' ? 'Vacantes Disponibles' : 'Solicitudes de Estudiantes'}
            </h2>
            {activeView === 'vacancies' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nueva Vacante
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-gray-500 text-sm mb-1">Total Vacantes</div>
              <div className="text-3xl font-bold text-gray-900">{vacancies.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-gray-500 text-sm mb-1">Solicitudes Pendientes</div>
              <div className="text-3xl font-bold text-blue-600">
                {applications.filter(a => a.status === 'pending').length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-gray-500 text-sm mb-1">Total Aplicaciones</div>
              <div className="text-3xl font-bold text-gray-900">{applications.length}</div>
            </div>
          </div>

          {activeView === 'vacancies' ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-medium text-gray-500 text-sm">Empresa / Puesto</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-sm">Tipo</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-sm">Ubicación</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-sm">Candidatos</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-sm">Estado</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vacancies.map((vacancy) => (
                      <tr key={vacancy.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={vacancy.logo} alt="" className="w-8 h-8 rounded object-cover bg-gray-100" />
                            <div>
                              <div className="font-medium text-gray-900">{vacancy.position}</div>
                              <div className="text-sm text-gray-500">{vacancy.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {vacancy.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {vacancy.location}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {vacancy.applicants}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vacancy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {vacancy.status === 'active' ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => onUpdateVacancy(vacancy.id, { status: vacancy.status === 'active' ? 'inactive' : 'active' })}
                              className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"
                              title={vacancy.status === 'active' ? 'Desactivar' : 'Activar'}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => onDeleteVacancy(vacancy.id)}
                              className="text-red-600 hover:bg-red-50 p-1.5 rounded"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Applications View */
            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">No hay solicitudes registradas.</p>
                </div>
              ) : (
                applications.map((app) => {
                  const vacancy = vacancies.find(v => v.id === app.vacancyId);
                  return (
                    <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                            {app.studentName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{app.studentName}</h3>
                            <div className="text-sm text-gray-600">{app.studentCareer}</div>
                            <div className="text-sm text-gray-400 mt-1">{app.studentEmail}</div>
                          </div>
                        </div>

                        <div className="border-l border-gray-100 pl-0 lg:pl-6">
                          <div className="text-sm text-gray-500 mb-1">Aplicando para:</div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {vacancy?.position}
                            <span className="text-gray-400 font-normal text-sm">en {vacancy?.company}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Fecha: {new Date(app.appliedDate).toLocaleDateString()}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          {app.status === 'pending' || app.status === 'reviewing' ? (
                            <>
                              <button
                                onClick={() => onUpdateApplicationStatus(app.id, 'accepted')}
                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <Check className="w-4 h-4" /> Aceptar
                              </button>
                              <button
                                onClick={() => onUpdateApplicationStatus(app.id, 'rejected')}
                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <X className="w-4 h-4" /> Rechazar
                              </button>
                            </>
                          ) : (
                            <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {app.status === 'accepted' ? 'Aceptado' : 'Rechazado'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal Nueva Vacante */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold">Nueva Vacante</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input
                    required
                    className="w-full border rounded-lg p-2"
                    value={newVacancy.company}
                    onChange={e => setNewVacancy({...newVacancy, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Puesto</label>
                  <input
                    required
                    className="w-full border rounded-lg p-2"
                    value={newVacancy.position}
                    onChange={e => setNewVacancy({...newVacancy, position: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={newVacancy.type}
                    onChange={e => setNewVacancy({...newVacancy, type: e.target.value as any})}
                  >
                    <option value="Prácticas Profesionales">Prácticas Profesionales</option>
                    <option value="Servicio Social">Servicio Social</option>
                    <option value="Ambos">Ambos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={newVacancy.modality}
                    onChange={e => setNewVacancy({...newVacancy, modality: e.target.value as any})}
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                  <input
                    required
                    className="w-full border rounded-lg p-2"
                    value={newVacancy.location}
                    onChange={e => setNewVacancy({...newVacancy, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    required
                    className="w-full border rounded-lg p-2"
                    value={newVacancy.area}
                    onChange={e => setNewVacancy({...newVacancy, area: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  required
                  rows={3}
                  className="w-full border rounded-lg p-2"
                  value={newVacancy.description}
                  onChange={e => setNewVacancy({...newVacancy, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos (Enter para agregar)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 border rounded-lg p-2"
                    value={reqInput}
                    onChange={e => setReqInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    placeholder="Ej. Inglés avanzado..."
                  />
                  <button type="button" onClick={addRequirement} className="bg-gray-100 px-3 rounded-lg hover:bg-gray-200">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newVacancy.requirements?.map((req, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Crear Vacante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};