import { QuoteData } from "../../pages/QuoteForm";
import { businessConfig } from "../../config/business";
import { cn } from "../../lib/utils";

interface StepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Location({ data, updateData, onNext, onBack }: StepProps) {
  const isValid = data.location && data.postalCode;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Localização</h2>
      <p className="text-neutral-600 mb-8">Onde será realizado o serviço?</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Concelho *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {businessConfig.serviceAreas.map(area => (
              <button
                key={area.name}
                onClick={() => updateData({ location: area.name })}
                className={cn(
                  "py-3 px-4 rounded-xl border text-sm font-medium transition-colors text-center",
                  data.location === area.name
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                )}
              >
                {area.name}
              </button>
            ))}
            {/* Outro */}
            <button
                onClick={() => updateData({ location: 'Outro' })}
                className={cn(
                  "py-3 px-4 rounded-xl border text-sm font-medium transition-colors text-center",
                  data.location === 'Outro'
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                )}
              >
                Outro
              </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">Código Postal *</label>
            <input
              type="text"
              value={data.postalCode || ""}
              onChange={(e) => updateData({ postalCode: e.target.value })}
              placeholder="Ex: 4000-000"
              className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">Morada (opcional)</label>
            <input
              type="text"
              value={data.address || ""}
              onChange={(e) => updateData({ address: e.target.value })}
              placeholder="Rua, número, andar..."
              className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-neutral-100">
        <button
          onClick={onBack}
          className="text-neutral-600 font-semibold px-6 py-3.5 hover:text-neutral-900 transition-colors"
        >
          Voltar
        </button>
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
