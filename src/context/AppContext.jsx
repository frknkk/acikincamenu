import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialData = {
  companyName: 'Gourmet Haven',
  themeColor: '#D32F2F', // Default Red
  apiKey: '', // Store API Key
  contactInfo: {
    phone: '+90 555 123 45 67',
    address: 'Bağdat Caddesi No: 123, Kadıköy, İstanbul',
    email: 'info@gourmethaven.com.tr'
  },
  siteContent: {
    hero: {
      title: 'Lezzetin Doruk Noktası',
      subtitle: 'En taze malzemelerle hazırlanan, damak çatlatan lezzetlerimizi keşfedin.',
      ctaPrimary: 'Menüyü Gör',
      ctaSecondary: 'İletişim'
    },
    menuSection: {
      title: 'Özel Menümüz',
      subtitle: 'Şeflerimizin özenle hazırladığı seçkin lezzetler'
    },
    campaignsSection: {
      title: 'Fırsatlar & Kampanyalar',
      subtitle: 'Sizin için hazırladığımız özel teklifleri kaçırmayın'
    },
    contactSection: {
      title: 'Bize Ulaşın',
      subtitle: 'Sorularınız ve rezervasyon için buradayız'
    }
  },
  categories: ['Burgerler', 'Pizzalar', 'Salatalar', 'Tatlılar', 'İçecekler'],
  menuItems: [
    { id: 1, name: 'Klasik Burger', description: 'Dana köfte, cheddar peyniri, marul, domates', price: '250 ₺', category: 'Burgerler', image: '/images/burger.png' },
    { id: 2, name: 'Truffle Pizza', description: 'Trüf mantarı, mozzarella, roka', price: '320 ₺', category: 'Pizzalar', image: '/images/pizza.png' },
    { id: 3, name: 'Sezar Salata', description: 'Izgara tavuk, parmesan, kruton', price: '180 ₺', category: 'Salatalar', image: '/images/salad.png' },
  ],
  campaigns: [
    {
      id: 1,
      title: 'İkili Burger Menü',
      description: '2 Burger + 2 İçecek sadece 450 ₺',
      longDescription: 'Bu kampanya hafta içi her gün geçerlidir. Seçeceğiniz herhangi iki burger ve iki adet kutu içecek indirimli fiyattan sunulmaktadır. Arkadaşınızla lezzetli bir öğle yemeği için harika bir fırsat!',
      image: '/images/campaign1.png'
    },
    {
      id: 2,
      title: '%20 Öğrenci İndirimi',
      description: 'Tüm menüde geçerli öğrenci indirimi',
      longDescription: 'Öğrenci kimliğinizi göstererek tüm menüden %20 indirimli faydalanabilirsiniz. Kampanya diğer promosyonlarla birleştirilemez.',
      image: '/images/campaign2.png'
    }
  ]
};

export const AppProvider = ({ children }) => {
  // Load from localStorage or use initialData
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('appData');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify(state));
    // Apply theme color
    document.documentElement.style.setProperty('--primary', state.themeColor || '#D32F2F');
  }, [state]);

  const updateCompanyInfo = (info) => {
    setState(prev => ({ ...prev, ...info }));
  };

  const updateThemeColor = (color) => {
    setState(prev => ({ ...prev, themeColor: color }));
  };

  const updateApiKey = (key) => {
    setState(prev => ({ ...prev, apiKey: key }));
  };

  const updateSiteContent = (section, content) => {
    setState(prev => ({
      ...prev,
      siteContent: {
        ...prev.siteContent,
        [section]: { ...prev.siteContent[section], ...content }
      }
    }));
  };

  // Category Management
  const addCategory = (category) => {
    if (!state.categories.includes(category)) {
      setState(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };

  const updateCategory = (oldName, newName) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(c => c === oldName ? newName : c),
      menuItems: prev.menuItems.map(item => item.category === oldName ? { ...item, category: newName } : item)
    }));
  };

  const deleteCategory = (category) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const addMenuItem = (item) => {
    setState(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, { ...item, id: Date.now() }]
    }));
  };

  const addMenuItemsBulk = (items) => {
    setState(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, ...items.map(item => ({ ...item, id: Date.now() + Math.random() }))]
    }));
  };

  const updateMenuItem = (id, updatedItem) => {
    setState(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item => item.id === id ? updatedItem : item)
    }));
  };

  const deleteMenuItem = (id) => {
    setState(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter(item => item.id !== id)
    }));
  };

  const addCampaign = (campaign) => {
    setState(prev => ({
      ...prev,
      campaigns: [...prev.campaigns, { ...campaign, id: Date.now() }]
    }));
  };

  const updateCampaign = (id, updatedCampaign) => {
    setState(prev => ({
      ...prev,
      campaigns: prev.campaigns.map(camp => camp.id === id ? updatedCampaign : camp)
    }));
  };

  const deleteCampaign = (id) => {
    setState(prev => ({
      ...prev,
      campaigns: prev.campaigns.filter(item => item.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      updateCompanyInfo,
      updateThemeColor,
      updateApiKey,
      updateSiteContent,
      addCategory,
      updateCategory,
      deleteCategory,
      addMenuItem,
      addMenuItemsBulk,
      updateMenuItem,
      deleteMenuItem,
      addCampaign,
      updateCampaign,
      deleteCampaign
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
