import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Users, MessageSquare, FileText, BarChart3, Check, ClipboardList, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: ClipboardList,
      title: 'Despacho de trabajos',
      description: 'Crea ordenes de trabajo, asigna tecnicos y da seguimiento en tiempo real. Todo desde tu celular.',
    },
    {
      icon: Smartphone,
      title: 'App para tecnicos',
      description: 'Tus tecnicos reciben los trabajos asignados, actualizan status y registran lo completado desde campo.',
    },
    {
      icon: MessageSquare,
      title: 'Cotizaciones por WhatsApp',
      description: 'Genera cotizaciones rapidas con IVA y envialas directo al WhatsApp de tu cliente con un solo boton.',
    },
    {
      icon: FileText,
      title: 'Facturacion CFDI',
      description: 'Genera facturas electronicas validas ante el SAT directamente desde la orden de trabajo completada.',
    },
    {
      icon: BarChart3,
      title: 'Dashboard de metricas',
      description: 'Visualiza trabajos del dia, ingresos, tecnicos activos y pendientes en un solo panel.',
    },
    {
      icon: Users,
      title: 'Directorio de clientes',
      description: 'Mantén el historial completo de cada cliente: trabajos, direcciones, notas y contacto.',
    },
  ];

  const useCases = [
    { name: 'Plomeria', icon: Wrench },
    { name: 'Electricidad', icon: Wrench },
    { name: 'Fumigacion', icon: Wrench },
    { name: 'Limpieza', icon: Wrench },
    { name: 'Aire acondicionado', icon: Wrench },
    { name: 'Mantenimiento', icon: Wrench },
  ];

  const plans = [
    {
      name: 'Basico',
      price: '799',
      technicians: '3 tecnicos',
      features: [
        'Ordenes de trabajo ilimitadas',
        'Directorio de clientes',
        'Cotizaciones WhatsApp',
        'Dashboard basico',
        'Soporte por correo',
      ],
    },
    {
      name: 'Pro',
      price: '1,499',
      technicians: '10 tecnicos',
      popular: true,
      features: [
        'Todo lo del plan Basico',
        'Facturacion CFDI',
        'Reportes avanzados',
        'Notificaciones SMS',
        'Soporte prioritario',
      ],
    },
    {
      name: 'Business',
      price: '1,999',
      technicians: 'Tecnicos ilimitados',
      features: [
        'Todo lo del plan Pro',
        'API para integraciones',
        'Multiples sucursales',
        'Soporte dedicado 24/7',
        'Capacitacion personalizada',
      ],
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              Gestiona tu empresa de servicios
              <span className="block text-orange-600">desde tu celular</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto">
              Despacha tecnicos, cobra y factura. ServiPro es el software que las
              empresas de servicios a domicilio en Mexico necesitan para crecer.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-lg rounded-full px-8"
                >
                  Empieza gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg rounded-full px-8 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Ver planes
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Sin tarjeta de credito -- Prueba 14 dias gratis
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Para todo tipo de servicios a domicilio
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {useCases.map((uc) => (
              <div
                key={uc.name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 border border-orange-100"
              >
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <uc.icon className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">{uc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Todo lo que necesitas para operar
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Desde la primera llamada del cliente hasta la factura cobrada. ServiPro cubre todo el flujo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/50 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Asi de facil funciona
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Registra tu empresa',
                desc: 'Crea tu cuenta, agrega tus tecnicos y configura tus servicios en minutos.',
              },
              {
                step: '2',
                title: 'Crea ordenes de trabajo',
                desc: 'Cuando un cliente llama, crea la orden, asigna al tecnico y programa la visita.',
              },
              {
                step: '3',
                title: 'Cobra y factura',
                desc: 'El tecnico completa el trabajo, tu generas la cotizacion y la envias por WhatsApp.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-orange-600 text-white text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Planes simples, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Todos los planes incluyen 14 dias de prueba gratis. Sin tarjeta de credito.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.popular
                    ? 'border-orange-300 bg-orange-50 ring-2 ring-orange-200 relative'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Mas popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.technicians}</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-1">MXN/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button
                    className={`w-full rounded-full ${
                      plan.popular
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Empezar prueba gratis
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Deja de perder trabajos por desorganizacion
          </h2>
          <p className="mt-4 text-lg text-orange-100 max-w-2xl mx-auto">
            Unete a las empresas de servicios que ya usan ServiPro para despachar,
            cobrar y crecer.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 text-lg rounded-full px-8"
              >
                Empieza gratis ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Servi<span className="text-orange-600">Pro</span>
              </span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Producto
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Precios
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Contacto
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              2026 ServiPro. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
