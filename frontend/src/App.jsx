import { useEffect } from 'react';
import './index.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/authUser';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AddBlog from './pages/AddBlog';
import ManageBlog from './pages/ManageBlog';
import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log('user is here',user)

  useEffect(() => {
		authCheck();
	}, [authCheck]);

  return (
    <>
       <Routes>
       <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/add-blog' element={<AddBlog/>} />
        <Route path='/manage-blogs' element={<ManageBlog/>} />
        <Route path='/view-blogs' element={<ViewBlog />} />
        <Route path='/edit-blog' element={<EditBlog />} />
      </Routes>
    </>
  )
}

export default App
