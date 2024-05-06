import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {storage,BUCKET_ID ,ID} from '../../utils/appwrite/config'


const Home = () => {
  const [uploadfile,setUploadFile] = useState()
  const [fileContent, setFileContent] = useState('');
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setUploadFile(file);
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content); 
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    try {
      // Upload the file to Appwrite storage
      const result = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        uploadfile
      );
      console.log(result)
    } catch (error) {
      console.error('Error uploading file to Appwrite:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-center text-slate-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to <kbd>File.io</kbd></h1>
        <p className="text-lg mb-6">Upload your files</p>
        <label htmlFor="upload" className="block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Upload
          <input id="upload" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        {fileContent && (
          <div>
            <div className='text-blue-500 cursor-pointer mt-4' onClick={() => {navigate("/file/recent", { state:fileContent}, { replace: true });}}>View File</div>
            <div className='cursor-pointer bg-green-500 hover:bg-green-600  my-4 py-2 px-4 rounded' onClick={handleUpload}>Upload to servers</div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
