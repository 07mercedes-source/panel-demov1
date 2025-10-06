import Link from 'next/link';
import SpeedInsights from '../components/SpeedInsights';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Panel Demo - Dashboard</h1>
        <nav>
          <Link href="/depo"><a style={{ marginRight: 12 }}>Depo</a></Link>
          <Link href="/ik"><a style={{ marginRight: 12 }}>İK</a></Link>
          <Link href="/restoran"><a style={{ marginRight: 12 }}>Restoran</a></Link>
          <Link href="/login"><a>Çıkış</a></Link>
        </nav>
      </header>

      <main style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>Depo Stokları</h3>
            <p>Toplam ürün: 12</p>
            <p>SKT yaklaşan: 2</p>
          </div>

          <div style={{ flex: '1 1 300px', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>İK</h3>
            <p>Personel sayısı: 8</p>
          </div>

          <div style={{ flex: '1 1 300px', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>Restoran</h3>
            <p>Aylık ciro (örnek): 45.000 TL</p>
          </div>

          <div style={{ flex: '1 1 300px', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>SpeedInsights</h3>
            <SpeedInsights />
          </div>
        </div>
      </main>
    </div>
  );
}
