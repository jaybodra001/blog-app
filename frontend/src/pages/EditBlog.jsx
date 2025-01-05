import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const EditBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Simulate fetching blog data (replace this with actual API call)
  useEffect(() => {
    // Simulate an API call to fetch blog data by ID
    const fetchBlog = async () => {
      setLoading(true);
      // Here, replace with an actual API call
      const blogData = {
        title: "Example Blog Title",
        content: "This is an example content of the blog.",
        image: "https://via.placeholder.com/1200x600",
      };
      setBlog(blogData);
      setLoading(false);
    };

    fetchBlog();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., API call to update the blog)
    console.log("Blog updated:", blog);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h2>

            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Content Input */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={blog.content}
                  onChange={handleChange}
                  rows="6"
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Image Input */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EditBlog;
