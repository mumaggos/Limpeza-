import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { businessConfig } from "../config/business";
import { Step1Services } from "../components/quote/Step1Services";
import { Step2Details } from "../components/quote/Step2Details";
import { Step3Location } from "../components/quote/Step3Location";
import { Step4Date } from "../components/quote/Step4Date";
import { Step5Contact } from "../components/quote/Step5Contact";
import { Step6Summary } from "../components/quote/Step6Summary";
import { supabase } from "../lib/supabase";

export type QuoteData = {
  services: string[];
  propertyType?: string;
  rooms?: string;
  bathrooms?: string;
  area?: string;
  frequency?: string;
  furnished?: boolean;
  pets?: boolean;
  extras?: string[];
  details?: string;
  
  // Condominio
  fractions?: string;
  floors?: string;
  elevator?: boolean;
  garage?: boolean;
  exteriorArea?: boolean;
  needs?: string[];

  // Obras/Mudanças
  condition?: string;
  workType?: string;
  hasFurniture?: boolean;
  hasDebris?: boolean;
  completionDate?: string;
  moveType?: string;

  // Lavandaria/Sofas
  laundryService?: string;
  quantity?: string;
  itemType?: string;
  itemCondition?: string;
  deliveryPreference?: string;

  // Location
  location: string;
  postalCode: string;
  address: string;

  // Date
  preferredDate: string;
  preferredTime: string;

  // Contact
  name: string;
  phone: string;
  email: string;
  contactPreference: string;
  acceptPrivacy: boolean;
};

const initialData: QuoteData = {
  services: [],
  location: "",
  postalCode: "",
  address: "",
  preferredDate: "",
  preferredTime: "",
  name: "",
  phone: "",
  email: "",
  contactPreference: "Telefone",
  acceptPrivacy: false,
};

export function QuoteForm() {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get("servico");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteData>({
    ...initialData,
    services: defaultService ? [defaultService] : [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 6;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFormData = (data: Partial<QuoteData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Send to Supabase
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.services[0], // primary service
          status: 'Novo',
          raw_data: formData // Capture all specific fields here
        }
      ]);

      if (error) throw error;
      
      // Send Email Notification (Web3Forms)
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (web3FormsKey) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: web3FormsKey,
              subject: `Novo Pedido: ${formData.services[0]} - ${formData.name}`,
              from_name: 'Pronta e Limpa - Website',
              message: `Recebeu um novo pedido de orçamento:\n\nNome: ${formData.name}\nTelefone: ${formData.phone}\nE-mail: ${formData.email}\nServiço(s): ${formData.services.join(', ')}\nLocalidade: ${formData.location}\n\nDetalhes adicionais podem ser consultados no seu painel de gestão.`,
            })
          });
        } catch (emailError) {
          console.error("Error sending email notification:", emailError);
          // Don't throw here, as the main submission to Supabase succeeded
        }
      }
      
      navigate('/sucesso');
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Ocorreu um erro ao enviar o seu pedido. Por favor, tente novamente ou contacte-nos diretamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => currentStep > 1 ? handleBack() : navigate(-1)}
            className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-neutral-900">Pedir Orçamento</h1>
          <p className="text-neutral-600 mt-2">
            Passo {currentStep} de {totalSteps}
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-neutral-200 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-neutral-900 h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 md:p-10">
          {currentStep === 1 && (
            <Step1Services 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleNext} 
            />
          )}
          {currentStep === 2 && (
            <Step2Details 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Step3Location 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <Step4Date 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <Step5Contact 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          )}
          {currentStep === 6 && (
            <Step6Summary 
              data={formData} 
              onSubmit={handleSubmit} 
              onBack={handleBack}
              isSubmitting={isSubmitting}
              onEditStep={(step) => setCurrentStep(step)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
