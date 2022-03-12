import React from 'react';
import { useRouter } from 'next/router';
import getServerContract from '../../lib/getServerContract';

function ProductDetailPage(props) {
  const router = useRouter();
  const productId = router.query.productId;

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Get the detailed product data based on the id of product</p>
      <p>The manufacturer of this product is {props.manufacturer}</p>
      <p>The model of this product is {props.model}</p>
      <p>
        The mfg of this product is{' '}
        {new Date(parseInt(props.mfg)).toLocaleDateString()}
      </p>
      <p>The price of this product is {props.price} weis</p>
      <p>The mrp of this product is {props.mrp} weis</p>
      <p>The product is forSale {props.forSale ? 'True' : 'False'}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const contract = await getServerContract();
  const res = await contract.methods.productCount().call();
  console.log(res);
  let paths = [];
  for (let i = 0; i < res; i++) {
    paths.push({
      params: { productId: i.toString() },
    });
  }
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  // now fetch all product data and pass it as props
  const contract = await getServerContract();
  const res = await contract.methods.products(productId).call();
  console.log(res);

  return {
    props: { ...res },
    revalidate: 1,
  };
}

export default ProductDetailPage;
