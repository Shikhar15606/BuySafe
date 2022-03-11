import React from 'react';
import { useRouter } from 'next/router';

function ProductDetailPage() {
  const router = useRouter();
  const productId = router.query.productId;
  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Get the detailed product data based on the id of product</p>
      <p>The id of this product is {productId}</p>
    </div>
  );
}

export default ProductDetailPage;
