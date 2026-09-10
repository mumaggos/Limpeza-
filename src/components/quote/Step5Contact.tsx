import { QuoteData } from "../../pages/QuoteForm";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

interface StepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Contact({ data, updateData, onNext, onBack }: StepProps) {
  const isValid = 
    data.name.trim() !== "" && 
    data.phone.trim() !== "" && 
    data.email.trim() !== "" &&
    data.acceptPrivacy;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Os seus contactos</h2>
      <p className="text-neutral-600 mb-8">Para onde devemos enviar o orçamento?</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Nome completo *</label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="O seu nome"
            className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">Telemóvel *</label>
            <input
              type="tel"
              value={data.phone || ""}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="Ex: 900 000 000"
              className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">Email *</label>
            <input
              type="email"
              value={data.email || ""}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="Ex: email@exemplo.com"
              className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Preferência de contacto</label>
          <div className="grid grid-cols-3 gap-3">
            {['Telefone', 'WhatsApp', 'Email'].map(pref => (
              <button
                key={pref}
                onClick={() => updateData({ contactPreference: pref })}
                className={cn(
                  "py-3 px-4 rounded-xl border text-sm font-medium transition-colors text-center",
                  data.contactPreference === pref
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                )}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-100 flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy"
            checked={data.acceptPrivacy}
            onChange={(e) => updateData({ acceptPrivacy: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <label htmlFor="privacy" className="text-sm text-neutral-600 leading-relaxed">
            Li e aceito a <Link to="/politica-de-privacidade" className="underline hover:text-neutral-900">Política de Privacidade</Link> da Pronta e Limpa e concordo em ser contactado para receber este orçamento.*
          </label>
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
          Resumo Final
        </button>
      </div>
    </div>
  );
}
