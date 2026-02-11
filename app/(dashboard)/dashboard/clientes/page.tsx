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
import { PlusCircle, X, Phone, Mail, MapPin, Search } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  jobCount: number;
  lastJob: string;
}

const mockClients: Client[] = [
  { id: 1, name: 'Carlos Rodriguez', phone: '5512345678', email: 'carlos@email.com', address: 'Av. Reforma 234, Col. Centro, CDMX', notes: 'Cliente frecuente, prefiere servicio por la manana', jobCount: 8, lastJob: '2026-02-10' },
  { id: 2, name: 'Ana Lopez', phone: '5587654321', email: 'ana.lopez@gmail.com', address: 'Calle Roble 45, Col. Jardines, GDL', notes: '', jobCount: 3, lastJob: '2026-02-08' },
  { id: 3, name: 'Pedro Martinez', phone: '5524681357', email: 'pedro.mtz@outlook.com', address: 'Blvd. Lopez Mateos 678, Leon', notes: 'Negocio: restaurante El Fogon', jobCount: 12, lastJob: '2026-02-10' },
  { id: 4, name: 'Laura Sanchez', phone: '5513572468', email: 'laura.s@email.com', address: 'Av. Universidad 890, CDMX', notes: '', jobCount: 2, lastJob: '2026-02-05' },
  { id: 5, name: 'Fernando Torres', phone: '5598765432', email: 'ftorres@empresa.mx', address: 'Calle Palmas 12, Col. Lomas, CDMX', notes: 'Edificio corporativo, pedir acceso en recepcion', jobCount: 5, lastJob: '2026-02-09' },
  { id: 6, name: 'Maria Garcia', phone: '5534567890', email: 'mgarcia@hotmail.com', address: 'Calle Hidalgo 56, Queretaro', notes: '', jobCount: 1, lastJob: '2026-01-28' },
  { id: 7, name: 'Roberto Mendez', phone: '5565432109', email: 'rmendez@gmail.com', address: 'Av. Chapultepec 345, GDL', notes: 'Mantenimiento trimestral de A/C', jobCount: 6, lastJob: '2026-02-09' },
  { id: 8, name: 'Patricia Morales', phone: '5511223344', email: 'pmorales@email.com', address: 'Calle 5 de Mayo 78, Puebla', notes: '', jobCount: 4, lastJob: '2026-02-07' },
];

export default function ClientesPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
          Clientes
        </h1>
        <Button
          className="bg-orange-600 hover:bg-orange-700 text-white"
          size="sm"
          onClick={() => { setShowForm(!showForm); setSelectedClient(null); }}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Nuevo cliente
        </Button>
      </div>

      {/* New Client Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Nuevo cliente</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name" className="mb-2">Nombre completo</Label>
                <Input id="client-name" placeholder="Nombre del cliente" />
              </div>
              <div>
                <Label htmlFor="client-phone" className="mb-2">Telefono</Label>
                <Input id="client-phone" placeholder="55 1234 5678" />
              </div>
              <div>
                <Label htmlFor="client-email" className="mb-2">Correo electronico</Label>
                <Input id="client-email" type="email" placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <Label htmlFor="client-address" className="mb-2">Direccion</Label>
                <Input id="client-address" placeholder="Direccion completa" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="client-notes" className="mb-2">Notas</Label>
                <textarea
                  id="client-notes"
                  rows={2}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs resize-none"
                  placeholder="Notas adicionales sobre el cliente"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Guardar cliente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por nombre, telefono o correo..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className={`${selectedClient ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <Card>
            <CardContent className="p-0">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Telefono</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Correo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Trabajos</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Ultimo trabajo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr
                        key={client.id}
                        className={`border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${
                          selectedClient?.id === client.id ? 'bg-orange-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedClient(client)}
                      >
                        <td className="py-3 px-4 font-medium text-gray-900">{client.name}</td>
                        <td className="py-3 px-4 text-gray-600">{client.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{client.email}</td>
                        <td className="py-3 px-4 text-gray-600">{client.jobCount}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{client.lastJob}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden p-4 space-y-3">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedClient?.id === client.id ? 'border-orange-300 bg-orange-50' : 'border-gray-100 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </span>
                      <span>{client.jobCount} trabajos</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Detail */}
        {selectedClient && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{selectedClient.name}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedClient(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">{selectedClient.phone}</p>
                      <a
                        href={`https://wa.me/52${selectedClient.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:underline"
                      >
                        Enviar WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-900">{selectedClient.email}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-900">{selectedClient.address}</p>
                  </div>
                </div>

                {selectedClient.notes && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-1">Notas</p>
                    <p className="text-sm text-gray-700">{selectedClient.notes}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1">Resumen</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-gray-50 text-center">
                      <p className="text-lg font-bold text-gray-900">{selectedClient.jobCount}</p>
                      <p className="text-xs text-gray-500">Trabajos</p>
                    </div>
                    <div className="p-2 rounded bg-gray-50 text-center">
                      <p className="text-sm font-medium text-gray-900">{selectedClient.lastJob}</p>
                      <p className="text-xs text-gray-500">Ultimo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
