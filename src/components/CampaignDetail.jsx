import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { campaigns } = useApp();

    const campaign = campaigns.find(c => c.id === parseInt(id));

    if (!campaign) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Kampanya bulunamadı</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary mt-4">Ana Sayfaya Dön</button>
            </div>
        );
    }

    return (
        <div className="campaign-detail-page">
            <div className="container">
                <button onClick={() => navigate('/')} className="btn-back">← Geri Dön</button>

                <div className="detail-card">
                    <div className="detail-image" style={{ backgroundImage: `url(${campaign.image})` }}></div>
                    <div className="detail-content">
                        <h1>{campaign.title}</h1>
                        <p className="short-desc">{campaign.description}</p>
                        <div className="long-desc">
                            <h3>Kampanya Detayları</h3>
                            <p>{campaign.longDescription || "Bu kampanya için detaylı açıklama bulunmamaktadır."}</p>
                        </div>
                        <button className="btn btn-primary btn-large">Fırsatı Yakala</button>
                    </div>
                </div>
            </div>
            <style>{`
        .campaign-detail-page {
          padding: 120px 0 60px;
          min-height: 100vh;
          background: var(--secondary);
        }
        .btn-back {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .btn-back:hover {
          color: var(--primary);
        }
        .detail-card {
          background: var(--surface);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
        }
        .detail-image {
          width: 100%;
          height: 400px;
          background-size: cover;
          background-position: center;
        }
        .detail-content {
          padding: 40px;
        }
        .detail-content h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          color: var(--primary);
        }
        .short-desc {
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 30px;
          font-weight: 300;
        }
        .long-desc {
          background: rgba(255, 255, 255, 0.05);
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
        }
        .long-desc h3 {
          margin-bottom: 15px;
          color: var(--accent);
        }
        .long-desc p {
          color: var(--text-muted);
          line-height: 1.8;
        }
        .btn-large {
          padding: 15px 40px;
          font-size: 1.2rem;
        }
        @media (max-width: 768px) {
          .detail-image { height: 250px; }
          .detail-content h1 { font-size: 2rem; }
          .short-desc { font-size: 1.2rem; }
        }
      `}</style>
        </div>
    );
};

export default CampaignDetail;
