import React from 'react';
import { useApp } from '../context/AppContext';

const Contact = () => {
  const { contactInfo, siteContent } = useApp();
  const { contactSection } = siteContent;

  return (
    <section id="contact" className="section-contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="section-title" style={{ textAlign: 'center' }}>{contactSection.title}</h2>
            <p className="contact-desc" style={{ textAlign: 'center' }}>{contactSection.subtitle}</p>

            <div className="info-grid">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="info-item"
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                <span className="icon">📍</span>
                <div>
                  <h4>Adres</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </a>

              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                className="info-item"
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                <span className="icon">📞</span>
                <div>
                  <h4>Telefon</h4>
                  <p>{contactInfo.phone}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .section-contact {
          padding: 100px 0;
          background: linear-gradient(to right, #0F0F0F 50%, #1A1A1A 50%);
        }
        .contact-wrapper {
          display: flex;
          justify-content: center;
        }
        .contact-info {
          width: 100%;
          max-width: 800px;
        }
        .contact-desc {
          margin-bottom: 60px;
          color: var(--text-muted);
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        .info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 15px;
          padding: 30px;
          background: var(--surface);
          border-radius: 16px;
          border: 1px solid var(--border);
          transition: transform 0.3s ease;
        }
        .info-item:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .icon {
          font-size: 2rem;
          background: rgba(255, 87, 34, 0.1);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--primary);
          margin-bottom: 10px;
        }
        .info-item h4 {
          font-size: 1.2rem;
          margin-bottom: 5px;
        }
        .info-item p {
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .section-contact { background: var(--secondary); }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
