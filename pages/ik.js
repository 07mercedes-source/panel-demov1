import { useState } from 'react';

export default function IK() {
  const [employees] = useState([
    { sicil: 1, name: 'Ali Veli', address: 'Berlin', phone: '0301234567', start: '2020-01-01', end: '', salary: 3000, steuer: '1' },
    { sicil: 2, name: 'Ayşe Yılmaz', address: 'Hamburg', phone: '0407654321', start: '2021-05-10', end: '', salary: 2500, steuer: '2' }
  ]);

  const buttonStyle = { padding: '6px 12px', margin: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' };

  return (
    <div style={{ padding: 24 }}>
      <h2>İK Modülü</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Sicil No</th>
              <th>Ad Soyad</th>
              <th>Adres</th>
              <th>Telefon</th>
              <th>İşe Başlangıç</th>
              <th>Ayrılma</th>
              <th>Brüt Maaş (€)</th>
              <th>Steuerklasse</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.sicil}>
                <td>{e.sicil}</td>
                <td>{e.name}</td>
                <td>{e.address}</td>
                <td>{e.phone}</td>
                <td>{e.start}</td>
                <td>{e.end || '-'}</td>
                <td>{e.salary.toFixed(2)}</td>
                <td>{e.steuer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
