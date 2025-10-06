import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function DepoRapor() {
  const [history, setHistory] = useState([
    { id: 1, name: 'Ürün A', type: 'Giriş', quantity: 10, date: '2025-10-01', target: '' },
    { id: 2, name: 'Ürün B', type: 'Çıkış', quantity: 5, date: '2025-10-02', target: 'Restaurant 1' }
  ]);

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(history);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DepoRapor');
    XLSX.writeFile(wb, 'DepoRapor.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Depo Raporu', 14, 20);

    const tableData = history.map(h => [h.id, h.name, h.type, h.quantity, h.date, h.target || '']);
    doc.autoTable({
      head: [['ID', 'Ürün', 'Tip', 'Miktar', 'Tarih', 'Hedef']],
      body: tableData,
      startY: 28
    });

    doc.save('DepoRapor.pdf');
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Raporlama</h2>

      <div style={{ marginBottom: 16 }}>
        <button style={buttonStyle} onClick={exportExcel}>Excel Olarak İndir</button>
        <button style={buttonStyle} onClick={exportPDF}>PDF Olarak İndir</button>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>ID</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Ürün</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Tip</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Miktar</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Tarih</th>
              <th style={{ padding: 8, border: '1px solid #cbd5e1' }}>Hedef</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{h.id}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{h.name}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{h.type}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{h.quantity}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{h.date}</td>
                <td style={{ padding: 8, border: '1px solid #cbd5e1' }}>{h.target || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
