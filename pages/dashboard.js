export default function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1>EMSAL GmbH Panel Dashboard</h1>
      <div className="card">
        <h2>Depo Modülü</h2>
        <p>Ürün stoklarını yönetebilir ve rapor alabilirsiniz.</p>
      </div>
      <div className="card">
        <h2>İK Modülü</h2>
        <p>Personel bilgileri, izin ve raporları görüntüleyebilirsiniz.</p>
      </div>
      <div className="card">
        <h2>Restaurant Modülü</h2>
        <p>Mağaza cirosu, giderler ve personel takibini yapabilirsiniz.</p>
      </div>
    </div>
  );
}
