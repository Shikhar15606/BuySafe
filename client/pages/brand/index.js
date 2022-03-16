import React from 'react';
import BrandCard from '../../components/brandCard';
import getServerContract from '../../lib/getServerContract';

function BrandPage(props) {
  return (
    <div>
      <h1>Brands List Page</h1>
      <p>list all brands here</p>
      {props.brandList.map(brandDetail => (
        <BrandCard brandDetail={brandDetail} />
      ))}
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
    brandList.push({ ...brandDetails });
  }
  console.log(brandList);
  return {
    props: { brandList },
    revalidate: 1,
  };
}

export default BrandPage;
