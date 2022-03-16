import axios from 'axios';
import { useState } from 'react';
import { UploadIcon } from '@heroicons/react/solid';

const Upload = props => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState();

  const handleUpload = async event => {
    event.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('selectedFile', selectedFile);
    try {
      const response = await axios({
        method: 'post',
        url: '/api/upload/',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      props.setUrl(response.data.url);
      setUploading(false);
    } catch (error) {
      console.log(error);
      props.setMsg(error.message);
      setUploading(false);
    }
  };

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div class='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
        {!uploading && !props.url && (
          <div class='space-y-1 text-center'>
            <svg
              class='mx-auto h-12 w-12 text-gray-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'
            >
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            <div class='flex text-sm text-gray-600'>
              <label
                for='file-upload'
                class='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
              >
                <span>Choose Logo</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  class='sr-only'
                  accept='image/*'
                  onChange={handleFileSelect}
                />
              </label>
              <p class='pl-1'>or drag and drop</p>
            </div>
            <p class='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        {uploading && (
          <svg
            role='status'
            class='inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        )}
        {props.url && (
          <img
            src={props.url}
            alt='Picture of the author'
            className='h-64 w-64 object-scale-down'
          />
        )}
      </div>
      {!uploading && !props.url && (
        <button
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
            <UploadIcon
              className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
              aria-hidden='true'
            />
          </span>
          Upload
        </button>
      )}
    </>
  );
};

export default Upload;
