export default function IK() {
  const employees = [
    { id 1, name 'Ali Veli', position 'Şef' },
    { id 2, name 'Ayşe Yılmaz', position 'Garson' },
    { id 3, name 'Mehmet Kaya', position 'Kasiyer' }
  ];

  return (
    div style={{ padding 24, fontFamily 'Arial, sans-serif' }}
      h2İK Yönetimih2
      ul
        {employees.map(e = (
          li key={e.id}{e.name} — {e.position}li
        ))}
      ul
    div
  );
}
