import React, { useState, useRef, useEffect } from 'react';
import useWordCount from '../hooks/useWordCount';

const FileContent = ({ fileContent }) => {
  const [searchText, setSearchText] = useState('');
  const [searchIndex, setSearchIndex] = useState(0);
  const [searchHistory,setSearchHistory] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl + Shift + F to focus on search input
      if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchIndex]);

  const AddHistory =()=>{
    setSearchHistory([...searchHistory, searchText]);
  }

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    setSearchIndex(0); // Reset search index when text changes
  };

  const handleNextClick = () => {
    const index = fileContent.indexOf(searchText, searchIndex + 1);
    const firstindex = fileContent.indexOf(searchText)
    setSearchIndex(index === -1 ? firstindex : index);
  };

  const handlePreviousClick = () => {

    const index = fileContent.lastIndexOf(searchText, searchIndex - 1);
    const lastindex = fileContent.lastIndexOf(searchText,fileContent.length)
    setSearchIndex(index=== -1? lastindex : index );
  };

  // Highlight search text in file content
  const highlightedContent = fileContent.replace(
    new RegExp(searchText, 'gi'),
    (match, index) => {
      if (index === searchIndex) {
        return `<span class="bg-green-400">${match}</span>`;
      } else {
        return `<span class="bg-yellow-400">${match}</span>`;
      }
    }
  );

  // Count total occurrences
  let totalCount = 0;
  if (searchText !== '') {
    totalCount = fileContent.split(searchText).length - 1;
  }

  const count = useWordCount(fileContent)

  return (
    <div className='bg-gray-900 min-h-screen'>
    {
      fileContent ? (
        <div className='bg-gray-900 text-white '>
        <div className='text-end pr-4 pt-4'>Total Words:{count}</div>
        <div className='flex justify-end items-center  p-4 flex-wrap gap-2'>
          <input
            type='text'
            placeholder='Search Text (Ctrl+Shift+F)'
            className='border rounded px-2 py-1 bg-gray-700'
            value={searchText}
            onChange={handleSearchTextChange}
            ref={searchInputRef}
          />
          <div className='border rounded px-2 py-1 bg-gray-700 text-white'
          onClick={AddHistory}
          >Save
          </div>
          <div className='text-white'>
            Total Occurrence {totalCount}
          </div>
          <div className='flex space-x-2'>
            <button
              className='border rounded px-2 py-1 bg-gray-700 text-white'
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button
              className='border rounded px-2 py-1 bg-gray-700 text-white'
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
        <pre
          className='text-wrap p-4'
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        ></pre>
      </div>

      ):(
      <div className='bg-gray-900 text-white flex justify-center items-center min-h-screen w-full'>
        <div className='text-2xl font-[600]'>
        OOPS :&lt; No Recent File
        </div>
      </div>
      )
    }
      
    </div>
  );
};

export default FileContent;
