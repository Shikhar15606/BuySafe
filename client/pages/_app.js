import '../styles/globals.css';
import getWeb3 from '../lib/getWeb3';
import getContract from '../lib/getContract';
import contractDefinition from '../../build/contracts/Market.json';
import { useState, useEffect, useCallback } from 'react';
import Loading from '../components/loading';
import Message from '../components/message';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  const [newProps, setNewProps] = useState(pageProps);
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
      setNewProps(oldProps => ({
        ...oldProps,
        web3: tempweb3,
        accounts: tempAccounts,
        contract: tempContract,
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMsg(error.message);
    }
  }, [setLoading, setMsg, setNewProps]);

  useEffect(setWeb3State, [setWeb3State]);

  if (loading) return <Loading />;
  if (msg)
    return (
      <Message msg='Failed to load web3, accounts, or contract. Check console for details.' />
    );
  return newProps.web3 &&
    newProps.accounts &&
    newProps.accounts.length > 0 &&
    newProps.contract ? (
    <>
      <Navbar />
      <Component {...newProps} />
    </>
  ) : (
    <>
      <Navbar />
      <Message msg='Connect accounts with metamask' />
    </>
  );
}

export default MyApp;
