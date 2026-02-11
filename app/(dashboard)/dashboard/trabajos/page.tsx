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
import { PlusCircle, X, Filter } from 'lucide-react';

type JobStatus = 'pendiente' | 'asignado' | 'en_camino' | 'en_progreso' | 'completado' | 'facturado';
type Priority = 'baja' | 'media' | 'alta' | 'urgente';

interface Job {
  id: number;
  client: string;
  title: string;
  address: string;
  technician: string;
  status: JobStatus;
  priority: Priority;
  scheduledDate: string;
  amount: string;
}

const statusLabels: Record<JobStatus, string> = {
  pendiente: 'Pendiente',
  asignado: 'Asignado',
  en_camino: 'En camino',
  en_progreso: 'En progreso',
  completado: 'Completado',
  facturado: 'Facturado',
};

const statusColors: Record<JobStatus, string> = {
  pendiente: 'bg-gray-100 text-gray-700 border-gray-200',
  asignado: 'bg-blue-100 text-blue-700 border-blue-200',
  en_camino: 'bg-purple-100 text-purple-700 border-purple-200',
  en_progreso: 'bg-orange-100 text-orange-700 border-orange-200',
  completado: 'bg-green-100 text-green-700 border-green-200',
  facturado: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const priorityLabels: Record<Priority, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  urgente: 'Urgente',
};

const priorityColors: Record<Priority, string> = {
  baja: 'text-gray-500',
  media: 'text-blue-600',
  alta: 'text-orange-600',
  urgente: 'text-red-600',
};

const mockJobs: Job[] = [
  { id: 1, client: 'Carlos Rodriguez', title: 'Reparacion de fuga en cocina', address: 'Av. Reforma 234, Col. Centro, CDMX', technician: 'Juan Perez', status: 'en_progreso', priority: 'alta', scheduledDate: '2026-02-10 09:00', amount: '$2,500' },
  { id: 2, client: 'Ana Lopez', title: 'Instalacion de minisplit 2 TR', address: 'Calle Roble 45, Col. Jardines, GDL', technician: 'Miguel Torres', status: 'completado', priority: 'media', scheduledDate: '2026-02-10 10:30', amount: '$8,900' },
  { id: 3, client: 'Pedro Martinez', title: 'Fumigacion contra cucarachas', address: 'Blvd. Lopez Mateos 678, Leon', technician: 'Luis Garcia', status: 'en_camino', priority: 'media', scheduledDate: '2026-02-10 12:00', amount: '$1,800' },
  { id: 4, client: 'Laura Sanchez', title: 'Revision de corto circuito', address: 'Av. Universidad 890, CDMX', technician: 'Roberto Diaz', status: 'pendiente', priority: 'urgente', scheduledDate: '2026-02-10 14:00', amount: '$3,200' },
  { id: 5, client: 'Fernando Torres', title: 'Limpieza profunda departamento', address: 'Calle Palmas 12, Col. Lomas, CDMX', technician: 'Sofia Hernandez', status: 'asignado', priority: 'baja', scheduledDate: '2026-02-11 08:00', amount: '$4,500' },
  { id: 6, client: 'Maria Garcia', title: 'Destape de drenaje principal', address: 'Calle Hidalgo 56, Queretaro', technician: 'Juan Perez', status: 'pendiente', priority: 'alta', scheduledDate: '2026-02-11 10:00', amount: '$1,200' },
  { id: 7, client: 'Roberto Mendez', title: 'Mantenimiento preventivo A/C', address: 'Av. Chapultepec 345, GDL', technician: 'Miguel Torres', status: 'facturado', priority: 'baja', scheduledDate: '2026-02-09 09:00', amount: '$3,600' },
  { id: 8, client: 'Patricia Morales', title: 'Instalacion de contactos', address: 'Calle 5 de Mayo 78, Puebla', technician: 'Roberto Diaz', status: 'completado', priority: 'media', scheduledDate: '2026-02-09 15:00', amount: '$2,100' },
];

export default function TrabajosPage() {
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'lista' | 'kanban'>('lista');

  const filteredJobs = filterStatus === 'todos'
    ? mockJobs
    : mockJobs.filter(j => j.status === filterStatus);

  const kanbanStatuses: JobStatus[] = ['pendiente', 'asignado', 'en_camino', 'en_progreso', 'completado', 'facturado'];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
          Trabajos
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'lista' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('lista')}
            className={viewMode === 'lista' ? 'bg-orange-600 hover:bg-orange-700 text-white' : ''}
          >
            Lista
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('kanban')}
            className={viewMode === 'kanban' ? 'bg-orange-600 hover:bg-orange-700 text-white' : ''}
          >
            Kanban
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Nuevo trabajo
          </Button>
        </div>
      </div>

      {/* New Job Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Nuevo trabajo</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job-client" className="mb-2">Cliente</Label>
                <select id="job-client" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                  <option value="">Seleccionar cliente</option>
                  <option value="1">Carlos Rodriguez</option>
                  <option value="2">Ana Lopez</option>
                  <option value="3">Pedro Martinez</option>
                </select>
              </div>
              <div>
                <Label htmlFor="job-title" className="mb-2">Titulo del trabajo</Label>
                <Input id="job-title" placeholder="Ej: Reparacion de fuga en cocina" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="job-address" className="mb-2">Direccion</Label>
                <Input id="job-address" placeholder="Direccion completa del servicio" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="job-desc" className="mb-2">Descripcion</Label>
                <textarea
                  id="job-desc"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs resize-none"
                  placeholder="Descripcion detallada del trabajo"
                />
              </div>
              <div>
                <Label htmlFor="job-priority" className="mb-2">Prioridad</Label>
                <select id="job-priority" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                  <option value="baja">Baja</option>
                  <option value="media" selected>Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div>
                <Label htmlFor="job-tech" className="mb-2">Tecnico asignado</Label>
                <select id="job-tech" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                  <option value="">Sin asignar</option>
                  <option value="1">Juan Perez</option>
                  <option value="2">Miguel Torres</option>
                  <option value="3">Luis Garcia</option>
                </select>
              </div>
              <div>
                <Label htmlFor="job-date" className="mb-2">Fecha programada</Label>
                <Input id="job-date" type="date" />
              </div>
              <div>
                <Label htmlFor="job-time" className="mb-2">Hora</Label>
                <Input id="job-time" type="time" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Crear trabajo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters (list view only) */}
      {viewMode === 'lista' && (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
          {['todos', ...kanbanStatuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterStatus === s
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s === 'todos' ? 'Todos' : statusLabels[s as JobStatus]}
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'lista' && (
        <Card>
          <CardContent className="p-0">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Trabajo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Tecnico</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Prioridad</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer">
                      <td className="py-3 px-4 font-medium text-gray-900">{job.client}</td>
                      <td className="py-3 px-4 text-gray-600">{job.title}</td>
                      <td className="py-3 px-4 text-gray-600">{job.technician}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium ${priorityColors[job.priority]}`}>
                          {priorityLabels[job.priority]}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                          {statusLabels[job.status]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{job.scheduledDate}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">{job.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden p-4 space-y-3">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-4 rounded-lg border border-gray-100 bg-white space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{job.client}</p>
                      <p className="text-sm text-gray-600">{job.title}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                      {statusLabels[job.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{job.technician}</span>
                    <span className={`font-medium ${priorityColors[job.priority]}`}>
                      {priorityLabels[job.priority]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{job.scheduledDate}</span>
                    <span className="font-medium text-gray-900">{job.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[900px]">
            {kanbanStatuses.map((status) => {
              const jobs = mockJobs.filter(j => j.status === status);
              return (
                <div key={status} className="flex-1 min-w-[220px]">
                  <div className={`flex items-center gap-2 mb-3 px-2`}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                    <span className="text-xs text-gray-400">{jobs.length}</span>
                  </div>
                  <div className="space-y-2">
                    {jobs.map((job) => (
                      <div key={job.id} className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <p className="text-sm font-medium text-gray-900 mb-1">{job.title}</p>
                        <p className="text-xs text-gray-500 mb-2">{job.client}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{job.technician}</span>
                          <span className={`text-xs font-medium ${priorityColors[job.priority]}`}>
                            {priorityLabels[job.priority]}
                          </span>
                        </div>
                      </div>
                    ))}
                    {jobs.length === 0 && (
                      <div className="p-4 rounded-lg border border-dashed border-gray-200 text-center">
                        <p className="text-xs text-gray-400">Sin trabajos</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
