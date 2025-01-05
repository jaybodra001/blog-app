import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

// Sample data (you can replace this with an API call to fetch blogs)
const sampleBlogs = [
  {
    id: "1",
    title: "Blog Post 1",
    content: "This is the content of blog post 1.",
    image: "https://via.placeholder.com/150",
    isPublished: true,
    createdAt: "2025-01-05T12:00:00Z",
  },
  {
    id: "2",
    title: "Blog Post 2",
    content: "This is the content of blog post 2.",
    image: "https://via.placeholder.com/150",
    isPublished: false,
    createdAt: "2025-01-04T12:00:00Z",
  },
];

const ManageBlog = () => {
  const [blogs, setBlogs] = useState(sampleBlogs);

  useEffect(() => {
    // Fetch blogs from an API or database if needed
    // Example: fetchBlogs();
  }, []);

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
                  <th className="px-4 py-2 text-left">Content</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Is Published</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b">
                    <td className="px-4 py-2">{blog.id}</td>
                    <td className="px-4 py-2">{blog.title}</td>
                    <td className="px-4 py-2">{blog.content.slice(0, 50)}...</td>
                    <td className="px-4 py-2">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {blog.isPublished ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2">{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      {/* Add action buttons like Edit, Delete */}
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageBlog;
