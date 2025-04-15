import React, { useState } from "react";
import Papa from "papaparse";

const CsvUploader = () => {
  const [csvData, setCsvData] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const simulateApiRequest = () => {
    if (!csvData) {
      alert("Please upload a file first!");
      return;
    }

    setTimeout(() => {
      const mockResponse = csvData.map((row, index) => {
        const randomOutcome = Math.random();
        if (randomOutcome > 0.8) {
          return { line: index + 2, status: "error", message: "Invalid phone number" };
        } else if (randomOutcome > 0.6) {
          return { line: index + 2, status: "not_updated" };
        } else {
          return { line: index + 2, status: "updated" };
        }
      });

      const structuredResults = {
        updated: mockResponse.filter((item) => item.status === "updated").length,
        notUpdated: mockResponse.filter((item) => item.status === "not_updated").length,
        errors: mockResponse.filter((item) => item.status === "error"),
      };

      setResult(structuredResults);
    }, 1000);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">CSV File Uploader</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />
      <button
        onClick={simulateApiRequest}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send File
      </button>
      {result && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold">Results</h2>
          <p>✅ Updated Records: {result.updated}</p>
          <p>❌ Not Updated Records: {result.notUpdated}</p>
          {result.errors.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mt-2">⚠️ Errors:</h3>
              <ul className="list-disc ml-6">
                {result.errors.map((err, idx) => (
                  <li key={idx}>
                    Line {err.line}: {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
