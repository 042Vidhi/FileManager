import React from 'react';

const FileContent = ({fileContent}) => {
  return(
  <div>
  {
   fileContent ? (
       <div className='bg-gray-900 text-white min-h-screen'>
       <pre className='text-wrap'>{fileContent}</pre>
       </div>
       ):
   (<div className='bg-gray-900 text-white flex justify-center items-center min-h-screen w-full'>
   <div className='text-2xl font-[600]'>
   OOPS :&lt; No Recent File
   </div>
   </div>)
  } 
</div>
  );
}

export default FileContent;
