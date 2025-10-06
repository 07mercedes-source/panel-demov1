import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DepoTeslim() {
  const router = useRouter();
  const [products, setProducts] = useState([
    { id: 1, name: 'Ürün A', quantity: 50 },
    { id: 2, name: 'Ürün B', quantity: 20 }
  ]);

  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value, 10);
    const qty = parseInt(e.target.quantity.value, 10);

    const product = products.find(p => p.id === id);
    if(!product) {
      alert('Ürün bulunamadı!');
      return;
    }

    // Stok güncelle
    setProducts(products.map(p => p.id === id ? { ...p, quantity: p.quantity + qty } : p));

    // Geçmiş kaydı
    const date = new Date().toLocaleString('de-DE', { hour12: false });
    setHistory([...history, { id, name: product.name, type: 'Giriş', quantity: qty, date }]);

    e.target.reset();
  };

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Teslim Alma</h2>

      <form onSubmit={handleSubmit} className="card" style={{ padding: 16, marginBottom: 16 }}>
        <label>Ürün ID: <input type="number" name="id" required /></label>
        <label style={{ marginLeft: 10 }}>Miktar: <input type="number" name="quantity" required /></label>
        <button style={buttonStyle} type="submit">Stok Güncelle</button>
      </form>

      <div className="card" style={{ marginTop
