import React from 'react';
import { useApp } from '../context/AppContext';

const Hero = () => {
  const { siteContent } = useApp();
  const { hero } = siteContent;

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="animate-fade-in">{hero.title}</h1>
        <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {hero.subtitle}
        </p>
        <div className="hero-buttons animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a href="#menu" className="btn btn-primary">{hero.ctaPrimary}</a>
          <a href="#contact" className="btn btn-outline">{hero.ctaSecondary}</a>
        </div>
      </div>
      <style>{`
        .hero {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/hero.png');
          background-size: cover;
          background-position: center;
          animation: zoomEffect 20s infinite alternate;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(15,15,15,0.95));
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          padding: 0 20px;
        }
        .hero h1 {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
          letter-spacing: -1px;
          line-height: 1.1;
        }
        .hero p {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          color: #e0e0e0;
          font-weight: 300;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        
        @keyframes zoomEffect {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 3rem; }
          .hero p { font-size: 1.2rem; }
          .hero-buttons { flex-direction: column; gap: 15px; }
          .btn { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
