import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Campaigns from './components/Campaigns';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import CampaignDetail from './components/CampaignDetail';

const Home = () => (
  <>
    <Hero />
    <Menu />
    <Campaigns />
    <Contact />
  </>
);

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'kumru') {
      setIsLoginOpen(false);
      setIsAdminOpen(true);
      setPassword('');
    } else {
      alert('Hatalı şifre');
    }
  };

  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
            </Routes>
          </main>

          <footer style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', borderTop: '1px solid var(--border)' }}>
            <p>
              <span
                onClick={() => setIsLoginOpen(true)}
                style={{ cursor: 'default', userSelect: 'none' }}
              >
                &copy;
              </span>
              {' '}{new Date().getFullYear()} Medyaket. Tüm hakları saklıdır.
            </p>
          </footer>

          {/* Admin Login Modal */}
          {isLoginOpen && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.8)', zIndex: 2000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(5px)'
            }}>
              <div style={{
                background: 'var(--surface)', padding: '30px', borderRadius: '12px',
                border: '1px solid var(--border)', width: '300px', textAlign: 'center',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Yönetici Girişi</h3>
                <input
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%', padding: '12px', marginBottom: '20px',
                    background: 'var(--secondary)', border: '1px solid var(--border)',
                    color: 'var(--text-main)', borderRadius: '6px', outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setIsLoginOpen(false)}
                    style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleLogin}
                    className="btn btn-primary"
                    style={{ flex: 1, borderRadius: '6px' }}
                  >
                    Giriş
                  </button>
                </div>
              </div>
            </div>
          )}

          <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
