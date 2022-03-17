import React from 'react';
import BrandCard from '../../components/brandCard';
import getServerContract from '../../lib/getServerContract';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import Message from '../../components/message';

function BrandPage(props) {
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [props]);

  if (loading) return <Loading />;
  if (msg) return <Message msg={msg} />;
  return (
    <div>
      <h1>Brands List Page</h1>
      <p>list all brands here</p>
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
  );
}
export async function getStaticProps() {
  // now fetch all brands data and pass it as props
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
}

export default BrandPage;
