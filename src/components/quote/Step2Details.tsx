import { QuoteData } from "../../pages/QuoteForm";
import { cn } from "../../lib/utils";

interface StepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Details({ data, updateData, onNext, onBack }: StepProps) {
  const isCondominio = data.services.includes("limpeza-condominios");
  const isEscritorio = data.services.includes("limpeza-escritorios");
  const isObrasOuMudancas = data.services.includes("limpeza-pos-obras") || data.services.includes("limpeza-mudancas");
  
  const hasLaundry = data.services.includes("lavandaria-e-engomadoria");
  const hasSofas = data.services.includes("limpeza-sofas-tapetes");
  const hasVidros = data.services.includes("limpeza-vidros");

  // Determine main property context
  const mainContext = isCondominio ? "condominio" 
    : isEscritorio ? "escritorio" 
    : isObrasOuMudancas ? "obras" 
    : "domestica";
    
  const isOnlySpecialties = data.services.length > 0 && !data.services.some(s => 
    ["limpeza-condominios", "limpeza-escritorios", "limpeza-pos-obras", "limpeza-mudancas", "limpeza-domestica-regular", "limpeza-profunda", "limpeza-alojamento-local"].includes(s)
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Detalhes do serviço
      </h2>
      <p className="text-neutral-600 mb-8">
        Ajude-nos a entender melhor as características do espaço ou serviço pretendido.
      </p>

      <div className="space-y-8 mb-8">
        
        {/* BASE PROPERTY TYPE & SIZE (If not Condominio and not ONLY specialties) */}
        {!isCondominio && !isOnlySpecialties && (
          <div className="space-y-6">
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

              {(mainContext === "domestica" || mainContext === "obras") && (
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
              
              {mainContext === "escritorio" && (
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
              )}
            </div>
          </div>
        )}

        {/* CONDOMINIOS LOGIC */}
        {isCondominio && (
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-6">
            <h3 className="font-semibold text-neutral-900">Detalhes do Condomínio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Nº de Frações (Apartamentos)</label>
                <input
                  type="text"
                  value={data.fractions || ""}
                  onChange={(e) => updateData({ fractions: e.target.value })}
                  placeholder="Ex: 12"
                  className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Nº de Andares</label>
                <input
                  type="text"
                  value={data.floors || ""}
                  onChange={(e) => updateData({ floors: e.target.value })}
                  placeholder="Ex: 4"
                  className="w-full p-4 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-neutral-900 mb-2">Características do Prédio</label>
              <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input 
                  type="checkbox" 
                  checked={data.elevator || false}
                  onChange={(e) => updateData({ elevator: e.target.checked })}
                  className="w-5 h-5 accent-neutral-900"
                />
                <span className="text-neutral-700">Tem Elevador(es)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input 
                  type="checkbox" 
                  checked={data.garage || false}
                  onChange={(e) => updateData({ garage: e.target.checked })}
                  className="w-5 h-5 accent-neutral-900"
                />
                <span className="text-neutral-700">Tem Garagem comum</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input 
                  type="checkbox" 
                  checked={data.exteriorArea || false}
                  onChange={(e) => updateData({ exteriorArea: e.target.checked })}
                  className="w-5 h-5 accent-neutral-900"
                />
                <span className="text-neutral-700">Tem Áreas exteriores comuns (Pátio, Jardim)</span>
              </label>
            </div>
          </div>
        )}

        {/* OBRAS/MUDANCAS LOGIC */}
        {isObrasOuMudancas && (
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-6">
            <h3 className="font-semibold text-amber-900">Estado do Espaço</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-amber-200 bg-white rounded-xl cursor-pointer hover:bg-amber-100/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={data.hasFurniture || false}
                  onChange={(e) => updateData({ hasFurniture: e.target.checked })}
                  className="w-5 h-5 accent-amber-600"
                />
                <span className="text-amber-900">O espaço tem mobília?</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-amber-200 bg-white rounded-xl cursor-pointer hover:bg-amber-100/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={data.hasDebris || false}
                  onChange={(e) => updateData({ hasDebris: e.target.checked })}
                  className="w-5 h-5 accent-amber-600"
                />
                <span className="text-amber-900">Existe entulho grosso para remover? (Obras)</span>
              </label>
            </div>
          </div>
        )}

        {/* LAUNDRY LOGIC */}
        {hasLaundry && (
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl space-y-6">
            <h3 className="font-semibold text-blue-900">Serviço de Lavandaria</h3>
            
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Que tipo de peças pretende tratar?</label>
              <input
                type="text"
                value={data.itemType || ""}
                onChange={(e) => updateData({ itemType: e.target.value })}
                placeholder="Ex: Camisas, Lençóis, Toalhas, Roupa do dia a dia..."
                className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Quantidade aproximada</label>
              <input
                type="text"
                value={data.quantity || ""}
                onChange={(e) => updateData({ quantity: e.target.value })}
                placeholder="Ex: Cerca de 40 peças, 2 sacos, etc."
                className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Preferência de Entrega (Opcional)</label>
              <input
                type="text"
                value={data.deliveryPreference || ""}
                onChange={(e) => updateData({ deliveryPreference: e.target.value })}
                placeholder="Ex: Dobrado, Engomado em cabides..."
                className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* SOFAS/RUGS LOGIC */}
        {hasSofas && (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-6">
            <h3 className="font-semibold text-emerald-900">Limpeza de Sofás, Colchões e Vidros</h3>
            
            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Descreva os itens (quantidade e tamanho)</label>
              <textarea
                value={data.itemType || ""}
                onChange={(e) => updateData({ itemType: e.target.value })}
                placeholder="Ex: 1 sofá com chaise longue, 1 colchão de casal, 4 janelas grandes."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Existe alguma mancha específica ou sujidade profunda? (Opcional)</label>
              <input
                type="text"
                value={data.itemCondition || ""}
                onChange={(e) => updateData({ itemCondition: e.target.value })}
                placeholder="Ex: Nódoas de café, pelos de animais, humidade..."
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
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
          disabled={(!isCondominio && !isOnlySpecialties && !data.propertyType)}
          className="bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
