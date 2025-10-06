import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ userName, setUserName }) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Tarih ve saat güncelleme
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('de-DE', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Kullanıcı hareketi ile timer sıfırlama
  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    const checkTimeout = setInterval(() => {
      if (Date.now() - lastActivity > 15 * 60 * 1000) { // 15 dk
        handleLogout();
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearInterval(checkTimeout);
    };
  }, [lastActivity]);

  function handleLogout() {
    localStorage.removeItem('userName');
    if (setUserName) setUserName('');
    router.push('/login');
  }

  return (
    <nav style={{ padding: 16, background: '#1e293b', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        Hoşgeldiniz, {userName || 'Kullanıcı'}
        <button onClick={handleLogout} style={{ marginLeft: 16, padding: '4px 8px' }}>Çıkış</button>
      </div>
      <div>{currentTime}</div>
    </nav>
  );
}
