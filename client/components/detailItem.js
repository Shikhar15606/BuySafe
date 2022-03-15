const DetailItem = props => {
  return (
    <li class='py-3 sm:py-4'>
      <div class='flex items-center space-x-4'>
        <div class='flex-1 min-w-0'>
          <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
            {props.field}
          </p>
        </div>
        <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
          {props.value}
        </div>
      </div>
    </li>
  );
};

export default DetailItem;
