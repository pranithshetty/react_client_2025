import React, { useEffect, useState } from 'react';

function Pagination() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const MAX_ITEMS = 10;
  const totalPages = Math.ceil(products.length / MAX_ITEMS);
  const start = currentPage * MAX_ITEMS;
  const end = start + MAX_ITEMS;
  async function fetchProducts() {
    const response = await fetch(`https://dummyjson.com/products?limit=0`);
    const data = await response.json();
    console.log('@@', data.products);
    setProducts(data.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {[...Array(totalPages).keys()].map((num) => {
          return (
            <div>
              <button
                style={{
                  backgroundColor: currentPage === num ? 'cyan' : '',
                }}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {products.slice(start, end).map((product) => {
          return (
            <div
              style={{ display: 'flex', flexDirection: 'column' }}
              key={product.id}
            >
              <img
                style={{ height: '10rem', width: '10rem' }}
                src={product.thumbnail}
                alt={product.title}
              />
              <span>{product.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;
