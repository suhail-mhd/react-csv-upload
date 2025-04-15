import React from 'react';

const StatusIndicator = ({ loading, results }) => {
  if (loading) {
    return <p className="text-blue-500 mt-4">Processing file...</p>;
  }

  if (results) {
    return <p className="text-green-500 mt-4">File processed successfully!</p>;
  }

  return null;
};

export default StatusIndicator;
