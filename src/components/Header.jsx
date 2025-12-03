import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { companyName } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          <a href="/">{companyName}</a>
        </div>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <a href="/#menu" onClick={() => setMenuOpen(false)}>Menü</a>
          <a href="/#campaigns" onClick={() => setMenuOpen(false)}>Kampanyalar</a>
          <a href="/#contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>İletişim</a>
        </nav>
      </div>
      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.3s ease;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
        }
        .header.scrolled {
          background: rgba(18, 18, 18, 0.95);
          padding: 15px 0;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo a {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary);
        }
        .mobile-toggle {
          display: none;
          font-size: 1.5rem;
          background: none;
          color: var(--text-main);
          border: none;
          cursor: pointer;
          z-index: 1001; /* Ensure it's above the nav when open */
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .nav a:not(.btn) {
          font-weight: 500;
          position: relative;
        }
        .nav a:not(.btn)::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }
        .nav a:not(.btn):hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          .nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            max-width: 300px; /* Limit width on larger mobile screens */
            height: 100vh;
            background: var(--surface);
            flex-direction: column;
            justify-content: center;
            transition: right 0.3s ease;
            box-shadow: -5px 0 15px rgba(0,0,0,0.5);
            padding: 20px;
            gap: 20px;
          }
          .nav.active {
            right: 0;
          }
          .nav a {
            font-size: 1.2rem;
            width: 100%;
            text-align: center;
            padding: 10px 0;
          }
          .nav a:not(.btn)::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
