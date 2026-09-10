import { QuoteData } from "../../pages/QuoteForm";
import { cn } from "../../lib/utils";
import { Info } from "lucide-react";

interface StepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Date({ data, updateData, onNext, onBack }: StepProps) {
  const isValid = data.preferredDate && data.preferredTime;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Data e Horário</h2>
      <p className="text-neutral-600 mb-8">Quando gostaria que o serviço fosse realizado?</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Data pretendida *</label>
          <input
            type="date"
            value={data.preferredDate || ""}
            onChange={(e) => updateData({ preferredDate: e.target.value })}
            className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Horário preferencial *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Manhã', 'Tarde', 'Final do dia', 'Flexível'].map(time => (
              <button
                key={time}
                onClick={() => updateData({ preferredTime: time })}
                className={cn(
                  "py-3 px-4 rounded-xl border text-sm font-medium transition-colors text-center",
                  data.preferredTime === time
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 mt-4">
          <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">A data e horário pretendidos serão confirmados pela nossa equipa no momento da aprovação do orçamento.</p>
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
