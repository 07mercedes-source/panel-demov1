import { useState } from 'react';
import { useRouter } from 'nextrouter';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
     Basit demo auth
    if ((username === 'admin'  username === 'muhasebe'  username === 'personel') && password === '12345') {
       role belirleme (sadece demo)
      let role = 'personel';
      if (username === 'admin') role = 'admin';
      if (username === 'muhasebe') role = 'muhasebe';
       oturum basit localStorage
      localStorage.setItem('panelUser', JSON.stringify({ username, role }));
      router.push('');
    } else {
      alert('Kullanıcı adı veya şifre yanlış. Demo için adminmuhasebepersonel ve şifre 12345 kullan.');
    }
  }

  return (
    div style={{ fontFamily 'Arial, sans-serif', padding 24 }}
      h2Girişh2
      form onSubmit={handleSubmit}
        div style={{ marginBottom 12 }}
          labelKullanıcı Adılabelbr 
          input value={username} onChange={(e) = setUsername(e.target.value)} 
        div
        div style={{ marginBottom 12 }}
          labelŞifrelabelbr 
          input type=password value={password} onChange={(e) = setPassword(e.target.value)} 
        div
        button type=submitGirişbutton
      form
      p style={{ marginTop 12 }}Demo kullanıcılar admin  muhasebe  personel  (şifre 12345)p
    div
  );
}
