import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FileCard from '../../components/FileCard';
import { storage, BUCKET_ID } from '../../utils/appwrite/config';

const YourFiles = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch files from Appwrite
    storage
      .listFiles(BUCKET_ID)
      .then(response => {
        setFiles(response.files);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching files from Appwrite:', error));
  }, []);

  useEffect(() => {
    // Filter files based on search query
    const filtered = files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredFiles(filtered);
  }, [searchQuery, files]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className='min-h-screen bg-gray-900'>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl px-4 font-bold text-white mb-4">Your Files</h1>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Search file names..."
              className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <p className="text-white px-3">Loading...</p>
          ) : filteredFiles.length === 0 ? (
            <p className="text-white px-3">No files found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map(file => (
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
