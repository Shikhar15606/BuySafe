import { useState, useCallback } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Message from '../../components/message';
import Loading from '../../components/loading';
import Upload from '../../components/upload';

function NewBrandPage(props) {
  const [brandName, setBrandName] = useState('');
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState();
  console.log('PROPS IN NEW BRAND', props);
  const createNewBrand = useCallback(async () => {
    console.log('Use callback props : ', props);
    try {
      console.log('Use callback props : ', props);
      console.log('Use callback props : ', brandName);
      console.log('Use callback props : ', url);

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
  if (loading) return <Loading />;
  if (msg) return <Message msg={msg} />;
  return (
    <div className='flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-12 w-auto' src='/logo.svg' alt='BuySafe' />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBrandPage;
