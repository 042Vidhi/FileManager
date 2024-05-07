import React, { useEffect, useState } from 'react';
import useDateFormat from '../hooks/useDateFormat';
import { storage ,BUCKET_ID } from '../utils/appwrite/config';


const FileCard = ({ fileData }) => {

  const [fileurl , setFileUrl] = useState('');
  
  useEffect(() => {

    const fetchFileContent = async () => {
      try {
        // Get file content from Appwrite storage
        const result = await storage.getFileView(BUCKET_ID, fileData.$id); 
        setFileUrl(result.href); 
 
        console.log("File view in show file",result)
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    fetchFileContent();
  }, []);


  console.log("File data",fileData)
  const openFileInNewTab = () => {
    window.open(fileurl, '_blank');
  };
  const fileName = fileData.name;
  const uploadDate = useDateFormat(fileData.$createdAt)

  return (
    <div
      className="bg-gray-800 text-white shadow-md rounded-md border-2 border-slate-300 p-4 cursor-pointer mx-4"
      onClick={openFileInNewTab}
    >
      <div className="mb-2"><kbd>File Name: {fileName}</kbd></div>
      <div className="mb-2 text-sm"><kbd>Uploaded on: {uploadDate}</kbd></div>
    </div>
  );
};

export default FileCard;
