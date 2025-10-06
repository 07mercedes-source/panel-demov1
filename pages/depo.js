import { useState } from 'react';

export default function Depo() {
  const [products] = useState([
    { id: 1, name: 'Ürün A', quantity: 50, cost: 10, price: 15, expiry: '2025-12-31' },
    { id: 2, name: 'Ürün B', quantity: 20, cost: 5, price: 8, expiry: '2025-11-30' }
  ]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Modülü</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün</th>
              <th>Miktar</th>
              <th>Maliyet</th>
              <th>Satış</th>
              <th>Son Kullanma</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.cost}</td>
                <td>{p.price}</td>
                <td>{p.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
