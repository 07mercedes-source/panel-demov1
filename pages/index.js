import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Yönetim Paneli</h1>
      <p>Aşağıdan istediğiniz modüle geçebilirsiniz:</p>
      <div style={{ marginTop: 20 }}>
        <Link href="/depo" style={{ marginRight: 12 }}>Depo</Link>
        <Link href="/ik" style={{ marginRight: 12 }}>İK</Link>
        <Link href="/restoran" style={{ marginRight: 12 }}>Restoran</Link>
        <Link href="/login">Çıkış</Link>
      </div>
    </div>
  );
}
