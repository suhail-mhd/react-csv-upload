import React, { useState } from 'react';

const FileUpload = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid .csv file.');
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError('No file selected.');
      return;
    }
    onSubmit(file);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block mb-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Send File
      </button>
    </div>
  );
};

export default FileUpload;
