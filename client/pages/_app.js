import '../styles/globals.css';
import getWeb3 from '../lib/getWeb3';
import getContract from '../lib/getContract';
import contractDefinition from '../../build/contracts/Market.json';
import { useState, useEffect, useCallback } from 'react';
import Loading from '../components/loading';

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();

  const setWeb3State = useCallback(async () => {
    try {
      const temp = await getWeb3();
      setWeb3(temp);
      setAccounts(await temp.eth.getAccounts());
      setContract(await getContract(temp, contractDefinition));
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }, []);

  useEffect(setWeb3State, []);

  const newProps = { ...pageProps, web3, accounts, contract };
  return web3 && accounts && contract ? (
    <Component {...newProps} />
  ) : (
    <Loading />
  );
}

export default MyApp;
