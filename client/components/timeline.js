const TimeLine = props => {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };

  console.log(props);
  return (
    <ol class='relative border-l border-gray-200 dark:border-gray-700'>
      <li class='mb-10 ml-6'>
        <span class='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='w-3 h-3 text-blue-600 dark:text-blue-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fill-rule='evenodd'
              d='M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z'
              clip-rule='evenodd'
            />
          </svg>
        </span>
        <h3 class='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
          Created by {`${props.history[0]._manufacturer}`}
        </h3>
        <time class='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          {`On ${new Date(props.history[0]._time * 1000).toLocaleDateString(
            'en-US',
            options
          )}`}
        </time>
        <p class='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'></p>
      </li>
      {props.history.map(
        (transaction, i) =>
          i > 0 && (
            <li class='mb-10 ml-6'>
              <span class='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='w-3 h-3 text-blue-600 dark:text-blue-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
              <h3 class='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
                Purchased by {`${transaction._to} at ${transaction._price} Wei`}
              </h3>
              <time class='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                {`On ${new Date(transaction._time * 1000).toLocaleDateString(
                  'en-US',
                  options
                )}`}
              </time>
            </li>
          )
      )}
    </ol>
  );
};

export default TimeLine;
