const BrandCard = props => {
  console.log(
    props.brandDetail.reports,
    process.env.REPORT_LIMIT,
    typeof props.brandDetail.reports,
    typeof process.env.REPORT_LIMIT
  );
  return (
    <div class='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <img class='rounded-t-lg' src={props.brandDetail.logo} alt='' />
      <div class='p-5'>
        <div className='flex flex-1 items-center justify-start'>
          <h5 class='mr-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {props.brandDetail.brandName}
          </h5>
          {parseInt(props.brandDetail.reports) <
          parseInt(process.env.REPORT_LIMIT) ? (
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
        <a
          href='#'
          class='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Report
          <svg
            class='ml-2 -mr-1 w-4 h-4'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BrandCard;
