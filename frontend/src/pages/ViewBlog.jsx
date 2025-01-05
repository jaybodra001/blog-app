import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authUser";

const ViewBlog = () => {
  const { blogs, getUserBlogs, isFetchingBlogs } = useAuthStore();

  useEffect(() => {
    const fetchBlogs = async () => {
      await getUserBlogs();
    };

    fetchBlogs();
  }, [getUserBlogs]);


  const publishedBlogs = blogs.filter((blog) => blog.isPublished);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
        {isFetchingBlogs ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading tasks...</td>
            </tr>
        ) : publishedBlogs.length > 0 ? (publishedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-6"
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {blog.title}
              </h1>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto rounded-lg mb-6"
              />
              <div className="text-lg text-gray-700 mb-6">
                <p>{blog.content}</p>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <p>By {blog.author.username}</p>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            ))
          ) : (
              <tr>
                  <td colSpan="6" className="text-center py-4">No blogs available.</td>
              </tr>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewBlog;
