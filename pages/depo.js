import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Depo() {
  const [products] = useState([
    { id: 1, name: 'Ürün A', quantity: 50, cost: 10, price: 15, expiry: '2025-12-31' },
    { id: 2, name: 'Ürün B', quantity: 20, cost: 5, price: 8, expiry: '2025-11-30' }
  ]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Depo');
    XLSX.writeFile(wb, 'depo.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Depo Listesi', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['ID','Ürün','Miktar','Maliyet','Satış','Son Kullanma']],
      body: products.map(p => [p.id, p.name, p.quantity, p.cost, p.price, p.expiry])
    });
    doc.save('depo.pdf');
  };

  const printTable = () => {
    const printContent = document.getElementById('depo-table').outerHTML;
    const newWin = window.open('', '', 'width=800,height=600');
    newWin.document.write('<html><head><title>Depo Listesi</title></head><body>');
    newWin.document.write(printContent);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Depo Modülü</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={exportExcel}>Excel</button>
        <button onClick={exportPDF} style={{ marginLeft: 8 }}>PDF</button>
        <button onClick={printTable} style={{ marginLeft: 8 }}>Yazdır</button>
      </div>
      <table id="depo-table" border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
  );
}
