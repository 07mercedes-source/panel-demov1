import '../styles-global.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  // localStorage'dan kullanıcı adını al
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
    else if (router.pathname !== '/login') router.push('/login'); // login değilse ve kullanıcı yoksa yönlendir
  }, [router]);

  return (
    <>
      <Navbar userName={userName} />
      <Component {...pageProps} setUserName={setUserName} />
    </>
  );
}
