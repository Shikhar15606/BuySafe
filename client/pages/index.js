import React from 'react';
import Link from 'next/link';

export default () => (
  <div>
    <h1>Home</h1>
    <p>Landing Page</p>
    {/* <div>
      <Link href='/dapp'>
        <a>My Dapp</a>
      </Link>
    </div>
    <div>
      <Link href='/accounts'>
        <a>My Accounts</a>
      </Link>
    </div> */}
    <div>
      <Link href='/product/1'>
        <a>Product Detail Page</a>
      </Link>
    </div>
    <div>
      <Link href='/product/new'>
        <a>Form to create a new Product</a>
      </Link>
    </div>
    <div>
      <Link href='/brand/new'>
        <a>Form to create a new Brand</a>
      </Link>
    </div>
    <div>
      <Link href='/brand/'>
        <a>List all the brands on this page</a>
      </Link>
    </div>
  </div>
);
