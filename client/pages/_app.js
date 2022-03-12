import '../styles/globals.css';
import getWeb3 from '../lib/getWeb3';
import getContract from '../lib/getContract';
import contractDefinition from '../../build/contracts/Market.json';
import { useState, useEffect, useCallback } from 'react';
import Loading from '../components/loading';
import Message from '../components/message';

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const setWeb3State = useCallback(async () => {
    setLoading(true);
    try {
      const tempweb3 = await getWeb3();
      const tempAccounts = await tempweb3.eth.getAccounts();
      const tempContract = await getContract(tempweb3, contractDefinition);
      console.log(tempweb3);
      console.log(tempAccounts);
      console.log(tempContract);
      setWeb3(tempweb3);
      setAccounts(tempAccounts);
      setContract(tempContract);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMsg(error.message);
    }
  }, []);

  useEffect(setWeb3State, []);

  const newProps = { ...pageProps, web3, accounts, contract };
  if (loading) return <Loading />;
  if (msg)
    return (
      <Message msg='Failed to load web3, accounts, or contract. Check console for details.' />
    );
  return web3 && accounts && accounts.length > 0 && contract ? (
    <Component {...newProps} />
  ) : (
    <Message msg='Connect accounts with metamask' />
  );
}

export default MyApp;
