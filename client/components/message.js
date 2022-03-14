const Message = ({ msg }) => {
  return (
    <div className='flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-12 w-auto' src='/logo.svg' alt='Workflow' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {msg}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Message;
