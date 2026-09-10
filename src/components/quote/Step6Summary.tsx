import { QuoteData } from "../../pages/QuoteForm";
import { businessConfig } from "../../config/business";
import { CheckCircle2, Edit2, Loader2 } from "lucide-react";

interface StepProps {
  data: QuoteData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  onEditStep: (step: number) => void;
}

export function Step6Summary({ data, onSubmit, onBack, isSubmitting, onEditStep }: StepProps) {
  
  const getServiceNames = () => {
    return data.services.map(id => {
      const service = businessConfig.services.find(s => s.id === id);
      return service ? service.title : id;
    }).join(", ");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
        <h2 className="text-2xl font-bold text-neutral-900">Resumo do Pedido</h2>
      </div>
      <p className="text-neutral-600 mb-8">Por favor, verifique se os dados estão corretos antes de enviar.</p>

      <div className="bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden mb-8">
        {/* Serviços */}
        <div className="p-5 border-b border-neutral-200/60 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">Serviços</span>
            <p className="font-medium text-neutral-900">{getServiceNames()}</p>
          </div>
          <button onClick={() => onEditStep(1)} className="text-neutral-400 hover:text-neutral-900 p-1">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Detalhes */}
        <div className="p-5 border-b border-neutral-200/60 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">Detalhes do Espaço</span>
            <p className="font-medium text-neutral-900">
              {data.propertyType}
              {data.area && ` • ${data.area}m²`}
              {data.rooms && ` • ${data.rooms}`}
              {data.bathrooms && ` • ${data.bathrooms}`}
              {data.frequency && ` • Frequência: ${data.frequency}`}
            </p>
          </div>
          <button onClick={() => onEditStep(2)} className="text-neutral-400 hover:text-neutral-900 p-1">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Localização */}
        <div className="p-5 border-b border-neutral-200/60 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">Localização</span>
            <p className="font-medium text-neutral-900">
              {data.location}, {data.postalCode}
              {data.address && <span className="block text-sm text-neutral-600 mt-0.5">{data.address}</span>}
            </p>
          </div>
          <button onClick={() => onEditStep(3)} className="text-neutral-400 hover:text-neutral-900 p-1">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Data/Hora */}
        <div className="p-5 border-b border-neutral-200/60 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">Data Pretendida</span>
            <p className="font-medium text-neutral-900">
              {data.preferredDate} ({data.preferredTime})
            </p>
          </div>
          <button onClick={() => onEditStep(4)} className="text-neutral-400 hover:text-neutral-900 p-1">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Contactos */}
        <div className="p-5 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">Contactos</span>
            <p className="font-medium text-neutral-900">
              {data.name}
              <span className="block text-sm text-neutral-600 mt-0.5">{data.phone} • {data.email}</span>
              <span className="block text-sm text-neutral-500 mt-0.5">Prefere ser contactado por: {data.contactPreference}</span>
            </p>
          </div>
          <button onClick={() => onEditStep(5)} className="text-neutral-400 hover:text-neutral-900 p-1">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-neutral-100">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="text-neutral-600 font-semibold px-6 py-3.5 hover:text-neutral-900 transition-colors disabled:opacity-50"
        >
          Voltar
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 disabled:opacity-80 transition-colors flex items-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              A enviar...
            </>
          ) : (
            "Enviar pedido de orçamento"
          )}
        </button>
      </div>
    </div>
  );
}
