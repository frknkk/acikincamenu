import React from 'react';
import { useApp } from '../context/AppContext';

const Menu = () => {
  const { menuItems, siteContent } = useApp();
  const { menuSection } = siteContent;

  // Group by category
  const categories = [...new Set(menuItems.map(item => item.category || 'Diğer'))];

  return (
    <section id="menu" className="section">
      <div className="container">
        <h2 className="section-title">{menuSection.title}</h2>
        <p className="section-subtitle">{menuSection.subtitle}</p>

        {categories.map(category => (
          <div key={category} className="menu-category">
            <h3 className="category-title">{category}</h3>
            <div className="menu-grid">
              {menuItems.filter(item => item.category === category).map(item => (
                <div key={item.id} className="menu-card">
                  <div className="card-image-wrapper">
                    <div className="card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="card-overlay">
                      <button className="btn-quick-add">+</button>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h4>{item.name}</h4>
                      <span className="price">{item.price}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .section { padding: 100px 0; }
        .category-title {
          font-size: 2rem;
          margin: 60px 0 30px;
          border-left: 4px solid var(--primary);
          padding-left: 20px;
          color: var(--text-main);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        .menu-card {
          background: var(--surface);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }
        .card-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .card-image {
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }
        .menu-card:hover .card-image {
          transform: scale(1.1);
        }
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu-card:hover .card-overlay {
          opacity: 1;
        }
        .btn-quick-add {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transform: scale(0.8);
          transition: transform 0.2s ease;
        }
        .btn-quick-add:hover {
          transform: scale(1);
        }
        .card-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .card-header h4 {
          font-size: 1.3rem;
          margin: 0;
          font-weight: 600;
        }
        .price {
          color: var(--primary);
          font-weight: 700;
          font-size: 1.2rem;
          background: rgba(211, 84, 0, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .card-content p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 25px;
          flex: 1;
        }
        .btn-add {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-main);
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        .btn-add:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }
      `}</style>
    </section>
  );
};

export default Menu;
