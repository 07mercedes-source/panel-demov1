import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DepoCikis() {
  const router = useRouter();
  const [products, setProducts] = useState([
    { id: 1, name: 'Ürün A', quantity: 50 },
    { id: 2, name: 'Ürün B', quantity: 20 }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value, 10);
    const qty = parseInt(e.target.quantity.value, 10);
    const product = products.find(p => p.id === id);
    if(!product || qty > product.quantity) {
      alert('Stokta yeterli ürün yok!');
      return;
    }
    setProducts(products.map(p => p.id === id ? { ...p, quantity: p.quantity - qty } : p));
    alert('Ürün çıkışı tamamlandı!');
    e.target.reset();
  };

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Çıkışı (Restauranta Gönderim)</h2>
      <form onSubmit={handleSubmit} className="card" style={{ padding: 16 }}>
        <label>Ürün ID: <input type="number" name="id" required /></label>
        <label style={{ marginLeft: 10 }}>Miktar: <input type="number" name="quantity" required /></label>
        <button style={buttonStyle} type="submit">Stoktan Düş</button>
      </form>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Güncel Stok</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Ürün</th><th>Miktar</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
