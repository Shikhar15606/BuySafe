import { useState, useCallback } from 'react';
import Message from '../../components/message';
import Loading from '../../components/loading';
import QRCode from 'qrcode.react';
import {
  PlusCircleIcon,
  DocumentDownloadIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import CalendarComponent from '../../components/calendar';
import Link from 'next/link';

function NewProductPage(props) {
  const [model, setModel] = useState('');
  const [mfg, setMfg] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [productId, setProductId] = useState();

  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const createNewProduct = useCallback(async () => {
    try {
      setLoading(true);
      const { accounts, contract } = props;
      console.log(mfg, model, price, mrp);
      const res = await contract.methods
        .createProduct(new Date(mfg).getTime(), model, price, mrp)
        .send({ from: accounts[0] });
      console.log(res);
      console.log(res.events.ProductCreated.returnValues._productId);
      setProductId(res.events.ProductCreated.returnValues._productId);
      setMsg('Product Successfully Created');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setMsg(err.message);
      setLoading(false);
    }
  }, [mfg, model, price, mrp]);

  const downloadQR = useCallback(() => {
    const canvas = document.getElementById(
      `${process.env.NEXT_PUBLIC_APP_URL}/product/${productId}`
    );
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `BuySafe_Product_${productId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, [productId]);

  if (loading) return <Loading />;
  if (productId)
    return (
      <>
        <Message msg={msg} />
        <div className='flex items-start justify-center pb-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-8'>
            <div className='flex flex-1 justify-center'>
              <QRCode
                id={`${process.env.NEXT_PUBLIC_APP_URL}/product/${productId}`}
                value={`/product/${productId}`}
                size={290}
                level={'H'}
                includeMargin={true}
              />
            </div>
            <Link href={`/product/${productId}`}>
              <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LinkIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                See Details
              </button>
            </Link>

            <button
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={downloadQR}
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <DocumentDownloadIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
              Download
            </button>
          </div>
        </div>
      </>
    );
  if (msg) return <Message msg={msg} />;
  return (
    <>
      <div className='flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='/logo.svg'
              alt='BuySafe'
            />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Mint New Product Tokens
            </h2>
            <p className='font-medium mt-2 text-center text-sm text-indigo-600'>
              You must have a brand before creating product tokens{' '}
            </p>
          </div>
          <form className='mt-8 space-y-9'>
            <div className='rounded-md shadow-sm space-y-1'>
              <div>
                <label className='sr-only'>Brand Name</label>
                <input
                  name='model'
                  type='text'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter Model Name'
                  value={model}
                  onChange={e => {
                    setModel(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className='sr-only'>Current Price</label>
                <input
                  name='price'
                  type='number'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter Price in Wei'
                  value={price}
                  onChange={e => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className='sr-only'>MRP</label>
                <input
                  name='mrp'
                  type='number'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter MRP in Wei'
                  value={mrp}
                  onChange={e => {
                    setMrp(e.target.value);
                  }}
                />
              </div>
              <div>
                <p className='font-medium my-2 text-center text-sm text-indigo-600'>
                  Select Manufacturing Date{' '}
                </p>
                <CalendarComponent
                  onChange={val => {
                    setMfg(val);
                  }}
                />
              </div>
              <div>
                <button
                  className='group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={e => {
                    e.preventDefault();
                    createNewProduct();
                  }}
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
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProductPage;
