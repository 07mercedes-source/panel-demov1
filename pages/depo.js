import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Depo() {
  const router = useRouter();
  const [products, setProducts] = useState([
    { id: 1, name: 'Domates', quantity: 50, cost: 10 },
    { id: 2, name: 'Peynir', quantity: 20, cost: 25 },
    { id: 3, name: 'Ekmek', quantity: 100, cost: 5 },
  ]);
  const [isAdmin, setIsAdmin] = useState(true); // Giriş sisteminden alırsın normalde
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', cost: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.cost) return;
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, ...newProduct, quantity: Number(newProduct.quantity), cost: Number(newProduct.cost) }]);
    setNewProduct({ name: '', quantity: '', cost: '' });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, quantity: product.quantity, cost: product.cost });
  };

  const saveEdit = () => {
    setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...newProduct, quantity: Number(newProduct.quantity), cost: Number(newProduct.cost) } : p)));
    setEditingProduct(null);
    setNewProduct({ name: '', quantity: '', cost: '' });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', quantity: '', cost: '' });
  };

  const buttonStyle = {
    marginRight: '10px',
    padding: '8px 14px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thtd = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📦 Depo Yönetimi</h1>

      <div style={{ marginBottom: '20px' }}>
        <button style={buttonStyle} onClick={() => router.push('/depo-teslim')}>
          📝 Teslim Alma
        </button>
        <button style={buttonStyle} onClick={() => router.push('/depo-cikis')}>
          🚚 Ürün Çıkışı
        </button>
      </div>

      {isAdmin && (
        <div style={{ marginBottom: '20px', backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '8px' }}>
          <h3>{editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Ürün adı"
            value={newProduct.name}
            onChange={handleInputChange}
            style={{ marginRight: '8px', padding: '5px' }}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Miktar"
            value={newProduct.quantity}
            onChange={handleInputChange}
            style={{ marginRight: '8px', padding: '5px', width: '90px' }}
          />
          <input
            type="number"
            name="cost"
            placeholder="€ Maliyet"
            value={newProduct.cost}
            onChange={handleInputChange}
            style={{ marginRight: '8px', padding: '5px', width: '100px' }}
          />
          {editingProduct ? (
            <>
              <button style={buttonStyle} onClick={saveEdit}>Kaydet</button>
              <button style={{ ...buttonStyle, backgroundColor: '#64748b' }} onClick={cancelEdit}>İptal</button>
            </>
          ) : (
            <button style={buttonStyle} onClick={addProduct}>Ekle</button>
          )}
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thtd}>ID</th>
            <th style={thtd}>Ürün Adı</th>
            <th style={thtd}>Miktar</th>
            <th style={thtd}>€ Maliyet</th>
            {isAdmin && <th style={thtd}>İşlemler</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={thtd}>{p.id}</td>
              <td style={thtd}>{p.name}</td>
              <td style={thtd}>{p.quantity}</td>
              <td style={thtd}>{p.cost.toFixed(2)}</td>
              {isAdmin && (
                <td style={thtd}>
                  <button style={{ ...buttonStyle, backgroundColor: '#0ea5e9' }} onClick={() => startEdit(p)}>Düzenle</button>
                  <button style={{ ...buttonStyle, backgroundColor: '#dc2626' }} onClick={() => deleteProduct(p.id)}>Sil</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
