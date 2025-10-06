import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DepoTeslim() {
  const router = useRouter();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [log, setLog] = useState([]);

  const buttonStyle = {
    marginRight: '10px',
    padding: '8px 14px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !quantity) return;
    const newEntry = {
      id: productId,
      quantity: Number(quantity),
      date: new Date().toLocaleString('de-DE') // Almanya formatında tarih
    };
    setLog([...log, newEntry]);
    setProductId('');
    setQuantity('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Ürün Teslim Alma</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Ürün ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ marginRight: '8px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Miktar"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginRight: '8px', padding: '5px' }}
        />
        <button style={buttonStyle} type="submit">Stok Güncelle</button>
        <button
          type="button"
          style={{ ...buttonStyle, backgroundColor: '#64748b' }}
          onClick={() => router.push('/depo')}
        >
          Geri Dön
        </button>
      </form>

      <div className="card" style={{ marginTop: '20px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
        <h3>📋 Teslim Kayıtları</h3>
        {log.length === 0 ? (
          <p>Henüz teslim kaydı yok.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Ürün ID</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Miktar</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Tarih</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.quantity}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
