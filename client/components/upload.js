import axios from 'axios';
import { useState } from 'react';
const Upload = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='xyz' type='file' onChange={handleFileSelect} />
      <input name='xyz' type='submit' value='Upload File' />
    </form>
  );
};

export default Upload;
