import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
    isAddingBlog:false,
    isFetchingBlogs: false,
    blogs: [],
    isUpdateBlog: false,

	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/v1/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged in successfully");
			return true
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
	},
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try { 
			const response = await axios.get("/api/v1/auth/authCheck")

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
		}
	},  

    addBlog: async (blogDetails) => {
        set({ isAddingBlog: true });
        try {
          const response = await axios.post("/api/v1/auth/add-blog", blogDetails);
      
          toast.success("Blog added successfully");
          set({ isAddingBlog: false });
          return response.data.blog; // Return blog data if needed
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to add blog");
          set({ isAddingBlog: false });
        }
      },

      getUserBlogs: async () => {
        set({ isFetchingBlogs: true });
        try {
          const response = await axios.post("/api/v1/auth/blogs");
          set({ blogs: response.data.blogs, isFetchingBlogs: false });
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch blogs");
          set({ isFetchingBlogs: false });
        }
      },


      deleteBlog: async (blogId) => {
        try {
            await axios.delete(`/api/v1/auth/blog/${blogId}`);
            set((state) => ({
                blogs: state.blogs.filter((blog) => blog._id !== blogId),
            }));
            toast.success("Blog deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete blog");
        }
    },


    updateBlogStatus: async (blogId, newStatus) => {
        try {
            const response = await axios.put(`/api/v1/auth/status-blog/${blogId}`, { isPublished: newStatus });
            set((state) => ({
                blogs: state.blogs.map((blog) =>
                    blog._id === blogId ? { ...blog, isPublished: newStatus } : blog
                ),
            }));
            toast.success(`Blog ${newStatus ? "published" : "unpublished"} successfully`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update blog status");
        }
    },

    updateBlog: async (taskId, updatedTask) => {
        set({ isUpdateBlog: true });
        try {
          const response = await axios.put(`/api/v1/auth/blog/${taskId}`, updatedTask); 
          set({ isUpdateBlog: false, tasks: response.data.tasks }); 
          toast.success("Blog updated successfully");
        } catch (error) {
          toast.error(error.response.data.message || "Blog update failed");
          set({ isUpdateBlog: false });
        }
      },    
    
}));