import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ userName, onLanguageChange }) {
  const router = useRouter();
  const [restaurantMenuOpen, setRestaurantMenuOpen] = useState(false);
  const [depoMenuOpen, setDepoMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [lang, setLang] = useState('tr');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };
  const menuStyle = { position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid #cbd5e1', borderRadius: 6, zIndex: 10 };
  const menuItemStyle = { padding: 8, cursor: 'pointer', borderBottom: '1px solid #cbd5e1' };

  const goTo = (path) => router.push(path);

  const handleLangChange = (l) => {
    setLang(l);
    onLanguageChange(l);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: '#f1f5f9', position: 'sticky', top: 0, zIndex: 100 }}>
      
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ height: 40, cursor: 'pointer' }} onClick={() => router.push('/dashboard')} />
      </div>

      {/* Menüler */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Depo */}
        <div style={{ position: 'relative' }}>
          <button style={buttonStyle} onClick={() => setDepoMenuOpen(!depoMenuOpen)}>Depo ▼</button>
          {depoMenuOpen && (
            <div style={menuStyle}>
              <div style={menuItemStyle} onClick={() => { goTo('/depo'); setDepoMenuOpen(false); }}>Ürün Listesi</div>
              <div style={menuItemStyle} onClick={() => { goTo('/depo-teslim'); setDepoMenuOpen(false); }}>Teslim Alma</div>
              <div style={menuItemStyle} onClick={() => { goTo('/depo-cikis'); setDepoMenuOpen(false); }}>Sevkiyat</div>
              <div style={menuItemStyle} onClick={() => { goTo('/depo-rapor'); setDepoMenuOpen(false); }}>Raporlar</div>
            </div>
          )}
        </div>

        {/* Restaurant */}
        <div style={{ position: 'relative' }}>
          <button style={buttonStyle} onClick={() => setRestaurantMenuOpen(!restaurantMenuOpen)}>Restaurant ▼</button>
          {restaurantMenuOpen && (
            <div style={menuStyle}>
              <div style={menuItemStyle} onClick={() => { goTo('/restaurant1'); setRestaurantMenuOpen(false); }}>Restaurant 1</div>
              <div style={menuItemStyle} onClick={() => { goTo('/restaurant2'); setRestaurantMenuOpen(false); }}>Restaurant 2</div>
            </div>
          )}
        </div>
      </div>

      {/* Sağ üst kullanıcı ve saat */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>{userName} – Hoşgeldiniz</div>
        <div>{time.toLocaleString('de-DE', { hour12: false })}</div>

        {/* Dil Seçimi */}
        <div>
          <span style={{ cursor: 'pointer', margin: '0 2px' }} onClick={() => handleLangChange('tr')}>🇹🇷</span>
          <span style={{ cursor: 'pointer', margin: '0 2px' }} onClick={() => handleLangChange('en')}>🇬🇧</span>
          <span style={{ cursor: 'pointer', margin: '0 2px' }} onClick={() => handleLangChange('de')}>🇩🇪</span>
        </div>

        {/* Logout */}
        <button style={{ ...buttonStyle, backgroundColor: '#ef4444' }} onClick={() => router.push('/login')}>Logout</button>
      </div>
    </div>
  );
}
