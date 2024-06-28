import React, { useState } from 'react';

const ExcelData = () => {
  const [file, setFile] = useState(null);

  return (
    <div>
      <h1>Import Excel Data</h1>
     
        <input type="file" onChange={onFileChange} accept=".xlsx, .xls" required />
        <button type="submit">Upload</button>
      
    </div>
  );
};

export default ExcelData;
