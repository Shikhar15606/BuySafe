import '../styles/globals.css';
import getWeb3 from '../lib/getWeb3';
import getContract from '../lib/getContract';
import contractDefinition from '../../build/contracts/Market.json';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  const [newProps, setNewProps] = useState({});

  console.log('Page props in app.js', pageProps);
  console.log('New props in app.js', newProps);
  const setWeb3State = useCallback(async () => {
    try {
      const tempweb3 = await getWeb3();
      const tempAccounts = await tempweb3.eth.getAccounts();
      const tempContract = await getContract(tempweb3, contractDefinition);

      // to simulate a silly user (just for development)
      // const tempweb3 = null, tempAccounts = null, tempContract = null;

      console.log(tempweb3);
      console.log(tempAccounts);
      console.log(tempContract);
      setNewProps(oldProps => ({
        ...oldProps,
        web3: tempweb3,
        accounts: tempAccounts,
        contract: tempContract,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [setNewProps]);

  useEffect(setWeb3State, [setWeb3State]);

  const mergedProps = { ...newProps, ...pageProps };
  console.log('Merger Props : ', mergedProps);
  return (
    <>
      <Navbar />
      <Component {...mergedProps} />
    </>
  );
}

export default MyApp;
