import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X, Trash2, CheckCircle, Clock, Eye } from "lucide-react";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
  raw_data: any;
};

export function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState<'Novo' | 'Resolvido'>('Novo');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const checkAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      setError("Credenciais inválidas. Verifique o seu e-mail e password.");
    } else {
      setIsAuthenticated(true);
      fetchLeads();
    }
    setLoading(false);
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setLoading(false);
      }
    });
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } else {
      alert("Erro ao atualizar o estado.");
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm("Tem a certeza que deseja apagar este pedido? Esta ação não pode ser desfeita.")) return;
    
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);
      
    if (!error) {
      setLeads(leads.filter(lead => lead.id !== id));
      setSelectedLead(null);
    } else {
      alert("Erro ao apagar o pedido.");
    }
  };

  if (loading && !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-500">A carregar...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 max-w-md w-full">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Painel de Gestão</h1>
          <p className="text-sm text-neutral-600 mb-6">
            Aceda com as credenciais criadas no Supabase.
          </p>
          <form onSubmit={checkAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all"
                placeholder="O seu e-mail"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all"
                placeholder="A sua password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => lead.status === activeTab);

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Gestão de Pedidos</h1>
            <p className="text-neutral-600 mt-1">Veja todos os orçamentos submetidos no site.</p>
          </div>
          <button 
            onClick={() => { supabase.auth.signOut(); setIsAuthenticated(false); }}
            className="text-sm font-medium px-4 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
          >
            Terminar Sessão
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-1 rounded-xl border border-neutral-200 inline-flex">
          <button
            onClick={() => setActiveTab('Novo')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'Novo' 
                ? 'bg-neutral-900 text-white' 
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Novos ({leads.filter(l => l.status === 'Novo').length})
          </button>
          <button
            onClick={() => setActiveTab('Resolvido')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'Resolvido' 
                ? 'bg-neutral-900 text-white' 
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Resolvidos ({leads.filter(l => l.status === 'Resolvido').length})
          </button>
        </div>

        {loading ? (
          <p className="text-neutral-500 text-center py-12">A carregar pedidos...</p>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-neutral-100 shadow-sm">
            <p className="text-neutral-500">Não existem pedidos na aba "{activeTab}".</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-sm font-medium text-neutral-600">
                    <th className="p-4">Data</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Serviço</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors group">
                      <td className="p-4 text-sm text-neutral-600 whitespace-nowrap">
                        {format(new Date(lead.created_at), "dd MMM yyyy", { locale: ptBR })}<br/>
                        <span className="text-xs text-neutral-400">{format(new Date(lead.created_at), "HH:mm")}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-neutral-900">{lead.name}</div>
                        <div className="text-xs text-neutral-500">{lead.phone} • {lead.email}</div>
                      </td>
                      <td className="p-4 text-sm font-medium text-neutral-900">
                        {lead.service}
                        {lead.raw_data?.location && <div className="text-xs text-neutral-500 font-normal">{lead.raw_data.location}</div>}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver Detalhes"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          
                          {lead.status === 'Novo' ? (
                            <button 
                              onClick={() => updateStatus(lead.id, 'Resolvido')}
                              className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Marcar como Resolvido"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => updateStatus(lead.id, 'Novo')}
                              className="p-2 text-neutral-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Marcar como Novo"
                            >
                              <Clock className="w-5 h-5" />
                            </button>
                          )}
                          
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Apagar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Detalhes do Pedido</h3>
                  <p className="text-xs text-neutral-500">
                    Enviado a {format(new Date(selectedLead.created_at), "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-neutral-400 hover:bg-neutral-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Client Info */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Cliente</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-neutral-500">Nome:</span>
                        <span className="font-medium text-neutral-900">{selectedLead.name}</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500">Telefone:</span>
                        <span className="font-medium text-neutral-900">{selectedLead.phone}</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500">E-mail:</span>
                        <span className="font-medium text-neutral-900">{selectedLead.email}</span>
                      </div>
                      {selectedLead.raw_data?.contactPreference && (
                        <div>
                          <span className="block text-neutral-500">Prefere contacto via:</span>
                          <span className="font-medium text-neutral-900">{selectedLead.raw_data.contactPreference}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Service Info */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Serviço Solicitado</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-neutral-500">Serviço Base:</span>
                        <span className="font-medium text-neutral-900">{selectedLead.service}</span>
                      </div>
                      
                      {selectedLead.raw_data?.propertyType && (
                        <div>
                          <span className="block text-neutral-500">Tipo de Imóvel:</span>
                          <span className="font-medium text-neutral-900">{selectedLead.raw_data.propertyType}</span>
                        </div>
                      )}

                      {(selectedLead.raw_data?.preferredDate || selectedLead.raw_data?.preferredTime) && (
                        <div>
                          <span className="block text-neutral-500">Data Desejada:</span>
                          <span className="font-medium text-neutral-900">
                            {selectedLead.raw_data?.preferredDate} {selectedLead.raw_data?.preferredTime ? `(${selectedLead.raw_data?.preferredTime})` : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-neutral-100" />

                {/* Additional Details based on raw_data */}
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Características & Detalhes</h4>
                <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-700 space-y-2">
                  {selectedLead.raw_data?.location && <p><strong>Localidade:</strong> {selectedLead.raw_data.location}</p>}
                  {selectedLead.raw_data?.postalCode && <p><strong>Código Postal:</strong> {selectedLead.raw_data.postalCode}</p>}
                  {selectedLead.raw_data?.address && <p><strong>Morada:</strong> {selectedLead.raw_data.address}</p>}
                  {selectedLead.raw_data?.area && <p><strong>Área:</strong> {selectedLead.raw_data.area} m²</p>}
                  {selectedLead.raw_data?.rooms && <p><strong>Quartos:</strong> {selectedLead.raw_data.rooms}</p>}
                  {selectedLead.raw_data?.bathrooms && <p><strong>Casas de Banho:</strong> {selectedLead.raw_data.bathrooms}</p>}
                  {selectedLead.raw_data?.frequency && <p><strong>Frequência:</strong> {selectedLead.raw_data.frequency}</p>}
                  {selectedLead.raw_data?.pets !== undefined && <p><strong>Animais de Estimação:</strong> {selectedLead.raw_data.pets ? "Sim" : "Não"}</p>}
                  
                  {/* Novos Campos Específicos */}
                  {selectedLead.raw_data?.fractions && <p><strong>Frações:</strong> {selectedLead.raw_data.fractions}</p>}
                  {selectedLead.raw_data?.floors && <p><strong>Andares:</strong> {selectedLead.raw_data.floors}</p>}
                  {selectedLead.raw_data?.elevator !== undefined && <p><strong>Elevador:</strong> {selectedLead.raw_data.elevator ? "Sim" : "Não"}</p>}
                  {selectedLead.raw_data?.garage !== undefined && <p><strong>Garagem comum:</strong> {selectedLead.raw_data.garage ? "Sim" : "Não"}</p>}
                  {selectedLead.raw_data?.exteriorArea !== undefined && <p><strong>Áreas Exteriores:</strong> {selectedLead.raw_data.exteriorArea ? "Sim" : "Não"}</p>}
                  
                  {selectedLead.raw_data?.hasFurniture !== undefined && <p><strong>Com mobília:</strong> {selectedLead.raw_data.hasFurniture ? "Sim" : "Não"}</p>}
                  {selectedLead.raw_data?.hasDebris !== undefined && <p><strong>Com entulho:</strong> {selectedLead.raw_data.hasDebris ? "Sim" : "Não"}</p>}
                  
                  {selectedLead.raw_data?.quantity && <p><strong>Quantidade:</strong> {selectedLead.raw_data.quantity}</p>}
                  {selectedLead.raw_data?.itemType && <p><strong>Tipo de Peças/Item:</strong> {selectedLead.raw_data.itemType}</p>}
                  {selectedLead.raw_data?.deliveryPreference && <p><strong>Preferência de Entrega:</strong> {selectedLead.raw_data.deliveryPreference}</p>}
                  {selectedLead.raw_data?.itemCondition && <p><strong>Estado/Manchas:</strong> {selectedLead.raw_data.itemCondition}</p>}
                  
                  {selectedLead.raw_data?.services && selectedLead.raw_data.services.length > 1 && (
                    <p><strong>Outros Serviços Incluídos:</strong> {selectedLead.raw_data.services.join(', ')}</p>
                  )}
                  
                  {selectedLead.raw_data?.extras && selectedLead.raw_data.extras.length > 0 && (
                    <p><strong>Extras:</strong> {selectedLead.raw_data.extras.join(', ')}</p>
                  )}

                  {selectedLead.raw_data?.details && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <strong>Observações do Cliente:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{selectedLead.raw_data.details}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 bg-white border-t border-neutral-100 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 rounded-lg font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  Fechar
                </button>
                {selectedLead.status === 'Novo' ? (
                  <button
                    onClick={() => {
                      updateStatus(selectedLead.id, 'Resolvido');
                      setSelectedLead(null);
                    }}
                    className="px-5 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Resolvido
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      updateStatus(selectedLead.id, 'Novo');
                      setSelectedLead(null);
                    }}
                    className="px-5 py-2 rounded-lg font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Reabrir Pedido
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
