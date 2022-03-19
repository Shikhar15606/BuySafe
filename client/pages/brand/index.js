import React from 'react';
import BrandCard from '../../components/brandCard';
import getServerContract from '../../lib/getServerContract';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import Message from '../../components/message';
import Head from 'next/head';

function BrandPage(props) {
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [props]);

  if (loading) return <Loading />;
  if (msg) return <Message msg={msg} />;
  return (
    <>
      <Head>
        <title>Brands</title>
        <meta
          name='description'
          content='All the brands registered on Buysafe'
        ></meta>
      </Head>
      <div className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='lg:text-center'>
            <h2 className='text-base text-indigo-600 font-semibold tracking-wide uppercase'>
              Power Decentralized
            </h2>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Every Vote Counts
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              You can report the brand if you felt it's product was not genuine.
            </p>
          </div>
          <div className='flex flex-1 flex-wrap items-center justify-evenly gap-4'>
            {props.brandList.map(brandDetail => (
              <BrandCard
                accounts={props.accounts}
                contract={props.contract}
                brandDetail={brandDetail}
                msg={msg}
                setMsg={setMsg}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  // now fetch all brands data and pass it as props
  try {
    const contract = await getServerContract();
    const brandCount = await contract.methods.getBrandsLength().call();
    console.log(brandCount);

    let brandList = [];
    for (let i = 0; i < brandCount; i++) {
      let brandOwner = await contract.methods.brandOwners(i).call();
      let brandDetails = await contract.methods.brands(brandOwner).call();
      brandList.push({ ...brandDetails, brandOwner });
    }
    console.log(brandList);
    return {
      props: { brandList },
      revalidate: 1,
    };
  } catch (err) {
    console.log('Error at build, I cant do much about it : ', err);
    return {
      props: { brandList: [] },
      revalidate: 1,
    };
  }
}

export default BrandPage;
