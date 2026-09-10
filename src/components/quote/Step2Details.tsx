import { QuoteData } from "../../pages/QuoteForm";
import { cn } from "../../lib/utils";

interface StepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Details({ data, updateData, onNext, onBack }: StepProps) {
  // Determine context based on selected services
  const hasLaundry = data.services.includes("lavandaria-e-engomadoria");
  const isOnlyLaundry = data.services.length === 1 && hasLaundry;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        {isOnlyLaundry ? "Detalhes da lavandaria" : "Detalhes do espaço e serviço"}
      </h2>
      <p className="text-neutral-600 mb-8">
        {isOnlyLaundry ? "Indique-nos a quantidade de roupa e o que precisa." : "Conte-nos mais sobre as características do local."}
      </p>

      <div className="space-y-6 mb-8">
        {/* If it's NOT only laundry, ask for property type */}
        {!isOnlyLaundry && (
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">Tipo de espaço</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Apartamento', 'Moradia', 'Escritório', 'Outro'].map(type => (
                <button
                  key={type}
                  onClick={() => updateData({ propertyType: type })}
                  className={cn(
                    "py-3 px-4 rounded-xl border text-sm font-medium transition-colors",
                    data.propertyType === type
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Laundry specific questions */}
        {hasLaundry && (
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-6">
            <h3 className="font-semibold text-blue-900 mb-4">Detalhes da Roupa (Recolha e Entrega)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Nº estimado de peças (ou sacos)</label>
                <input
                  type="text"
                  value={data.area || ""}
                  onChange={(e) => updateData({ area: e.target.value })}
                  placeholder="Ex: 2 sacos grandes, ou aprox. 40 peças"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Size details for normal spaces */}
        {!isOnlyLaundry && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">Área aproximada (m²)</label>
              <input
                type="text"
              value={data.area || ""}
              onChange={(e) => updateData({ area: e.target.value })}
              placeholder="Ex: 120"
              className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
            />
          </div>
          
          {(hasHomeCleaning || hasPostConstruction) && (
            <>
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Nº de Quartos</label>
                <select
                  value={data.rooms || ""}
                  onChange={(e) => updateData({ rooms: e.target.value })}
                  className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none bg-white transition-all appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="0 (Estúdio)">0 (Estúdio)</option>
                  <option value="1">1 Quarto</option>
                  <option value="2">2 Quartos</option>
                  <option value="3">3 Quartos</option>
                  <option value="4+">4 ou mais</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Nº de Casas de Banho</label>
                <select
                  value={data.bathrooms || ""}
                  onChange={(e) => updateData({ bathrooms: e.target.value })}
                  className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none bg-white transition-all appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="1">1 Casa de banho</option>
                  <option value="2">2 Casas de banho</option>
                  <option value="3">3 Casas de banho</option>
                  <option value="4+">4 ou mais</option>
                </select>
              </div>
            </>
          )}
        </div>
        )}

        {/* Frequency */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Frequência pretendida</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Única', 'Semanal', 'Quinzenal', 'Mensal'].map(freq => (
              <button
                key={freq}
                onClick={() => updateData({ frequency: freq })}
                className={cn(
                  "py-3 px-4 rounded-xl border text-sm font-medium transition-colors",
                  data.frequency === freq
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                )}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area Details */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Detalhes adicionais (opcional)</label>
          <textarea
            value={data.details || ""}
            onChange={(e) => updateData({ details: e.target.value })}
            placeholder="Conte-nos mais sobre o que precisa ou se tem algum pedido especial..."
            rows={4}
            className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all resize-none"
          />
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
          disabled={!data.propertyType}
          className="bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
