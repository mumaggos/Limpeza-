import { businessConfig } from "../../config/business";
import { QuoteData } from "../../pages/QuoteForm";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface StepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

export function Step1Services({ data, updateData, onNext }: StepProps) {
  const toggleService = (serviceId: string) => {
    const current = data.services || [];
    if (current.includes(serviceId)) {
      updateData({ services: current.filter((id) => id !== serviceId) });
    } else {
      updateData({ services: [...current, serviceId] });
    }
  };

  const isValid = data.services && data.services.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">O que precisa?</h2>
      <p className="text-neutral-600 mb-8">Selecione um ou vários serviços.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {businessConfig.services.map((service) => {
          const isSelected = data.services.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={cn(
                "flex items-start text-left p-4 rounded-xl border-2 transition-all duration-200",
                isSelected 
                  ? "border-neutral-900 bg-neutral-900/5" 
                  : "border-neutral-100 bg-white hover:border-neutral-200"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 mt-0.5",
                isSelected ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"
              )}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
              <div>
                <h3 className={cn("font-semibold mb-1", isSelected ? "text-neutral-900" : "text-neutral-700")}>
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500">{service.shortDescription}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-neutral-100">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
