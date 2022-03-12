const Message = ({ msg }) => {
  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {msg}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Message;
