import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DepartmentFilter from '../components/DepartmentFilter';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    const url = departmentId
      ? `http://localhost:5000/api/departments/${departmentId}/products`
      : `http://localhost:5000/api/products`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const list = departmentId ? data.products : data;
        setProducts(list);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [departmentId]);

  return (
    <div>
      <DepartmentFilter onSelect={setDepartmentId} />

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', width: '200px' }}>
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Department:</strong> {product.department}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
