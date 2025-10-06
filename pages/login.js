import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Basit demo auth
    if ((username === 'admin' || username === 'muhasebe' || username === 'personel') && password === '12345') {
      // role belirleme (sadece demo)
      if (username === 'admin') setRole('Yönetici');
      else if (username === 'muhasebe') setRole('Muhasebe');
      else setRole('Personel');

      alert(`Giriş başarılı! Rol: ${role}`);
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
