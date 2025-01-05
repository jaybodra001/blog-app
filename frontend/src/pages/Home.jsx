import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Home = () => {
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
                  <p className="text-2xl mt-2">100</p>
                  <Link
                    to="/blogs"
                    className="text-sm underline mt-4 inline-block"
                  >
                    View all blogs
                  </Link>
                </div>

                {/* Active Blogs */}
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold">Active Blogs</h3>
                  <p className="text-2xl mt-2">80</p>
                  <Link
                    to="/blogs/active"
                    className="text-sm underline mt-4 inline-block"
                  >
                    View active blogs
                  </Link>
                </div>

                {/* Inactive Blogs */}
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold">Inactive Blogs</h3>
                  <p className="text-2xl mt-2">20</p>
                  <Link
                    to="/blogs/inactive"
                    className="text-sm underline mt-4 inline-block"
                  >
                    View inactive blogs
                  </Link>
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
