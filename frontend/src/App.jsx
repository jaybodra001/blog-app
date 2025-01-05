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
        <Route path='/' element={user ? <Home /> : <Navigate to ={"/login"} />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to={"/"}/>} />
        <Route path='/signup' element={!user ? <Register /> : <Navigate to ={"/"} />} />
        <Route path='/add-blog' element={user ? <AddBlog /> : <Navigate to ={"/login"} />} />
        <Route path='/manage-blogs'  element={user ? <ManageBlog /> : <Navigate to ={"/login"} />} />
        <Route path='/view-blogs' element={user ? <ViewBlog /> : <Navigate to ={"/login"} />}  />
        <Route path='/edit-blog' element={user ? <EditBlog /> : <Navigate to ={"/login"} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
