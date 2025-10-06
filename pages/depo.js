import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Depo({ userName }) {
  const router = useRouter();

  const [products, setProducts] = useState([
    { id: 1, name: 'Ürün A', quantity: 50, cost: 10, price: 15, expiry: '2025-12-31' },
    { id: 2, name: 'Ürün B', quantity: 20, cost: 5, price: 8, expiry: '2025-11-30' }
  ]);

  const isAdmin = userName === 'Ali Veli';

  // Ürün ekleme
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

  // Ürün düzenleme
  const editProduct = (id) => {
    const product = products.find(p => p.id === id);
    if(!product) return;
    const name = prompt('Ürün adı:', product.name);
    const quantity = parseInt(prompt('Miktar:', product.quantity), 10);
    const cost = parseFloat(prompt('Maliyet (€):', product.cost));
    const price = parseFloat(prompt('Satış (€):', product.price));
    const expiry = prompt('Son kullanma tarihi (YYYY-MM-DD):', product.expiry);
    setProducts(products.map(p => p.id === id ? { id, name, quantity, cost, price, expiry } : p));
  };

  // Ürün silme
  const deleteProduct = (id) => {
    if(confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };
  const deleteStyle = { ...buttonStyle, backgroundColor: '#ef4444' };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Modülü</h2>
      
      {isAdmin && <button style={buttonStyle} onClick={addProduct}>Yeni Ürün Ekle</button>}
      <button style={buttonStyle} onClick={() => router.push('/depo-teslim')}>Teslim Alma</button>
      <butt
