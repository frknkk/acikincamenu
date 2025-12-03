import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Campaigns = () => {
  const { campaigns, siteContent } = useApp();
  const { campaignsSection } = siteContent;
  const navigate = useNavigate();

  if (!campaigns.length) return null;

  return (
    <section id="campaigns" className="section-campaigns">
      <div className="container">
        <h2 className="section-title">{campaignsSection.title}</h2>
        <p className="section-subtitle">{campaignsSection.subtitle}</p>
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="campaign-card">
              <div className="campaign-content">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                >
                  Detayları Gör
                </button>
              </div>
              <div className="campaign-image" style={{ backgroundImage: `url(${campaign.image})` }}></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .section-campaigns {
          padding: 80px 0;
          background: var(--surface);
        }
        .campaigns-grid {
          display: grid;
          gap: 40px;
        }
        .campaign-card {
          display: flex;
          background: var(--secondary);
          border-radius: 20px;
          overflow: hidden;
          min-height: 300px;
          border: 1px solid var(--border);
          transition: transform 0.3s ease;
        }
        .campaign-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        .campaign-content {
          flex: 1;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .campaign-content h3 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: var(--accent);
        }
        .campaign-content p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          max-width: 500px;
          color: var(--text-muted);
        }
        .campaign-image {
          flex: 1;
          background-size: cover;
          background-position: center;
          min-height: 300px;
        }
        @media (max-width: 768px) {
          .campaign-card {
            flex-direction: column-reverse;
          }
          .campaign-content {
            padding: 30px;
          }
          .campaign-content h3 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Campaigns;
