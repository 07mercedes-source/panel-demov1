export default function Dashboard() {
  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>EMSAL GmbH Panel Dashboard</h1>
      <p>Hoşgeldiniz! Buradan modüllere erişebilirsiniz.</p>
      <ul>
        <li><a href="/depo">Depo Modülü</a></li>
        <li><a href="/ik">İK Modülü</a></li>
        <li><a href="/restaurant">Restaurant Modülü</a></li>
      </ul>
    </div>
  );
}
