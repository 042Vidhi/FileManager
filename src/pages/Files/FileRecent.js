import React from 'react'
import { useLocation } from 'react-router-dom'
import FileContent from '../../components/FileContent';

const FileRecent = () => {

    const location = useLocation()
    const fileContent = location.state;
   
  return (
    <FileContent fileContent={fileContent}/>
  )
}

export default FileRecent