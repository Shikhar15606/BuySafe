import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import getServerContract from '../../lib/getServerContract';
import ProductCard from '../../components/productCard';
import Loading from '../../components/loading';
import Message from '../../components/message';
import TimeLine from '../../components/timeline';
import Head from 'next/head';

function ProductDetailPage(props) {
  const router = useRouter();
  if (router.isFallback) return <Loading />;
  if (props.errorStatus === 404)
    return <ErrorPage statusCode={props.errorStatus} />;
  const productId = router.query.productId;
  let isOwner = false,
    metamaskConnected = false;

  if (props.accounts && props.accounts.length > 0) {
    isOwner = props.accounts[0] == props.owner;
    metamaskConnected = true;
  }

  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const refreshData = useCallback(() => {
    console.log('refreshing data');
    router.replace(router.asPath);
  }, []);

  useEffect(() => {
    console.log('Props arrived', props);
    console.log('Props changed loding false');
    setLoading(false);
  }, [props]);

  const setPrice = useCallback(
    async newPrice => {
      try {
        setLoading(true);
        const { accounts, contract } = props;
        await contract.methods
          .setPrice(productId, newPrice)
          .call({ from: accounts[0] });
        await contract.methods
          .setPrice(productId, newPrice)
          .send({ from: accounts[0] });
        refreshData();
      } catch (err) {
        let str = 'Some Error Occured';
        const startIndex = err.message.search(':');
        const endIndex = err.message.search(',');
        if (endIndex >= 0 && startIndex < endIndex && startIndex >= 0) {
          str = err.message.substring(startIndex + 3, endIndex - 1);
        }
        setMsg(str);
        setLoading(false);
      }
    },
    [props]
  );

  const setSale = useCallback(
    async flag => {
      try {
        setLoading(true);
        const { accounts, contract } = props;
        if (flag) {
          await contract.methods
            .openForSale(productId)
            .call({ from: accounts[0] });
          await contract.methods
            .openForSale(productId)
            .send({ from: accounts[0] });
        } else {
          await contract.methods
            .closeForSale(productId)
            .call({ from: accounts[0] });
          await contract.methods
            .closeForSale(productId)
            .send({ from: accounts[0] });
        }

        refreshData();
      } catch (err) {
        let str = 'Some Error Occured';
        const startIndex = err.message.search(':');
        const endIndex = err.message.search(',');
        if (endIndex >= 0 && startIndex < endIndex && startIndex >= 0) {
          str = err.message.substring(startIndex + 3, endIndex - 1);
        }
        setMsg(str);
        setLoading(false);
      }
    },
    [props]
  );

  const buy = useCallback(async () => {
    try {
      setLoading(true);
      const { accounts, contract } = props;
      await contract.methods
        .buyProduct(productId)
        .call({ from: accounts[0], value: props.price });
      await contract.methods
        .buyProduct(productId)
        .send({ from: accounts[0], value: props.price });
      refreshData();
    } catch (err) {
      let str = 'Some Error Occured';
      const startIndex = err.message.search(':');
      const endIndex = err.message.search(',');
      if (endIndex >= 0 && startIndex < endIndex && startIndex >= 0) {
        str = err.message.substring(startIndex + 3, endIndex - 1);
      }
      setMsg(str);
      setLoading(false);
    }
  }, [props]);

  if (loading) return <Loading />;
  if (msg) return <Message msg={msg} />;
  return (
    <div>
      <Head>
        <title>{`Token ${productId} `}</title>
        <meta
          name='description'
          content={`Details of Token ${productId}`}
        ></meta>
      </Head>
      <div className='flex flex-1 flex-wrap justify-start items-start md:mx-14 md:pt-8'>
        <ProductCard
          isOwner={isOwner}
          manufacturer={props.manufacturer}
          model={props.model}
          mfg={props.mfg}
          price={props.price}
          mrp={props.mrp}
          forSale={props.forSale}
          brandName={props.brandName}
          reports={props.reports}
          setPrice={newPrice => {
            setPrice(newPrice);
          }}
          setSale={flag => {
            setSale(flag);
          }}
          buy={buy}
          productId={productId}
          metamaskConnected={metamaskConnected}
        />
        <div className='m-4 p-4 overflow-hidden flex-grow'>
          <h2 className='my-6 mx-6 text-3xl font-extrabold text-gray-900 text-left'>
            TimeLine
          </h2>
          <TimeLine history={props.history} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    console.log('In get static paths');
    const contract = await getServerContract();
    const res = await contract.methods.productCount().call();
    console.log(res);
    let paths = [];
    for (let i = 0; i < parseInt(res); i++) {
      paths.push({
        params: { productId: i.toString() },
      });
    }
    return { paths, fallback: true };
  } catch (err) {
    console.log('Error at build, I cant do much about it : ', err);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps(context) {
  try {
    console.log('In get static props');
    const productId = context.params.productId;
    // now fetch all product data and pass it as props
    const contract = await getServerContract();
    const productDetails = await contract.methods.products(productId).call();
    console.log('Product Details : ', productDetails);
    const owner = await contract.methods.productToOwner(productId).call();
    console.log('Product Owner : ', owner);
    let brandDetails = await contract.methods
      .brands(productDetails.manufacturer)
      .call();
    console.log(brandDetails);
    // now fectching transaction details
    let history = [];
    const createEvents = await contract.getPastEvents('ProductCreated', {
      filter: { _productId: productId },
      fromBlock: 0,
      toBlock: 'latest',
    });
    const manufactureEvent = createEvents[0];
    history.push({ ...manufactureEvent.returnValues });
    const buyEvents = await contract.getPastEvents('buySuccess', {
      filter: { _productId: productId },
      fromBlock: 0,
      toBlock: 'latest',
    });
    console.log('Create Events : ', createEvents);
    console.log('Buy Events : ', buyEvents);
    buyEvents.forEach(buyEvent => {
      history.push({ ...buyEvent.returnValues });
    });
    return {
      props: { ...productDetails, owner, ...brandDetails, history },
      revalidate: 1,
    };
  } catch (err) {
    console.log('Error at build, I cant do much about it : ', err);
    return {
      props: { errorStatus: 404 },
      revalidate: 1,
    };
  }
}

export default ProductDetailPage;
