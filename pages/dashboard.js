import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { name } = router.query; // login.js’den gelen kullanıcı adı
  const [currentTime, setCurrentTime] = useState('');

  // Tarih ve saati güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('tr-TR', { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 14 }}>
        {currentTime}
      </div>
      <h1>Hoşgeldiniz, {name || 'Kullanıcı'}!</h1>
      <p>EMSAL GmbH Panel Dashboard</p>
      <ul>
        <li><a href="/depo">Depo Modülü</a></li>
        <li><a href="/ik">İK Modülü</a></li>
        <li><a href="/restaurant">Restaurant Modülü</a></li>
      </ul>
    </div>
  );
}
