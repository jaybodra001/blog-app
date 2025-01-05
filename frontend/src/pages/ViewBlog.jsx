import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const ViewBlog = () => {
  const blog = {
    title: "Amazing Blog Post",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: "https://via.placeholder.com/1200x600",
    author: "John Doe",
    createdAt: "2025-01-05T12:00:00Z",
    isPublished: true,
  };

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
            {/* Blog Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {/* Blog Content */}
            <div className="text-lg text-gray-700 mb-6">
              <p>{blog.content}</p>
            </div>

            {/* Author and Date */}
            <div className="flex justify-between items-center text-gray-500 text-sm">
              <p>By {blog.author}</p>
              <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Publish Status */}
            <div className="mt-4">
              <span
                className={`inline-block px-4 py-2 text-white text-sm rounded-full ${
                  blog.isPublished ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {blog.isPublished ? "Published" : "Unpublished"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewBlog;
