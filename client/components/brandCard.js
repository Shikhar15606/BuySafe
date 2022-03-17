import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

const BrandCard = props => {
  const router = useRouter();

  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, []);

  const reportHandler = useCallback(async () => {
    try {
      props.setLoading(true);
      const { accounts, contract } = props;
      await contract.methods
        .reportBrand(props.brandDetail.brandOwner)
        .send({ from: accounts[0] });
      refreshData();
    } catch (err) {
      console.log(err);
      props.setMsg(err.message);
      props.setLoading(false);
    }
  }, []);

  return (
    <div class='bg-white rounded-lg border border-gray-200 shadow-md w-80 m-4'>
      <img class='rounded-t-lg' src={props.brandDetail.logo} alt='' />
      <div class='p-5'>
        <div className='flex flex-1 items-center justify-start'>
          <h5 class='mr-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {props.brandDetail.brandName}
          </h5>
          {parseInt(props.brandDetail.reports) <
          parseInt(process.env.NEXT_PUBLIC_REPORT_LIMIT) ? (
            <svg
              class='flex-shrink-0 w-5 h-5 text-green-600'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clip-rule='evenodd'
              ></path>
            </svg>
          ) : (
            <svg
              class='flex-shrink-0 w-5 h-5 text-red-500'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clip-rule='evenodd'
              ></path>
            </svg>
          )}
        </div>
        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {`Reported by ${props.brandDetail.reports} People`}
        </p>
        <button
          onClick={reportHandler}
          class='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Report
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='ml-2 -mr-1 w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            stroke-width='2'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BrandCard;
