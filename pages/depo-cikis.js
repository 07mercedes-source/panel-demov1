import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DepoCikis() {
  const router = useRouter();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [restaurant, setRestaurant] = useState('');
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

  // Basit irsaliye numarası üretici
  const generateInvoiceNo = () => {
    return 'IRS' + Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !quantity || !restaurant) return;
    const newEntry = {
      id: productId,
      quantity: Number(quantity),
      restaurant,
      invoiceNo: generateInvoiceNo(),
      date: new Date().toLocaleString('de-DE')
    };
    setLog([...log, newEntry]);
    setProductId('');
    setQuantity('');
    setRestaurant('');
  };

  const handlePrintInvoice = (entry) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Sevk İrsaliyesi ${entry.invoiceNo}</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            .footer { margin-top: 40px; text-align: right; }
          </style>
        </head>
        <body>
          <h1>🚚 Sevk İrsaliyesi</h1>
          <p><strong>İrsaliye No:</strong> ${entry.invoiceNo}</p>
          <p><strong>Tarih:</strong> ${entry.date}</p>
          <p><strong>Gönderilen Yer:</strong> ${entry.restaurant}</p>

          <table>
            <thead>
              <tr>
                <th>Ürün ID</th>
                <th>Miktar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${entry.id}</td>
                <td>${entry.quantity}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>İmza / Kaşe ________________________</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📦 Depo Çıkışı</h1>

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
        <select
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          style={{ marginRight: '8px', padding: '5px' }}
        >
          <option value="">Restaurant Seç</option>
          <option value="Restaurant 1">Restaurant 1</option>
          <option value="Restaurant 2">Restaurant 2</option>
        </select>

        <button style={buttonStyle} type="submit">Çıkış Kaydet</button>
        <button
          type="button"
          style={{ ...buttonStyle, backgroundColor: '#64748b' }}
          onClick={() => router.push('/depo')}
        >
          Geri Dön
        </button>
      </form>

      <div className="card" style={{ marginTop: '20px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
        <h3>📋 Çıkış Kayıtları</h3>
        {log.length === 0 ? (
          <p>Henüz çıkış kaydı yok.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>İrsaliye No</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Ürün ID</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Miktar</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Restaurant</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Tarih</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.invoiceNo}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.quantity}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.restaurant}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{entry.date}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>
                    <button
                      style={{ padding: '4px 8px', backgroundColor: '#15803d', color: '#fff', border: 'none', borderRadius: '4px' }}
                      onClick={() => handlePrintInvoice(entry)}
                    >
                      İrsaliye Yazdır
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
