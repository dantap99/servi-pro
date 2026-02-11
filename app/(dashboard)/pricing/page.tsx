import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';

export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Planes simples, sin sorpresas
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Todos los planes incluyen 14 dias de prueba gratis
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <PricingCard
          name="Basico"
          price={79900}
          interval="month"
          trialDays={14}
          technicians="3 tecnicos"
          features={[
            'Ordenes de trabajo ilimitadas',
            'Directorio de clientes',
            'Cotizaciones WhatsApp',
            'Dashboard basico',
            'Soporte por correo',
          ]}
          priceId={basePrice?.id}
        />
        <PricingCard
          name="Pro"
          price={149900}
          interval="month"
          trialDays={14}
          technicians="10 tecnicos"
          popular
          features={[
            'Todo lo del plan Basico',
            'Facturacion CFDI',
            'Reportes avanzados',
            'Notificaciones SMS',
            'Soporte prioritario',
          ]}
          priceId={plusPrice?.id}
        />
        <PricingCard
          name="Business"
          price={199900}
          interval="month"
          trialDays={14}
          technicians="Tecnicos ilimitados"
          features={[
            'Todo lo del plan Pro',
            'API para integraciones',
            'Multiples sucursales',
            'Soporte dedicado 24/7',
            'Capacitacion personalizada',
          ]}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  technicians,
  features,
  priceId,
  popular,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  technicians: string;
  features: string[];
  priceId?: string;
  popular?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-8 ${
      popular
        ? 'border-orange-300 bg-orange-50 ring-2 ring-orange-200 relative'
        : 'border-gray-200 bg-white'
    }`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          Mas popular
        </span>
      )}
      <h2 className="text-xl font-bold text-gray-900">{name}</h2>
      <p className="text-sm text-gray-500 mt-1">{technicians}</p>
      <p className="text-sm text-gray-500 mt-1">
        {trialDays} dias de prueba gratis
      </p>
      <p className="text-4xl font-bold text-gray-900 mt-4 mb-6">
        ${(price / 100).toLocaleString('es-MX')}{' '}
        <span className="text-base font-normal text-gray-500">
          MXN/mes
        </span>
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      {priceId ? (
        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <SubmitButton />
        </form>
      ) : (
        <button className={`w-full rounded-full py-2 text-sm font-medium ${
          popular
            ? 'bg-orange-600 hover:bg-orange-700 text-white'
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}>
          Empezar prueba gratis
        </button>
      )}
    </div>
  );
}
