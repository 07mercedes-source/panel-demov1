import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    let displayName = '';
    if ((username === 'admin' || username === 'muhasebe' || username === 'personel') && password === '12345') {
      // Kullanıcı adı ve rol belirleme (demo)
      if (username === 'admin') displayName = 'Ali Veli';
      else if (username === 'muhasebe') displayName = 'Ayşe Yılmaz';
      else displayName = 'Mehmet Kaya';

      // Dashboard'a yönlendirirken query ile gönder
      router.push({
        pathname: '/dashboard',
        query: { name: displayName }
      });
    } else {
      alert('Kullanıcı adı veya şifre hatalı');
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kullanıcı Adı: </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Şifre: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
}
