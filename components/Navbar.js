import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ userName, setUserName }) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());

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
    padding: '8px 14px',
    margin: '0 6px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#3b82f6',
    color: 'white',
    transition: '0.2s'
  };

  const logoutStyle = { ...buttonStyle, backgroundColor: '#ef4444' };

  return (
    <nav style={{ padding: 16, background: '#1e293b', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
      <div><strong>Hoşgeldiniz, {userName || 'Kullanıcı'}</strong></div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <button style={buttonStyle} onClick={() => goTo('/dashboard')}>Dashboard</button>
        <button style={buttonStyle} onClick={() => goTo('/depo')}>Depo</button>
        <button style={buttonStyle} onClick={() => goTo('/ik')}>İK</button>
        <button style={buttonStyle} onClick={() => goTo('/restaurant')}>Restaurant</button>
        <button style={logoutStyle} onClick={handleLogout}>Çıkış</button>
      </div>
      <div>{currentTime}</div>
    </nav>
  );
}
