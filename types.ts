export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  university?: string;
  career?: string;
  semester?: number;
};

export type Vacancy = {
  id: string;
  company: string;
  logo: string;
  position: string;
  type: 'Prácticas Profesionales' | 'Servicio Social' | 'Ambos';
  area: string;
  location: string;
  modality: 'Presencial' | 'Remoto' | 'Híbrido';
  duration: string;
  requirements: string[];
  description: string;
  benefits: string[];
  posted: string;
  status: 'active' | 'inactive';
  applicants: number;
};

export type Application = {
  id: string;
  vacancyId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCareer: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedDate: string;
};