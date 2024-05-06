import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FileCard from '../../components/FileCard';
import { storage ,BUCKET_ID} from '../../utils/appwrite/config'

const YourFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch files from Appwrite
    storage.listFiles(
      BUCKET_ID
    )
      .then(response => {
        setFiles(response.files); 
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching files from Appwrite:', error));
  }, []);

  console.log("files from appwrite servers",files)

  return (
    <div>
      <Navbar />
      <div className='min-h-screen bg-gray-900'>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl px-4 font-bold text-white mb-4">Your Files</h1>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : files.length === 0 ? (
            <p className="text-white">No files found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map(file => (
                <FileCard key={file.$id} fileData={file} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YourFiles;
