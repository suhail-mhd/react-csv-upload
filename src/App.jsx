import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import StatusIndicator from './components/StatusIndicator';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileSubmit = async (file) => {
    setLoading(true);
    setResults(null);

    setTimeout(() => {
      const mockResponse = {
        updated: 15,
        notUpdated: 5,
        errors: [
          { line: 2, message: 'Invalid email format' },
          { line: 8, message: 'Missing required field' },
        ],
      };
      setResults(mockResponse);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">CSV File Uploader</h1>
      <div className="max-w-3xl mx-auto">
        <FileUpload onSubmit={handleFileSubmit} />
        <StatusIndicator loading={loading} results={results} />
      </div>
    </div>
  );
};

export default App;
