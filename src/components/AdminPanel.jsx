import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import * as XLSX from 'xlsx';

const AdminPanel = ({ isOpen, onClose }) => {
  const {
    companyName,
    contactInfo,
    siteContent,
    menuItems,
    campaigns,
    categories,
    apiKey,
    themeColor,
    updateCompanyInfo,
    updateThemeColor,
    updateApiKey,
    updateSiteContent,
    addCategory,
    updateCategory,
    deleteCategory,
    addMenuItem,
    addMenuItemsBulk,
    deleteMenuItem,
    addCampaign,
    updateCampaign,
    deleteCampaign
  } = useApp();

  const [activeTab, setActiveTab] = useState('general');

  // Local state for forms
  const [generalForm, setGeneralForm] = useState({
    companyName,
    phone: contactInfo.phone,
    address: contactInfo.address,
    email: contactInfo.email,
    apiKey: apiKey || '',
    themeColor: themeColor || '#D32F2F'
  });

  const [contentForm, setContentForm] = useState({
    heroTitle: siteContent.hero.title,
    heroSubtitle: siteContent.hero.subtitle,
    menuTitle: siteContent.menuSection.title,
    menuSubtitle: siteContent.menuSection.subtitle,
    contactTitle: siteContent.contactSection.title,
    contactSubtitle: siteContent.contactSection.subtitle
  });

  // Menu Item State
  const [newItem, setNewItem] = useState({
    name: '', description: '', price: '', category: categories[0] || 'Burgerler', image: '/images/burger.png'
  });
  const [itemImageMode, setItemImageMode] = useState('url'); // 'url', 'upload', 'generate'
  const [itemPrompt, setItemPrompt] = useState('');

  // Category Management State
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState({ original: '', current: '' });

  // Campaign Form State
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [campaignForm, setCampaignForm] = useState({
    title: '', description: '', longDescription: '', image: '/images/hero.png'
  });
  const [campaignImageMode, setCampaignImageMode] = useState('url'); // 'url', 'upload', 'generate'
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  if (!isOpen) return null;

  // --- Handlers ---

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    updateCompanyInfo({
      companyName: generalForm.companyName,
      contactInfo: {
        phone: generalForm.phone,
        address: generalForm.address,
        email: generalForm.email
      }
    });
    updateApiKey(generalForm.apiKey);
    updateThemeColor(generalForm.themeColor);
    alert('Genel ayarlar kaydedildi!');
  };

  const handleContentSubmit = (e) => {
    e.preventDefault();
    updateSiteContent('hero', { title: contentForm.heroTitle, subtitle: contentForm.heroSubtitle });
    updateSiteContent('menuSection', { title: contentForm.menuTitle, subtitle: contentForm.menuSubtitle });
    updateSiteContent('contactSection', { title: contentForm.contactTitle, subtitle: contentForm.contactSubtitle });
    alert('İçerik güncellendi!');
  };

  // Image Upload Handler
  const handleImageUpload = (e, setFunction, currentData) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFunction({ ...currentData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Price Formatting
  const handlePriceChange = (e) => {
    setNewItem({ ...newItem, price: e.target.value });
  };

  const handlePriceBlur = () => {
    if (newItem.price && !newItem.price.includes('₺')) {
      setNewItem(prev => ({ ...prev, price: `${prev.price} ₺` }));
    }
  };

  // Excel Handlers
  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      { name: 'Örnek Burger', description: 'Lezzetli burger', price: '200 ₺', category: 'Burgerler', image: '/images/burger.png' },
      { name: 'Örnek Pizza', description: 'Karışık pizza', price: '250 ₺', category: 'Pizzalar', image: '/images/pizza.png' }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MenuTemplate");
    XLSX.writeFile(wb, "MenuSablonu.xlsx");
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        if (data && data.length > 0) {
          // Validate and clean data if needed
          const cleanedData = data.map(item => ({
            name: item.name || 'İsimsiz',
            description: item.description || '',
            price: item.price ? item.price.toString() : '0 ₺',
            category: item.category || 'Diğer',
            image: item.image || '/images/burger.png'
          }));

          addMenuItemsBulk(cleanedData);
          alert(`${cleanedData.length} ürün başarıyla eklendi!`);
        } else {
          alert('Dosyada veri bulunamadı.');
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const simulateImageGeneration = (prompt, setFunction, currentData) => {
    if (!prompt) {
      alert('Lütfen bir tarif girin');
      return;
    }
    alert(`Görsel oluşturuluyor: "${prompt}"...\n(Not: Gerçek uygulamada API kullanılacaktır.)`);
    setTimeout(() => {
      setFunction({ ...currentData, image: `https://placehold.co/600x400?text=${encodeURIComponent(prompt)}` });
    }, 1000);
  };

  const generateCampaignText = () => {
    if (!generalForm.apiKey) {
      alert('Lütfen önce Genel Ayarlar sekmesinden API Anahtarınızı girin.');
      return;
    }
    if (!campaignForm.title) {
      alert('Lütfen önce bir kampanya başlığı girin.');
      return;
    }

    setAiLoading(true);
    setTimeout(() => {
      const generatedText = `"${campaignForm.title}" kampanyası ile lezzet şölenine davetlisiniz! Bu özel fırsat kapsamında sunulan ayrıcalıklar, damak tadınıza hitap edecek en seçkin lezzetleri bir araya getiriyor. Sınırlı süre için geçerli olan bu kampanyayı kaçırmayın.`;
      setCampaignForm(prev => ({ ...prev, longDescription: generatedText }));
      setAiLoading(false);
    }, 1500);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    addMenuItem(newItem);
    setNewItem({ name: '', description: '', price: '', category: categories[0] || 'Burgerler', image: '/images/burger.png' });
    setItemPrompt('');
  };

  // Category Handlers
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  const handleUpdateCategory = (original) => {
    if (editingCategory.current && editingCategory.current !== original) {
      updateCategory(original, editingCategory.current);
    }
    setEditingCategory({ original: '', current: '' });
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    if (editingCampaignId) {
      updateCampaign(editingCampaignId, { ...campaignForm, id: editingCampaignId });
      setEditingCampaignId(null);
      alert('Kampanya güncellendi!');
    } else {
      addCampaign(campaignForm);
      alert('Kampanya eklendi!');
    }
    setCampaignForm({ title: '', description: '', longDescription: '', image: '/images/hero.png' });
    setCampaignPrompt('');
  };

  const startEditCampaign = (campaign) => {
    setEditingCampaignId(campaign.id);
    setCampaignForm(campaign);
    setActiveTab('campaigns');
  };

  return (
    <div className="admin-overlay">
      <div className="admin-modal">
        <div className="admin-header">
          <h2>Yönetim Paneli</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>Genel</button>
          <button className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>İçerik</button>
          <button className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>Menü</button>
          <button className={`tab-btn ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>Kampanyalar</button>
        </div>

        <div className="admin-content">
          {activeTab === 'general' && (
            <form onSubmit={handleGeneralSubmit} className="admin-form">
              <h3>Genel Bilgiler</h3>
              <div className="form-group">
                <label>Şirket Adı</label>
                <input value={generalForm.companyName} onChange={e => setGeneralForm({ ...generalForm, companyName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input value={generalForm.phone} onChange={e => setGeneralForm({ ...generalForm, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Adres</label>
                <input value={generalForm.address} onChange={e => setGeneralForm({ ...generalForm, address: e.target.value })} />
              </div>
              <div className="form-group">
                <label>E-posta</label>
                <input value={generalForm.email} onChange={e => setGeneralForm({ ...generalForm, email: e.target.value })} />
              </div>

              <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />

              <h3>Görünüm Ayarları</h3>
              <div className="form-group">
                <label>Tema Rengi</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={generalForm.themeColor}
                    onChange={e => setGeneralForm({ ...generalForm, themeColor: e.target.value })}
                    style={{ width: '50px', height: '50px', padding: 0, border: 'none', cursor: 'pointer' }}
                  />
                  <span>Seçili Renk: {generalForm.themeColor}</span>
                </div>
              </div>

              <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />

              <h3>API Ayarları</h3>
              <div className="form-group">
                <label>Gemini API Anahtarı (Yapay Zeka İçin)</label>
                <input
                  type="password"
                  placeholder="API Anahtarınızı buraya girin"
                  value={generalForm.apiKey}
                  onChange={e => setGeneralForm({ ...generalForm, apiKey: e.target.value })}
                />
                <small style={{ color: 'var(--text-muted)' }}>Kampanya metinlerini otomatik oluşturmak için gereklidir.</small>
              </div>

              <button className="btn btn-primary">Kaydet</button>
            </form>
          )}

          {activeTab === 'content' && (
            <form onSubmit={handleContentSubmit} className="admin-form">
              <h3>Site İçeriği</h3>
              <div className="form-group">
                <label>Hero Başlık</label>
                <input value={contentForm.heroTitle} onChange={e => setContentForm({ ...contentForm, heroTitle: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Hero Alt Başlık</label>
                <textarea rows="2" value={contentForm.heroSubtitle} onChange={e => setContentForm({ ...contentForm, heroSubtitle: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label>Menü Bölüm Başlığı</label>
                <input value={contentForm.menuTitle} onChange={e => setContentForm({ ...contentForm, menuTitle: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Menü Bölüm Alt Başlığı</label>
                <input value={contentForm.menuSubtitle} onChange={e => setContentForm({ ...contentForm, menuSubtitle: e.target.value })} />
              </div>
              <div className="form-group">
                <label>İletişim Bölüm Başlığı</label>
                <input value={contentForm.contactTitle} onChange={e => setContentForm({ ...contentForm, contactTitle: e.target.value })} />
              </div>
              <div className="form-group">
                <label>İletişim Bölüm Alt Başlığı</label>
                <input value={contentForm.contactSubtitle} onChange={e => setContentForm({ ...contentForm, contactSubtitle: e.target.value })} />
              </div>
              <button className="btn btn-primary">Güncelle</button>
            </form>
          )}

          {activeTab === 'menu' && (
            <div className="menu-manager">
              {/* Bulk Upload Section */}
              <div className="section-box" style={{ background: 'rgba(33, 150, 243, 0.1)', borderColor: '#2196F3' }}>
                <h3>Toplu Menü Yükleme (Excel)</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                  Menü öğelerini tek tek eklemek yerine Excel dosyası ile toplu olarak yükleyebilirsiniz.
                </p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={downloadTemplate} className="btn" style={{ background: '#2196F3', color: 'white' }}>
                    📥 Şablonu İndir
                  </button>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleExcelUpload}
                      id="excel-upload"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="excel-upload" className="btn" style={{ background: 'var(--success)', color: 'white', cursor: 'pointer', display: 'inline-block', padding: '10px 20px' }}>
                      📤 Excel Yükle
                    </label>
                  </div>
                </div>
              </div>

              {/* Category Management */}
              <div className="category-manager section-box">
                <h3>Kategoriler</h3>
                <div className="category-list">
                  {categories.map(cat => (
                    <div key={cat} className="category-item">
                      {editingCategory.original === cat ? (
                        <div className="edit-cat-group">
                          <input
                            value={editingCategory.current}
                            onChange={e => setEditingCategory({ ...editingCategory, current: e.target.value })}
                            autoFocus
                          />
                          <button onClick={() => handleUpdateCategory(cat)} className="btn-save-sm">✓</button>
                          <button onClick={() => setEditingCategory({ original: '', current: '' })} className="btn-cancel-sm">✗</button>
                        </div>
                      ) : (
                        <>
                          <span>{cat}</span>
                          <div className="cat-actions">
                            <button onClick={() => setEditingCategory({ original: cat, current: cat })} className="btn-edit-sm">✎</button>
                            <button onClick={() => deleteCategory(cat)} className="btn-delete-sm">🗑</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddCategory} className="add-cat-form">
                  <input
                    placeholder="Yeni Kategori Ekle"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                  />
                  <button className="btn-add-sm">+</button>
                </form>
              </div>

              <div className="add-item-form section-box">
                <h3>Yeni Ürün Ekle</h3>
                <form onSubmit={handleAddItem}>
                  <input placeholder="Ürün Adı" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
                  <input
                    placeholder="Fiyat (örn: 250)"
                    value={newItem.price}
                    onChange={handlePriceChange}
                    onBlur={handlePriceBlur}
                    required
                  />
                  <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input placeholder="Açıklama" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />

                  {/* Image Selection UI */}
                  <div className="image-selector">
                    <div className="mode-switch">
                      <button type="button" className={itemImageMode === 'url' ? 'active' : ''} onClick={() => setItemImageMode('url')}>Link</button>
                      <button type="button" className={itemImageMode === 'upload' ? 'active' : ''} onClick={() => setItemImageMode('upload')}>Yükle</button>
                      <button type="button" className={itemImageMode === 'generate' ? 'active' : ''} onClick={() => setItemImageMode('generate')}>AI</button>
                    </div>

                    {itemImageMode === 'url' && (
                      <input placeholder="Görsel URL'si" value={newItem.image} onChange={e => setNewItem({ ...newItem, image: e.target.value })} />
                    )}
                    {itemImageMode === 'upload' && (
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewItem, newItem)} />
                    )}
                    {itemImageMode === 'generate' && (
                      <div className="generate-box">
                        <input
                          placeholder="Yemeği tarif et"
                          value={itemPrompt}
                          onChange={e => setItemPrompt(e.target.value)}
                        />
                        <button type="button" onClick={() => simulateImageGeneration(itemPrompt, setNewItem, newItem)} className="btn-generate">Oluştur</button>
                      </div>
                    )}
                    {newItem.image && <div className="preview-thumb"><img src={newItem.image} alt="Önizleme" /></div>}
                  </div>

                  <button className="btn btn-primary w-full mt-4">Ürünü Ekle</button>
                </form>
              </div>

              <div className="items-list">
                <h3>Mevcut Menü</h3>
                {menuItems.map(item => (
                  <div key={item.id} className="list-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.name} className="item-thumb" />
                      <div>
                        <span className="item-name">{item.name}</span>
                        <span className="item-cat">{item.category}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteMenuItem(item.id)} className="btn-delete">Sil</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="campaign-manager">
              <div className="add-item-form section-box">
                <h3>{editingCampaignId ? 'Kampanyayı Düzenle' : 'Yeni Kampanya Ekle'}</h3>
                <form onSubmit={handleCampaignSubmit}>
                  <input placeholder="Kampanya Başlığı" value={campaignForm.title} onChange={e => setCampaignForm({ ...campaignForm, title: e.target.value })} required />
                  <input placeholder="Kısa Açıklama" value={campaignForm.description} onChange={e => setCampaignForm({ ...campaignForm, description: e.target.value })} required />

                  <div className="form-group">
                    <label>Detaylı Açıklama</label>
                    <div className="ai-input-group">
                      <textarea
                        rows="4"
                        className="form-input"
                        placeholder="Kampanya detayları..."
                        value={campaignForm.longDescription}
                        onChange={e => setCampaignForm({ ...campaignForm, longDescription: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn-ai"
                        onClick={generateCampaignText}
                        disabled={aiLoading}
                      >
                        {aiLoading ? 'Yazılıyor...' : '✨ AI ile Yaz'}
                      </button>
                    </div>
                  </div>

                  {/* Image Selection UI */}
                  <div className="image-selector">
                    <div className="mode-switch">
                      <button type="button" className={campaignImageMode === 'url' ? 'active' : ''} onClick={() => setCampaignImageMode('url')}>Link</button>
                      <button type="button" className={campaignImageMode === 'upload' ? 'active' : ''} onClick={() => setCampaignImageMode('upload')}>Yükle</button>
                      <button type="button" className={campaignImageMode === 'generate' ? 'active' : ''} onClick={() => setCampaignImageMode('generate')}>AI</button>
                    </div>

                    {campaignImageMode === 'url' && (
                      <input placeholder="Görsel URL'si" value={campaignForm.image} onChange={e => setCampaignForm({ ...campaignForm, image: e.target.value })} />
                    )}
                    {campaignImageMode === 'upload' && (
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setCampaignForm, campaignForm)} />
                    )}
                    {campaignImageMode === 'generate' && (
                      <div className="generate-box">
                        <input
                          placeholder="Kampanyayı tarif et"
                          value={campaignPrompt}
                          onChange={e => setCampaignPrompt(e.target.value)}
                        />
                        <button type="button" onClick={() => simulateImageGeneration(campaignPrompt, setCampaignForm, campaignForm)} className="btn-generate">Oluştur</button>
                      </div>
                    )}
                    {campaignForm.image && <div className="preview-thumb"><img src={campaignForm.image} alt="Önizleme" /></div>}
                  </div>

                  <div className="form-actions">
                    {editingCampaignId && (
                      <button type="button" onClick={() => { setEditingCampaignId(null); setCampaignForm({ title: '', description: '', longDescription: '', image: '/images/hero.png' }); }} className="btn btn-outline">İptal</button>
                    )}
                    <button className="btn btn-primary">{editingCampaignId ? 'Güncelle' : 'Kampanya Ekle'}</button>
                  </div>
                </form>
              </div>

              <div className="items-list">
                <h3>Aktif Kampanyalar</h3>
                {campaigns.map(item => (
                  <div key={item.id} className="list-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.title} className="item-thumb" />
                      <span>{item.title}</span>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => startEditCampaign(item)} className="btn-edit">Düzenle</button>
                      <button onClick={() => deleteCampaign(item.id)} className="btn-delete">Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .admin-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
          padding: 20px;
        }
        .admin-modal {
          background: var(--surface);
          width: 100%;
          max-width: 800px;
          height: 90vh;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .admin-header {
          padding: 15px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .close-btn {
          background: none;
          color: var(--text-main);
          font-size: 2rem;
          line-height: 1;
        }
        .admin-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }
        .tab-btn {
          flex: 1;
          padding: 15px;
          background: none;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          background: rgba(255, 87, 34, 0.1);
        }
        .admin-content {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }
        .section-box {
          background: var(--secondary);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid var(--border);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--text-muted);
        }
        .admin-form input, .add-item-form input, .add-item-form select, .form-input, .add-cat-form input {
          width: 100%;
          padding: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-main);
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .admin-form textarea.form-input {
          resize: vertical;
          min-height: 60px;
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: var(--secondary);
          margin-bottom: 10px;
          border-radius: 6px;
        }
        .item-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .item-thumb {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
        }
        .item-cat {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
        }
        .item-actions {
          display: flex;
          gap: 10px;
        }
        .btn-edit {
          background: var(--accent);
          color: black;
          padding: 5px 10px;
          border-radius: 4px;
        }
        .btn-delete {
          background: var(--danger);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
        }
        
        /* Category Manager Styles */
        .category-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }
        .category-item {
          background: var(--surface);
          padding: 5px 10px;
          border-radius: 20px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .category-item .edit-cat-group {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .category-item .edit-cat-group input {
          margin-bottom: 0;
          padding: 4px 8px;
          height: auto;
          width: 100px;
        }
        .cat-actions {
          display: flex;
          gap: 5px;
        }
        .btn-edit-sm, .btn-delete-sm, .btn-save-sm, .btn-cancel-sm {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 2px;
        }
        .btn-delete-sm { color: var(--danger); }
        .btn-edit-sm { color: var(--accent); }
        .btn-save-sm { color: var(--primary); }
        .btn-cancel-sm { color: var(--text-muted); }
        .add-cat-form {
          display: flex;
          gap: 10px;
        }
        .btn-add-sm {
          background: var(--primary);
          color: white;
          border: none;
          width: 40px;
          border-radius: 6px;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 42px; /* Match input height */
        }
        
        /* Image Selector Styles */
        .image-selector {
          background: var(--surface);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          border: 1px solid var(--border);
        }
        .mode-switch {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .mode-switch button {
          flex: 1;
          padding: 8px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          border-radius: 4px;
          font-size: 0.9rem;
        }
        .mode-switch button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .generate-box {
          display: flex;
          gap: 10px;
        }
        .btn-generate {
          background: var(--accent);
          color: black;
          padding: 0 15px;
          border-radius: 6px;
          font-weight: 600;
        }
        .preview-thumb {
          margin-top: 10px;
          text-align: center;
        }
        .preview-thumb img {
          max-height: 150px;
          border-radius: 6px;
        }
        .ai-input-group {
          position: relative;
        }
        .btn-ai {
          position: absolute;
          bottom: 15px;
          right: 10px;
          background: var(--accent);
          color: black;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .form-actions {
          display: flex;
          gap: 10px;
        }
        .form-actions button {
          flex: 1;
        }

        @media (max-width: 768px) {
          .admin-modal {
            height: 100%;
            width: 100%;
            border-radius: 0;
          }
          .admin-tabs {
            overflow-x: scroll;
          }
          .generate-box {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
