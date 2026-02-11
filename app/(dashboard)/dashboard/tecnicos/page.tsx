'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, X, Phone } from 'lucide-react';

type TechStatus = 'disponible' | 'en_trabajo' | 'descanso';

interface Technician {
  id: number;
  name: string;
  phone: string;
  specialty: string;
  status: TechStatus;
  jobsToday: number;
  jobsWeek: number;
}

const statusLabels: Record<TechStatus, string> = {
  disponible: 'Disponible',
  en_trabajo: 'En trabajo',
  descanso: 'Descanso',
};

const statusColors: Record<TechStatus, string> = {
  disponible: 'bg-green-100 text-green-700',
  en_trabajo: 'bg-orange-100 text-orange-700',
  descanso: 'bg-gray-100 text-gray-600',
};

const statusDot: Record<TechStatus, string> = {
  disponible: 'bg-green-500',
  en_trabajo: 'bg-orange-500',
  descanso: 'bg-gray-400',
};

const mockTechnicians: Technician[] = [
  { id: 1, name: 'Juan Perez', phone: '5511112222', specialty: 'Plomeria', status: 'en_trabajo', jobsToday: 3, jobsWeek: 14 },
  { id: 2, name: 'Miguel Torres', phone: '5533334444', specialty: 'Aire acondicionado', status: 'disponible', jobsToday: 2, jobsWeek: 11 },
  { id: 3, name: 'Luis Garcia', phone: '5555556666', specialty: 'Fumigacion', status: 'en_trabajo', jobsToday: 2, jobsWeek: 9 },
  { id: 4, name: 'Roberto Diaz', phone: '5577778888', specialty: 'Electricidad', status: 'disponible', jobsToday: 1, jobsWeek: 8 },
  { id: 5, name: 'Sofia Hernandez', phone: '5599990000', specialty: 'Limpieza', status: 'disponible', jobsToday: 1, jobsWeek: 12 },
  { id: 6, name: 'Carlos Vega', phone: '5512123434', specialty: 'Mantenimiento general', status: 'descanso', jobsToday: 0, jobsWeek: 7 },
  { id: 7, name: 'Alberto Ramirez', phone: '5556567878', specialty: 'Plomeria', status: 'descanso', jobsToday: 0, jobsWeek: 10 },
];

export default function TecnicosPage() {
  const [showForm, setShowForm] = useState(false);

  const disponibles = mockTechnicians.filter(t => t.status === 'disponible').length;
  const enTrabajo = mockTechnicians.filter(t => t.status === 'en_trabajo').length;
  const enDescanso = mockTechnicians.filter(t => t.status === 'descanso').length;

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
          Tecnicos
        </h1>
        <Button
          className="bg-orange-600 hover:bg-orange-700 text-white"
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Nuevo tecnico
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center">
          <p className="text-2xl font-bold text-green-700">{disponibles}</p>
          <p className="text-xs text-green-600">Disponibles</p>
        </div>
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-center">
          <p className="text-2xl font-bold text-orange-700">{enTrabajo}</p>
          <p className="text-xs text-orange-600">En trabajo</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
          <p className="text-2xl font-bold text-gray-600">{enDescanso}</p>
          <p className="text-xs text-gray-500">Descanso</p>
        </div>
      </div>

      {/* New Technician Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Nuevo tecnico</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tech-name" className="mb-2">Nombre completo</Label>
                <Input id="tech-name" placeholder="Nombre del tecnico" />
              </div>
              <div>
                <Label htmlFor="tech-phone" className="mb-2">Telefono</Label>
                <Input id="tech-phone" placeholder="55 1234 5678" />
              </div>
              <div>
                <Label htmlFor="tech-specialty" className="mb-2">Especialidad</Label>
                <select id="tech-specialty" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                  <option value="plomeria">Plomeria</option>
                  <option value="electricidad">Electricidad</option>
                  <option value="aire_acondicionado">Aire acondicionado</option>
                  <option value="fumigacion">Fumigacion</option>
                  <option value="limpieza">Limpieza</option>
                  <option value="mantenimiento">Mantenimiento general</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <Label htmlFor="tech-status" className="mb-2">Status inicial</Label>
                <select id="tech-status" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                  <option value="disponible">Disponible</option>
                  <option value="descanso">Descanso</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Agregar tecnico
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technician Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTechnicians.map((tech) => (
          <Card key={tech.id}>
            <CardContent className="pt-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tech.name}</p>
                    <p className="text-xs text-gray-500">{tech.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${statusDot[tech.status]}`} />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[tech.status]}`}>
                    {statusLabels[tech.status]}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Phone className="h-3 w-3" />
                <span>{tech.phone}</span>
                <a
                  href={`https://wa.me/52${tech.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline ml-auto"
                >
                  WhatsApp
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-gray-50 text-center">
                  <p className="text-lg font-bold text-gray-900">{tech.jobsToday}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Hoy</p>
                </div>
                <div className="p-2 rounded bg-gray-50 text-center">
                  <p className="text-lg font-bold text-gray-900">{tech.jobsWeek}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Semana</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
