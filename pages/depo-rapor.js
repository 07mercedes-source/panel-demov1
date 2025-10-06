import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DepoRapor() {
  const router = useRouter();
  const [records, setRecords] = useState([
    // Örnek veriler (normalde teslim/çıkış işlemlerinden gelecek)
    { type: 'Giriş', id: '1', quantity: 10, date: '06.10.2025 14:30', note: 'Teslim Alma' },
    { type: 'Çıkış', id: '1', quantity: 4, date: '06.10.2025 15:00', note: 'Restaurant 1' },
    { type: 'Giriş', id: '2', quantity: 20, date: '05.10.2025 10:20', note: 'Teslim Alma' }
  ]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const buttonStyle = {
    marginRight: '10px',
    padding: '8px 14px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const filteredRecords = records.filter((rec) => {
    if (!startDate && !endDate) return true;
    const recordDate = new Date(rec.date.split(' ')[0].split('.').reverse().join('-'));
    const s = startDate ? new Date(startDate) : null;
    const e = endDate ? new Date(endDate) : null;
    if (s && recordDate < s) return false;
    if (e && recordDate > e) return false;
    return true;
  });

  const exportToExcel = async () => {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(filteredRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DepoRapor');
    XLSX.writeFile(wb, 'DepoRapor.xlsx');
  };

  const exportToPDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Depo Raporu', 14, 20);

    const tableData = filteredRecords.map(r => [r.type, r.id, r.quantity, r.date, r.note]);

    autoTable(doc, {
      head: [['Tür', 'Ürün ID', 'Miktar', 'Tarih', 'Not']],
      body: tableData,
      startY: 30
    });

    doc.save('DepoRapor.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📊 Depo Raporu</h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '5px' }}>Başlangıç:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ marginRight: '15px' }} />

        <label style={{ marginRight: '5px' }}>Bitiş:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ marginRight: '15px' }} />

        <button onClick={exportToExcel} style={buttonStyle}>Excel Çıktısı</button>
        <button onClick={exportToPDF} style={{ ...buttonStyle, backgroundColor: '#15803d' }}>PDF Çıktısı</button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#64748b' }}
          onClick={() => router.push('/depo')}
        >
          Geri Dön
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>Tür</th>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>Ürün ID</th>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>Miktar</th>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>Tarih</th>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>Not</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>Kayıt bulunamadı.</td>
            </tr>
          ) : (
            filteredRecords.map((r, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #ccc', padding: '6px' }}>{r.type}</td>
                <td style={{ border: '1px solid #ccc', padding: '6px' }}>{r.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '6px' }}>{r.quantity}</td>
                <td style={{ border: '1px solid #ccc', padding: '6px' }}>{r.date}</td>
                <td style={{ border: '1px solid #ccc', padding: '6px' }}>{r.note}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
