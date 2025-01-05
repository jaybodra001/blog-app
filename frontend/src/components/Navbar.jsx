import React from 'react';
import { useAuthStore } from '../store/authUser';

const Navbar = () => {

  const { user } = useAuthStore();
  
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">

      <h1 className="cursor-pointer text-3xl font-bold font-mono">{"{{"} MyBlogs {"}}"}</h1>
      
      {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button> */}
      <div className='mr-8'>
        Welcome, {user.username}
       
      </div>
    </div>
  );
};

export default Navbar;
