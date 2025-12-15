import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { User, Vacancy, Application } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Cargar datos mock
    const mockVacancies: Vacancy[] = [
      {
        id: '1',
        company: 'TechCorp México',
        logo: 'https://picsum.photos/200/200?random=1',
        position: 'Desarrollador Web Junior',
        type: 'Prácticas Profesionales',
        area: 'Tecnología',
        location: 'Ciudad de México',
        modality: 'Híbrido',
        duration: '6 meses',
        requirements: ['Conocimientos en React', 'JavaScript/TypeScript', 'Git', 'Inglés intermedio'],
        description: 'Buscamos estudiantes apasionados por el desarrollo web para unirse a nuestro equipo de innovación.',
        benefits: ['Beca mensual', 'Capacitación continua', 'Ambiente joven', 'Posibilidad de contratación'],
        posted: '2024-12-10',
        status: 'active',
        applicants: 12
      },
      {
        id: '2',
        company: 'Diseño Creativo SA',
        logo: 'https://picsum.photos/200/200?random=2',
        position: 'Diseñador Gráfico',
        type: 'Servicio Social',
        area: 'Diseño',
        location: 'Guadalajara',
        modality: 'Presencial',
        duration: '480 horas',
        requirements: ['Adobe Creative Suite', 'Creatividad', 'Trabajo en equipo'],
        description: 'Agencia de diseño busca talento creativo para proyectos de branding y marketing digital.',
        benefits: ['Carta de liberación', 'Portafolio profesional', 'Networking'],
        posted: '2024-12-08',
        status: 'active',
        applicants: 8
      },
      {
        id: '3',
        company: 'Innovación Financiera',
        logo: 'https://picsum.photos/200/200?random=3',
        position: 'Analista de Datos',
        type: 'Ambos',
        area: 'Finanzas',
        location: 'Monterrey',
        modality: 'Remoto',
        duration: '6-12 meses',
        requirements: ['Excel avanzado', 'Python básico', 'Análisis estadístico', 'Power BI'],
        description: 'Institución financiera líder busca estudiantes para análisis de datos y business intelligence.',
        benefits: ['Beca competitiva', 'Trabajo remoto', 'Certificaciones', 'Mentoría profesional'],
        posted: '2024-12-12',
        status: 'active',
        applicants: 15
      },
      {
        id: '4',
        company: 'Marketing Global',
        logo: 'https://picsum.photos/200/200?random=4',
        position: 'Community Manager',
        type: 'Prácticas Profesionales',
        area: 'Marketing',
        location: 'Remoto',
        modality: 'Remoto',
        duration: '6 meses',
        requirements: ['Redes sociales', 'Copywriting', 'Canva/Photoshop', 'Comunicación'],
        description: 'Agencia de marketing digital busca community manager para gestionar redes sociales de clientes.',
        benefits: ['Horario flexible', 'Trabajo 100% remoto', 'Experiencia en múltiples industrias'],
        posted: '2024-12-05',
        status: 'active',
        applicants: 20
      },
      {
        id: '5',
        company: 'EcoSolutions',
        logo: 'https://picsum.photos/200/200?random=5',
        position: 'Ingeniero Ambiental',
        type: 'Servicio Social',
        area: 'Ingeniería',
        location: 'Puebla',
        modality: 'Presencial',
        duration: '480 horas',
        requirements: ['Conocimientos ambientales', 'Manejo de AutoCAD', 'Trabajo de campo'],
        description: 'ONG dedicada a proyectos de sustentabilidad busca estudiantes comprometidos con el medio ambiente.',
        benefits: ['Impacto social', 'Experiencia en campo', 'Certificaciones ambientales'],
        posted: '2024-12-01',
        status: 'active',
        applicants: 5
      },
      {
        id: '6',
        company: 'HealthTech Innovations',
        logo: 'https://picsum.photos/200/200?random=6',
        position: 'Asistente de Investigación Biomédica',
        type: 'Ambos',
        area: 'Salud',
        location: 'Ciudad de México',
        modality: 'Presencial',
        duration: '6-8 meses',
        requirements: ['Biología molecular', 'Laboratorio', 'Inglés avanzado', 'Investigación'],
        description: 'Centro de investigación biomédica busca estudiantes para proyectos de innovación en salud.',
        benefits: ['Beca de investigación', 'Publicaciones científicas', 'Equipo de vanguardia'],
        posted: '2024-12-14',
        status: 'active',
        applicants: 7
      }
    ];

    setVacancies(mockVacancies);
  }, []);

  const handleLogin = (email: string, password: string, role: 'student' | 'admin') => {
    // Mock login - en producción esto se validaría con un backend
    if (role === 'student') {
      setUser({
        id: '1',
        name: 'María García',
        email: email,
        role: 'student',
        university: 'Universidad Nacional Autónoma de México',
        career: 'Ingeniería en Sistemas',
        semester: 7
      });
    } else {
      setUser({
        id: 'admin1',
        name: 'Admin Universidad',
        email: email,
        role: 'admin',
        university: 'Universidad Nacional Autónoma de México'
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleApply = (vacancyId: string) => {
    if (!user || user.role !== 'student') return;

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      vacancyId,
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      studentCareer: user.career || '',
      status: 'pending',
      appliedDate: new Date().toISOString()
    };

    setApplications([...applications, newApplication]);
    
    // Incrementar el contador de aplicantes
    setVacancies(vacancies.map(v => 
      v.id === vacancyId ? { ...v, applicants: v.applicants + 1 } : v
    ));
  };

  const handleAddVacancy = (vacancy: Omit<Vacancy, 'id' | 'posted' | 'applicants'>) => {
    const newVacancy: Vacancy = {
      ...vacancy,
      id: `vac-${Date.now()}`,
      posted: new Date().toISOString().split('T')[0],
      applicants: 0
    };
    setVacancies([newVacancy, ...vacancies]);
  };

  const handleUpdateVacancy = (id: string, updates: Partial<Vacancy>) => {
    setVacancies(vacancies.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const handleDeleteVacancy = (id: string) => {
    setVacancies(vacancies.filter(v => v.id !== id));
  };

  const handleUpdateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === 'student') {
    return (
      <StudentDashboard
        user={user}
        vacancies={vacancies}
        applications={applications}
        onLogout={handleLogout}
        onApply={handleApply}
      />
    );
  }

  return (
    <AdminDashboard
      user={user}
      vacancies={vacancies}
      applications={applications}
      onLogout={handleLogout}
      onAddVacancy={handleAddVacancy}
      onUpdateVacancy={handleUpdateVacancy}
      onDeleteVacancy={handleDeleteVacancy}
      onUpdateApplicationStatus={handleUpdateApplicationStatus}
    />
  );
}