import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  status: string;
  raw_data: any;
};

export function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app we'd use Supabase Auth, but since you are connecting 
    // it via Render and might just want a quick check without setting up Auth yet:
    // Actually, let's use the standard Supabase Auth approach.
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@prontaelimpa.pt',
      password: password
    });

    if (error) {
      setError("Credenciais inválidas. Verifique se já criou o utilizador no Supabase.");
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
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading && !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">A carregar...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 max-w-md w-full">
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">Painel de Gestão</h1>
          <p className="text-sm text-neutral-600 mb-6">
            Aceda com o e-mail <strong>admin@prontaelimpa.pt</strong> e a password que definir no separador "Authentication" do Supabase.
          </p>
          <form onSubmit={checkAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all"
                placeholder="Insira a sua password"
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

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Gestão de Pedidos</h1>
            <p className="text-neutral-600 mt-1">Veja todos os orçamentos submetidos no site.</p>
          </div>
          <button 
            onClick={() => { supabase.auth.signOut(); setIsAuthenticated(false); }}
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            Terminar Sessão
          </button>
        </div>

        {loading ? (
          <p>A carregar pedidos...</p>
        ) : leads.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-neutral-100 shadow-sm">
            <p className="text-neutral-500">Ainda não existem pedidos de orçamento.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-sm font-medium text-neutral-600">
                    <th className="p-4">Data</th>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Contacto</th>
                    <th className="p-4">Serviço</th>
                    <th className="p-4">Localidade</th>
                    <th className="p-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="p-4 text-sm text-neutral-600">
                        {format(new Date(lead.created_at), "dd MMM yyyy, HH:mm", { locale: ptBR })}
                      </td>
                      <td className="p-4 font-medium text-neutral-900">{lead.name}</td>
                      <td className="p-4 text-sm text-neutral-600">
                        <div>{lead.phone}</div>
                        <div className="text-xs text-neutral-400">{lead.email}</div>
                      </td>
                      <td className="p-4 text-sm text-neutral-900">{lead.service}</td>
                      <td className="p-4 text-sm text-neutral-600">{lead.location}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
