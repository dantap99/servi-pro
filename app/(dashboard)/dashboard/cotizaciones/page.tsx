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
import { PlusCircle, Trash2, MessageSquare, FileText } from 'lucide-react';

interface LineItem {
  id: number;
  description: string;
  quantity: string;
  unitPrice: string;
}

export default function CotizacionesPage() {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [quoteDescription, setQuoteDescription] = useState('');
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: '', quantity: '1', unitPrice: '' },
  ]);

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), description: '', quantity: '1', unitPrice: '' }]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof LineItem, value: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + (qty * price);
  }, 0);

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const formatMXN = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const generateWhatsAppMessage = () => {
    let msg = `*Cotizacion ServiPro*\n`;
    msg += `Cliente: ${clientName}\n`;
    if (quoteDescription) msg += `Descripcion: ${quoteDescription}\n`;
    msg += `\n*Conceptos:*\n`;
    items.forEach((item, idx) => {
      if (item.description && item.unitPrice) {
        const qty = parseFloat(item.quantity) || 1;
        const price = parseFloat(item.unitPrice) || 0;
        msg += `${idx + 1}. ${item.description} - ${qty} x ${formatMXN(price)} = ${formatMXN(qty * price)}\n`;
      }
    });
    msg += `\n*Subtotal:* ${formatMXN(subtotal)}`;
    msg += `\n*IVA (16%):* ${formatMXN(iva)}`;
    msg += `\n*Total:* ${formatMXN(total)}`;
    msg += `\n\n_Cotizacion generada con ServiPro_`;
    return msg;
  };

  const sendWhatsApp = () => {
    const phone = clientPhone.replace(/\D/g, '');
    const message = encodeURIComponent(generateWhatsAppMessage());
    const url = `https://wa.me/52${phone}?text=${message}`;
    window.open(url, '_blank');
  };

  const recentQuotes = [
    { id: 1, client: 'Carlos Rodriguez', description: 'Reparacion de fuga + material', total: '$2,900.00', date: '2026-02-10', sent: true },
    { id: 2, client: 'Ana Lopez', description: 'Instalacion minisplit 2 TR', total: '$10,324.00', date: '2026-02-08', sent: true },
    { id: 3, client: 'Pedro Martinez', description: 'Fumigacion restaurante 200m2', total: '$4,060.00', date: '2026-02-07', sent: false },
    { id: 4, client: 'Laura Sanchez', description: 'Revision electrica + reparacion', total: '$3,712.00', date: '2026-02-05', sent: true },
  ];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Cotizaciones
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quote Builder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Nueva cotizacion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q-client" className="mb-2">Nombre del cliente</Label>
                  <Input
                    id="q-client"
                    placeholder="Nombre completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="q-phone" className="mb-2">Telefono (WhatsApp)</Label>
                  <Input
                    id="q-phone"
                    placeholder="55 1234 5678"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="q-desc" className="mb-2">Descripcion general</Label>
                <Input
                  id="q-desc"
                  placeholder="Ej: Reparacion de fuga en cocina"
                  value={quoteDescription}
                  onChange={(e) => setQuoteDescription(e.target.value)}
                />
              </div>

              {/* Line Items */}
              <div>
                <Label className="mb-2">Conceptos</Label>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[1fr_80px_100px_40px] gap-2 items-end">
                      <div>
                        <Input
                          placeholder="Descripcion del concepto"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Cant."
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Precio"
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Agregar concepto
                </Button>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900 font-medium">{formatMXN(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">IVA (16%)</span>
                  <span className="text-gray-900 font-medium">{formatMXN(iva)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-orange-600">{formatMXN(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  onClick={sendWhatsApp}
                  disabled={!clientName || !clientPhone || items.every(i => !i.description)}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar por WhatsApp
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Guardar cotizacion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quotes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cotizaciones recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentQuotes.map((quote) => (
                <div key={quote.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{quote.client}</p>
                    <span className="text-sm font-bold text-gray-900">{quote.total}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{quote.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{quote.date}</span>
                    <span className={`text-xs font-medium ${quote.sent ? 'text-green-600' : 'text-gray-400'}`}>
                      {quote.sent ? 'Enviada' : 'Borrador'}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
