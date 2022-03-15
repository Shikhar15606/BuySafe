import React from 'react';
import { useRouter } from 'next/router';
import getServerContract from '../../lib/getServerContract';
import ProductCard from '../../components/productCard';

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

      <ProductCard />
      <ol class='relative border-l border-gray-200 dark:border-gray-700'>
        <li class='mb-10 ml-4'>
          <div class='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
          <time class='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
            February 2022
          </time>
          <h3 class='text-lg font-semibold text-gray-900 dark:text-white'>
            Application UI code in Tailwind CSS
          </h3>
          <p class='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </p>
          <a
            href='#'
            class='inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Learn more{' '}
            <svg
              class='ml-2 w-3 h-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </a>
        </li>
      </ol>
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
