import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { BalanceProvider } from './contexts/BalanceContext';
import { SurveysProvider } from './contexts/SurveysContext';
import { WithdrawProvider } from './contexts/WithdrawContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { StatsProvider } from './contexts/StatsContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Withdraw from './pages/Withdraw';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extensão da interface Window para incluir pixelId
declare global {
  interface Window {
    pixelId: string;
    utmifyConfig?: {
      allowCors: boolean;
      pixelId: string;
    };
    utmify?: {
      event: (name: string, params?: any) => void;
    };
  }
}

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Dispara evento de pageview para cada mudança de rota
    if (window.utmify) {
      window.utmify.event('page_view', {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
}

// Função para manter os parâmetros UTM nos links
export function addUTMParams(url: string) {
  return `${url}${window.location.search}`;
}

function App() {
  useEffect(() => {
    window.pixelId = "677f38499cf67a9c757af309";
    const pixelScript = document.createElement("script");
    pixelScript.async = true;
    pixelScript.defer = true;
    pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    document.head.appendChild(pixelScript);

    const utmScript = document.createElement("script");
    utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
    utmScript.setAttribute("data-utmify-prevent-subids", "");
    utmScript.async = true;
    utmScript.defer = true;
    document.head.appendChild(utmScript);
  }, []);

  return (
    <AuthProvider>
      <BalanceProvider>
        <WithdrawProvider>
          <SurveysProvider>
            <NotificationProvider>
              <StatsProvider>
                <Router future={{ v7_relativeSplatPath: true }}>
                  <Toaster position="top-center" />
                  <RouteTracker />
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }>
                      <Route path="/home" element={<Home />} />
                      <Route path="/survey/:id" element={<Survey />} />
                      <Route path="/withdraw" element={<Withdraw />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/faq" element={<FAQ />} />
                    </Route>
                  </Routes>
                </Router>
              </StatsProvider>
            </NotificationProvider>
          </SurveysProvider>
        </WithdrawProvider>
      </BalanceProvider>
    </AuthProvider>
  );
}

export default App;