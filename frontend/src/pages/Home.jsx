import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/authUser"; // Assuming you're using a store for dynamic data

const Home = () => {
  const { blogs, getUserBlogs } = useAuthStore();
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [activeBlogs, setActiveBlogs] = useState(0);
  const [inactiveBlogs, setInactiveBlogs] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      await getUserBlogs();
    };

    fetchBlogs();
  }, [getUserBlogs]);

  useEffect(() => {
    if (blogs.length > 0) {
      setTotalBlogs(blogs.length);
      setActiveBlogs(blogs.filter((blog) => blog.isPublished).length);
      setInactiveBlogs(blogs.filter((blog) => !blog.isPublished).length);
    }
  }, [blogs]);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="w-1/4 bg-gray-100 p-4" />

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4 font-semibold">Dashboard</h2>

              {/* Dashboard Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Blogs */}
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold">Total Blogs</h3>
                  <div className="flex justify-center items-center mt-2">
                    <p className="text-4xl font-bold">{totalBlogs}</p>
                  </div>
                </div>

                {/* Active Blogs */}
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold">Active Blogs</h3>
                  <div className="flex justify-center items-center mt-2">
                    <p className="text-4xl font-bold">{activeBlogs}</p>
                  </div>
                </div>

                {/* Inactive Blogs */}
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold">Inactive Blogs</h3>
                  <div className="flex justify-center items-center mt-2">
                    <p className="text-4xl font-bold">{inactiveBlogs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
