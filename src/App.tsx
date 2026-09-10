/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { QuoteForm } from "./pages/QuoteForm";
import { Success } from "./pages/Success";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { FAQ } from "./pages/FAQ";
import { Contacts } from "./pages/Contacts";
import { Legal } from "./pages/Legal";
import { LandingPage } from "./pages/LandingPage";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="orcamento" element={<QuoteForm />} />
          <Route path="sucesso" element={<Success />} />
          <Route path="servicos" element={<Services />} />
          <Route path="sobre-nos" element={<About />} />
          <Route path="perguntas-frequentes" element={<FAQ />} />
          <Route path="contactos" element={<Contacts />} />
          <Route path="admin" element={<Admin />} />
          
          <Route path="politica-de-privacidade" element={<Legal type="privacy" />} />
          <Route path="termos-e-condicoes" element={<Legal type="terms" />} />
          <Route path="cookies" element={<Legal type="cookies" />} />

          {/* Dynamic route for SEO landing pages (cities or services) */}
          <Route path=":slug" element={<LandingPage />} />
          <Route path="servicos/:slug" element={<LandingPage />} />
          
          {/* Catch-all */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
