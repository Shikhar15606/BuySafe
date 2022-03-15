import VerifiedItem from './verifiedItem';
import DetailItem from './detailItem';

const ProductCard = () => {
  return (
    <div>
      <div class='p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <h5 class='mb-4 text-xl font-medium text-gray-500 dark:text-gray-400'>
          Token #1
        </h5>
        <ul role='list' class='my-7 space-y-5'>
          <VerifiedItem isVerified={true} msg={'Verified Manufacturer'} />
          <VerifiedItem isVerified={false} msg={'Not for sale'} />
        </ul>
        <div class='flow-root'>
          <ul role='list' class='divide-y divide-gray-200 dark:divide-gray-700'>
            <DetailItem field={'Model'} value={'Air Jordans'} />
            <li class='py-3 sm:py-4'>
              <div class='flex items-center space-x-4'>
                <div class='flex-1 min-w-0'>
                  <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                    Manufacturer
                  </p>
                </div>
                <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  Nike
                </div>
              </div>
            </li>
            <li class='py-3 sm:py-4'>
              <div class='flex items-center space-x-4'>
                <div class='flex-1 min-w-0'>
                  <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                    Model
                  </p>
                </div>
                <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  Air Jordans
                </div>
              </div>
            </li>
            <li class='py-3 sm:py-4'>
              <div class='flex items-center space-x-4'>
                <div class='flex-1 min-w-0'>
                  <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                    Mfg Date
                  </p>
                </div>
                <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  27 Jan 2019
                </div>
              </div>
            </li>
            <li class='py-3 sm:py-4'>
              <div class='flex items-center space-x-4'>
                <div class='flex-1 min-w-0'>
                  <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                    Price
                  </p>
                </div>
                <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  320 Wei
                </div>
              </div>
            </li>
            <li class='py-3 sm:py-4'>
              <div class='flex items-center space-x-4'>
                <div class='flex-1 min-w-0'>
                  <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                    MRP
                  </p>
                </div>
                <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  3200 Wei
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button
          type='button'
          class='mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
