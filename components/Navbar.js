import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ userName, setUserName }) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [depoMenuOpen, setDepoMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('de-DE', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    const checkTimeout = setInterval(() => {
      if (Date.now() - lastActivity > 15 * 60 * 1000) handleLogout();
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearInterval(checkTimeout);
    };
  }, [lastActivity]);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    if (setUserName) setUserName('');
    router.push('/login');
  };

  const goTo = (path) => router.push(path);

  const buttonStyle = {
    padding: '6px 14px',
    margin: '0 4px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#3b82f6',
    color: 'white',
    transition: '0.2s'
  };

  const logoutStyle = { ...buttonStyle, backgroundColor: '#ef4444' };

  const menuStyle = {
    position: 'absolute',
    top: '36px',
    left: 0,
    background: '#f1f5f9',
    color: '#1e293b',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 10
  };

  const menuItemStyle = {
    padding: '6px 12px',
    cursor: 'pointer',
    borderBottom: '1px solid #cbd5e1'
  };

  return (
    <nav style={{ padding: 16, background: '#1e293b', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', flexWrap: 'wrap' }}>
      <div><strong>Hoşgeldiniz, {userName || 'Kullanıcı'}</strong></div>

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <button style={buttonStyle} onClick={() => goTo('/dashboard')}>Dashboard</button>

        {/* Depo Açılır Menü */}
        <div style={{ position: 'relative' }}>
          <button style={buttonStyle} onClick={() => setDepoMenuOpen(!depoMenuOpen)}>Depo ▼</button>
