import { useState, useCallback, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Message from '../../components/message';
import Loading from '../../components/loading';
import Upload from '../../components/upload';
import Head from 'next/head';

function NewBrandPage(props) {
  const [brandName, setBrandName] = useState('');
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState();
  const [btnEnabled, setBtnEnabled] = useState(true);

  let metamaskConnected = false;
  if (props.accounts && props.accounts.length > 0) {
    metamaskConnected = true;
  }

  const createNewBrand = useCallback(async () => {
    try {
      setLoading(true);
      const { accounts, contract } = props;
      console.log(accounts);
      await contract.methods
        .createBrand(brandName, url)
        .send({ from: accounts[0] });
      setMsg('Brand Successfully Created');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setMsg(err.message);
      setLoading(false);
    }
  }, [brandName, url, props]);

  const checkAccount = useCallback(async () => {
    try {
      const { accounts, contract } = props;
      const res = await contract.methods.brands(accounts[0]).call();
      console.log('res', res);
      if (res.brandName != '') {
        setBtnEnabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setBtnEnabled, metamaskConnected]);

  useEffect(() => {
    if (metamaskConnected) checkAccount();
  }, [checkAccount]);

  if (loading) return <Loading />;
  if (msg) return <Message msg={msg} />;
  return (
    <>
      <Head>
        <title>Create New Brand</title>
        <meta name='description' content='Create a new brand on Buysafe'></meta>
      </Head>
      <div className='flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='/logo.svg'
              alt='BuySafe'
            />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Create your own Brand
            </h2>
            <p className='font-medium mt-2 text-center text-sm text-indigo-600'>
              The brand name must be unique, and you can own only one brand{' '}
            </p>
          </div>
          <div className='mt-8 space-y-9'>
            <div className='rounded-md shadow-sm space-y-1'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Brand Name
                </label>
                <input
                  name='brand'
                  type='text'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter Brand Name'
                  value={brandName}
                  onChange={e => {
                    setBrandName(e.target.value);
                  }}
                />
              </div>
            </div>
            <Upload setUrl={setUrl} url={url} setMsg={setMsg} />
            <div>
              {btnEnabled ? (
                <button
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={createNewBrand}
                  disabled={!url || !(brandName.length > 0)}
                >
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <PlusCircleIcon
                      className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                      aria-hidden='true'
                    />
                  </span>
                  Create
                </button>
              ) : (
                <button
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  disabled={true}
                >
                  Brand already created
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewBrandPage;
