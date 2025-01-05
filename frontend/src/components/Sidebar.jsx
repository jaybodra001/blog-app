import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { useAuthStore } from '../store/authUser';

const Sidebar = () => {

  const { logout } = useAuthStore();
  return (
    <div className="bg-slate-600 w-60 text-white">
      <ul className="space-y-1">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-blog"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Add Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage-blogs"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Manage Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-blogs"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Publish Blogs
          </NavLink>
        </li>
        <li
          className="p-4 text-center cursor-pointer bg-gray-500 hover:bg-gray-700"
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
