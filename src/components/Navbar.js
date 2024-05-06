import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <div className="">
      <div className="flex justify-between">
        <div>
         <Link to="/" className="text-blue-200 text-lg  mr-4"><kbd>File.io</kbd></Link>
        </div>
        <div>
        <Link to="/" className="text-white text-lg font-semibold mr-4">Home</Link>
        <Link to="/yourfiles" className="text-white text-lg font-semibold">Your Files</Link>
        </div>
      </div>
      <div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar