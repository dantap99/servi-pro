'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ClipboardList, DollarSign, Users, AlertCircle } from 'lucide-react';

export default function DashboardOverviewPage() {
  const stats = [
    {
      title: 'Trabajos hoy',
      value: '8',
      description: '3 completados, 5 en progreso',
      icon: ClipboardList,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      title: 'Ingresos del mes',
      value: '$47,850',
      description: 'MXN - +12% vs mes anterior',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Tecnicos activos',
      value: '5',
      description: 'De 7 registrados',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Pendientes',
      value: '12',
      description: '4 urgentes, 8 normales',
      icon: AlertCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
  ];

  const recentJobs = [
    { client: 'Carlos Rodriguez', service: 'Reparacion de fuga', technician: 'Juan Perez', status: 'en_progreso', time: 'Hace 30 min' },
    { client: 'Ana Lopez', service: 'Instalacion A/C', technician: 'Miguel Torres', status: 'completado', time: 'Hace 1 hora' },
    { client: 'Pedro Martinez', service: 'Fumigacion residencial', technician: 'Luis Garcia', status: 'en_camino', time: 'Hace 1.5 horas' },
    { client: 'Laura Sanchez', service: 'Revision electrica', technician: 'Roberto Diaz', status: 'pendiente', time: 'Hace 2 horas' },
    { client: 'Fernando Torres', service: 'Limpieza profunda', technician: 'Sofia Hernandez', status: 'asignado', time: 'Hace 3 horas' },
  ];

  const statusLabels: Record<string, string> = {
    pendiente: 'Pendiente',
    asignado: 'Asignado',
    en_camino: 'En camino',
    en_progreso: 'En progreso',
    completado: 'Completado',
    facturado: 'Facturado',
  };

  const statusColors: Record<string, string> = {
    pendiente: 'bg-gray-100 text-gray-700',
    asignado: 'bg-blue-100 text-blue-700',
    en_camino: 'bg-purple-100 text-purple-700',
    en_progreso: 'bg-orange-100 text-orange-700',
    completado: 'bg-green-100 text-green-700',
    facturado: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trabajos recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Trabajos recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Cliente</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Servicio</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Tecnico</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{job.client}</td>
                    <td className="py-3 px-2 text-gray-600">{job.service}</td>
                    <td className="py-3 px-2 text-gray-600">{job.technician}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                        {statusLabels[job.status]}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-500 text-xs">{job.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {recentJobs.map((job, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{job.client}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                    {statusLabels[job.status]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{job.service}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{job.technician}</span>
                  <span>{job.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
