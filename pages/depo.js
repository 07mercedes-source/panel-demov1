import { useState } from 'react';

export default function DepoPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Domates', quantity: 20, cost: 5 },
    { id: 2, name: 'Peynir', quantity: 10, cost: 12 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', cost: '' });

  const handleAdd = () => {
    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { id, ...newProduct, quantity: Number(newProduct.quantity), cost: Number(newProduct.cost) }]);
    setNewProduct({ name: '', quantity: '', cost: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: field === 'quantity' || field === 'cost' ? Number(value) : value } : p));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Depo Ürün Listesi</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}>ID</th>
            <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}>Ürün Adı</th>
            <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}>Miktar</th>
            <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}>Maliyet (€)</th>
            <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: 8 }}>{product.id}</td>
              <td style={{ padding: 8 }}>
                <input
                  value={product.name}
                  onChange={e => handleEdit(product.id, 'name', e.target.value)}
                />
              </td>
              <td style={{ padding: 8 }}>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={e => handleEdit(product.id, 'quantity', e.target.value)}
                  style={{ width: 60 }}
                />
              </td>
              <td style={{ padding: 8 }}>
                <input
                  type="number"
                  value={product.cost}
                  onChange={e => handleEdit(product.id, 'cost', e.target.value)}
                  style={{ width: 80 }}
                />
              </td>
              <td style={{ padding: 8 }}>
                <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 8px', border: 'none', borderRadius: 4 }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Yeni Ürün Ekle</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Ürün Adı"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Miktar"
          value={newProduct.quantity}
          onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Maliyet (€)"
          value={newProduct.cost}
          onChange={e => setNewProduct({ ...newProduct, cost: e.target.value })}
        />
        <button onClick={handleAdd} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px 8px', border: 'none', borderRadius: 4 }}>Ekle</button>
      </div>
    </div>
  );
}
