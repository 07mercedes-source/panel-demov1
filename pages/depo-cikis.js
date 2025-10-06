import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function DepoCikis() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Ürün A', quantity: 50 },
    { id: 2, name: 'Ürün B', quantity: 20 }
  ]);

  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value, 10);
    const qty = parseInt(e.target.quantity.value, 10);
    const target = e.target.target.value;

    const product = products.find(p => p.id === id);
    if(!product || qty > product.quantity) {
      alert('Stokta yeterli ürün yok!');
      return;
    }

    // Stok güncelle
    setProducts(products.map(p => p.id === id ? { ...p, quantity: p.quantity - qty } : p));

    // Geçmiş kaydı
    const date = new Date().toLocaleString('de-DE', { hour12: false });
    const record = { id, name: product.name, quantity: qty, target, date };
    setHistory([...history, record]);

    // Sevk irsaliyesi PDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Sevk İrsaliyesi', 14, 20);
    doc.text(`Tarih: ${date}`, 14, 28);
    doc.text(`Hedef: ${target}`, 14, 36);

    doc.autoTable({
      startY: 45,
      head: [['ID', 'Ürün', 'Miktar']],
      body: [[record.id, record.name, record.quantity]],
    });

    doc.save(`Sevk_Irsaliyesi_${date.replace(/[: ]/g,'_')}.pdf`);
    e.target.reset();
  };

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Çıkışı / Sevkiyat</h2>

      <form onSubmit={handleSubmit} className="card" style={{ padding: 16, marginBottom: 16 }}>
        <label>Ürün ID: <input type="number" name="id" required /></label>
        <label style={{ marginLeft: 10 }}>Miktar: <input type="number" name="quantity" required /></label>
        <label style={{ marginLeft: 10 }}>Hedef: <input type="text" name="target" required /></label>
        <button style={buttonStyle} type="submit">Stoktan Düş & Sevk İrsaliyesi</button>
      </form>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Güncel Stok</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>ID</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Ürün</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Miktar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{p.id}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{p.name}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Çıkış Geçmişi</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>ID</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Ürün</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Miktar</th>
              <
