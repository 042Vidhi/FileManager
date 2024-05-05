import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [fileContent, setFileContent] = useState('');
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content); 
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-center text-slate-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-6">This is a demo text for the home page.</p>
        <label htmlFor="upload" className="block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Upload
          <input id="upload" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        {fileContent && (
          <div>
            <div className='text-blue-500 cursor-pointer' onClick={() => {navigate("/file/recent", { state:fileContent});}}>View File</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
