import { useEffect, useState } from 'react';

export default function DepartmentFilter({ onSelect }) {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(() => setError('Failed to load departments'));
  }, []);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>Filter by Department</h3>
      <button onClick={() => onSelect(null)}>All Products</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {departments.map(dept => (
          <li key={dept.id}>
            <button onClick={() => onSelect(dept.id)}>
              {dept.name} ({dept.productCount})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
