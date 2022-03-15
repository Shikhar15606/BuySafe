import VerifiedItem from './verifiedItem';
import DetailItem from './detailItem';
import { useState } from 'react';

const ProductCard = props => {
  const [newPrice, setNewPrice] = useState();
  return (
    <div>
      <div class='p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <h5 class='mb-4 text-xl font-medium text-gray-500 dark:text-gray-400'>
          Token #1
        </h5>
        <ul role='list' class='my-7 space-y-5'>
          <VerifiedItem
            isVerified={true}
            msg={true ? 'Verified Manufacturer' : 'Unverified Manufacturer'}
          />
          <VerifiedItem
            isVerified={props.forSale}
            msg={
              props.forSale ? 'Available for Sale' : 'Not Available for sale'
            }
          />
        </ul>
        <div class='flow-root'>
          <ul role='list' class='divide-y divide-gray-200 dark:divide-gray-700'>
            <DetailItem field={'Brand'} value={'Nike'} />
            <DetailItem field={'Model'} value={props.model} />
            <DetailItem
              field={'Mfg Date'}
              value={new Date(parseInt(props.mfg)).toDateString()}
            />
            <DetailItem field={'Price'} value={props.price + ' Wei'} />
            <DetailItem field={'MRP'} value={props.mrp + ' Wei'} />
          </ul>
        </div>
        {props.isOwner ? (
          <>
            <input
              type='number'
              name='price'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              placeholder='New Price'
              required
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
            />
            <button
              type='button'
              class='mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
              onClick={e => {
                e.preventDefault();
                props.setPrice(newPrice);
              }}
            >
              Set Price
            </button>
            {props.forSale ? (
              <button
                type='button'
                class='mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
                onClick={e => {
                  e.preventDefault();
                  props.setSale(false);
                }}
              >
                Close for sale
              </button>
            ) : (
              <button
                type='button'
                class='mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
                onClick={e => {
                  e.preventDefault();
                  props.setSale(true);
                }}
              >
                Open for sale
              </button>
            )}
          </>
        ) : (
          props.forSale && (
            <button
              type='button'
              class='mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
              onClick={props.buy}
            >
              Buy
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductCard;
