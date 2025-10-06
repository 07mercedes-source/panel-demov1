import { useState } from 'react';

export default function Depo({ userName }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Ürün A', quantity: 50, cost: 10, price: 15, expiry: '2025-12-31' },
    { id: 2, name: 'Ürün B', quantity: 20, cost: 5, price: 8, expiry: '2025-11-30' }
  ]);

  const isAdmin = userName === 'Ali Veli';

  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const addProduct = () => {
    const newId = products.length + 1;
    const name = prompt('Ürün adı:');
    const quantity = parseInt(prompt('Miktar:'), 10);
    const cost = parseFloat(prompt('Maliyet (€):'));
    const price = parseFloat(prompt('Satış (€):'));
    const expiry = prompt('Son kullanma tarihi (YYYY-MM-DD):');
    if(name && !isNaN(quantity) && !isNaN(cost) && !isNaN(price)) {
      setProducts([...products, { id: newId, name, quantity, cost, price, expiry }]);
    }
  };

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };
  const deleteStyle = { ...buttonStyle, backgroundColor: '#ef4444' };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Modülü</h2>
      {isAdmin && <button style={buttonStyle} onClick={addProduct}>Yeni Ürün Ekle</button>}
      <div className="card" style={{ marginTop: 16 }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün</th>
              <th>Miktar</th>
              <th>Maliyet (€)</th>
              <th>Satış (€)</th>
              <th>Son Kullanma</th>
              {isAdmin && <th>İşlem</th>}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.cost.toFixed(2)}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>{p.expiry}</td>
                {isAdmin && <td><button style={deleteStyle} onClick={() => deleteProduct(p.id)}>Sil</button></td>}
