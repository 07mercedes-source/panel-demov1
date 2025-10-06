export default function Restoran() {
  const expenses = [
    { id:1, type:'Kira', amount: 5000 },
    { id:2, type:'Elektrik', amount: 800 },
    { id:3, type:'Personel', amount: 12000 }
  ];

  return (
    <div style={{ padding:24, fontFamily: 'Arial, sans-serif' }}>
      <h2>Restoran Yönetimi</h2>
      <table style={{ width:'100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th style={{ borderBottom: '1px solid #ddd' }}>Gider</th><th style={{ borderBottom: '1px solid #ddd' }}>Tutar</th></tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td style={{ padding:8 }}>{e.type}</td>
              <td style={{ padding:8 }}>{e.amount} TL</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
