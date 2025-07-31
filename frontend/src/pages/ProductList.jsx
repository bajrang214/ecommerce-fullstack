import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="grid">
        {products.map((product) => (
          <Link className="card" key={product.id} to={`/products/${product.id}`}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
