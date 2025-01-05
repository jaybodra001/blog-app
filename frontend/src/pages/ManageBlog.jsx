import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authUser";
import toast from "react-hot-toast"; // For showing notifications

const ManageBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const { getUserBlogs, blogs: fetchedBlogs, isFetchingBlogs, deleteBlog, updateBlogStatus, updateBlog } = useAuthStore();
    const [editingBlog, setEditingBlog] = useState(null); // State to hold the blog being edited

    useEffect(() => {
        getUserBlogs();
    }, [getUserBlogs]);

    useEffect(() => {
        if (!isFetchingBlogs && fetchedBlogs) {
            setBlogs(fetchedBlogs);
        }
    }, [fetchedBlogs, isFetchingBlogs]);

    const handleDelete = async (blogId) => {
        try {
            await deleteBlog(blogId); 
            setBlogs(blogs.filter(blog => blog._id !== blogId)); 
        } catch (error) {
            toast.error("Failed to delete the blog");
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog); 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          await updateBlog(editingBlog._id, editingBlog) 
          setBlogs(blogs.map(blog => blog._id === editingBlog._id ? editingBlog : blog))
          setEditingBlog(null); 
        } catch (error) {
            toast.error("Failed to update the blog");
        }
    };

    let i = 1;
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4 font-semibold">Manage Blogs</h2>

                        {/* Table to display blogs */}
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Title</th>
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Is Published</th>
                                    <th className="px-4 py-2 text-left">Created At</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {isFetchingBlogs ? (
                                  <tr>
                                      <td colSpan="6" className="text-center py-4">Loading tasks...</td>
                                  </tr>
                              ) : blogs.length > 0 ? (
                                  blogs.map((blog) => (
                                      <tr key={blog._id} className="border-b">
                                          <td className="px-4 py-2">{i++}</td>
                                          <td className="px-4 py-2">{blog.title}</td>
                                          <td className="px-4 py-2">
                                              <img
                                                  src={blog.imageUrl}
                                                  alt={blog.title}
                                                  className="w-44 h-34 object-cover rounded-md"
                                              />
                                          </td>
                                          <td className="px-4 py-2">
                                              <button
                                                  className={`px-4 py-2 rounded-md ${
                                                      blog.isPublished ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                  }`}
                                                  onClick={() => {
                                                      const newStatus = !blog.isPublished;
                                                      updateBlogStatus(blog._id, newStatus);
                                                  }}
                                              >
                                                  {blog.isPublished ? "Yes" : "No"}
                                              </button>
                                          </td>
                                          <td className="px-4 py-2">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                          <td className="px-4 py-2">
                                              <button
                                                  onClick={() => handleEdit(blog)}
                                                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                                              >
                                                  Edit
                                              </button>
                                              <button
                                                  onClick={() => handleDelete(blog._id)}
                                                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                              >
                                                  Delete
                                              </button>
                                          </td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr>
                                      <td colSpan="6" className="text-center py-4">No blogs available.</td>
                                  </tr>
                              )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Edit Modal (conditionally render if editingBlog is set) */}
            {editingBlog && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl mb-4">Edit Blog</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={editingBlog.title}
                                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={editingBlog.content}
                                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                                    required
                                    rows="6"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    id="image"
                                    name="imageUrl"
                                    value={editingBlog.imageUrl}
                                    onChange={(e) => setEditingBlog({ ...editingBlog, imageUrl: e.target.value })}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Update Blog
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingBlog(null)} // Close the modal
                                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlog;
