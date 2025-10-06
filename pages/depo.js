export default function Depo() {
  // demo veri statik:
  const products = [
    { id: 1, name: 'Süt 1L', qty: 10, purchase: 20, sale: 30, expiry: '2025-10-12' },
    { id: 2, name: 'Ekmek', qty: 5, purchase: 3, sale: 5, expiry: '2025-10-03' },
    { id: 3, name: 'Peynir', qty: 2, purchase: 50, sale: 70, expiry: '2025-10-08' }
  ];

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h2>Depo Yönetimi</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Ürün</th>
            <th style={{ borderBottom: '1px solid #ddd' }}>Adet</th>
            <th style={{ borderBottom: '1px solid #ddd' }}>Alış</th>
            <th style={{ borderBottom: '1px solid #ddd' }}>Satış</th>
            <th style={{ borderBottom: '1px solid #ddd' }}>SKT</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={{ padding: 8 }}>{p.name}</td>
              <td style={{ padding: 8 }}>{p.qty}</td>
              <td style={{ padding: 8 }}>{p.purchase}</td>
              <td style={{ padding: 8 }}>{p.sale}</td>
              <td style={{ padding: 8 }}>{p.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
