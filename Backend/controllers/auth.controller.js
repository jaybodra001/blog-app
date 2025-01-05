  import { User } from "../models/user.model.js"
  import {Blog} from '../models/blog.model.js';
  import bcryptjs from "bcryptjs";
  import { generateTokenAndSetCookie } from "../utils/generateToken.js"
  import multer from 'multer';
  const upload = multer({ dest: 'uploads/' });

  export async function signup(req,res) {
      try{
          const {email,password,username} = req.body

          if(!email || !password || !username){
              return res.status(400).json({success:false,message:"All fields are reuired!!!"})
          }

          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/
          if(!emailRegex.test(email)){
              return res.status(400).json({success:false,message:"Invalid email address!!!"})
          }

          if(password.length < 6){
              return res.status(400).json({success:false,message:"Password must be at least 6"})
          }

          const existingUserByEmail = await User.findOne({ email: email });
          if(existingUserByEmail){
              return res.status(400).json({success:false,message:"Email already exists!!!"})
          }

          const existingUserByUsername = await User.findOne({username:username})
          if(existingUserByUsername){
              return res.status(400).json({success:false,message:"Username already exists!!!"})
          }

          const salt = await bcryptjs.genSalt(10)
          const hashedPassword = await bcryptjs.hash(password, salt)


          const newUser = new User({
              email,
              password: hashedPassword,
              username,
          })
          generateTokenAndSetCookie(newUser._id, res)
          
          await newUser.save()
          
          res.status(201).json({success:true,message:"User created successfully!!!"})
          

      }catch(e){
          console.log("Error in SignUp controller:"+e.message)
          res.status(500).json({success:false,message:"Internal server error!!!"})


      }
  }

  export async function login(req,res) {
      try{
          const {email,password} = req.body
          const existingUserByEmail = await User.findOne({ email: email });
          if(!existingUserByEmail){   
              return res.status(400).json({success:false,message:"Email does not exist!!!"})
          }
          const isValidPassword = await bcryptjs.compare(password, existingUserByEmail.password)
          if(!isValidPassword){
              return res.status(400).json({success:false,message:"Invalid password!!!"})
          }
          generateTokenAndSetCookie(existingUserByEmail._id,res)

          res.status(200).json({success:true,message:"Login successful!!!"})
      }catch(e){
          console.log("Error in Login controller:"+e.message)
          res.status(500).json({success:false,message:"Internal server error!!!"})
      }


  }

  export async function logout(req,res) {
      
      try{
          res.clearCookie("jwt-blog")
          res.status(200).json({success:true,message:"Logged out successfully!!!"})
      }catch(e){
          console.log("Error in Logout controller:"+e.message)
          res.status(500).json({success:false,message:"Internal server error!!!"})
      }


  }

  export async function authCheck(req, res) {
    try {
      console.log("req.user:", req.user);
      res.status(200).json({ success: true, user: req.user });
    } catch (error) {
      console.log("Error in authCheck controller", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  export async function createBlog(req, res) {
    try {
      const { title, content, imageUrl } = req.body;
  
      
      if (!title || !content || !imageUrl) {
        return res.status(400).json({ success: false, message: "Title, content, and image url are required! ",title, content, imageUrl});
      }
  
      const newBlog = new Blog({
        title,
        content,
        imageUrl, // Save the file path in the database
        author: req.user._id,
      });
  
      await newBlog.save();
  
      res.status(201).json({ success: true, message: "Blog created successfully!", blog: newBlog });
    } catch (error) {
      console.log("Error in createBlog controller:", error.message);
      res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
  
  

  //user own blog....
  export async function getUserBlogs(req, res) {
      try {
        const userId = req.user._id;
    
        const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    
        res.status(200).json({ success: true, blogs });
      } catch (error) {
        console.log("Error in getUserBlogs controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error!" });
      }
    }

  // Update a blog
  export async function updateBlog(req, res) {
      try {
        const { id } = req.params;
        const { title, content, imageUrl } = req.body;
    
        const blog = await Blog.findById(id);
    
        if (!blog) {
          return res.status(404).json({ success: false, message: "Blog not found!" });
        }
    
        // Ensure only the author can update the blog
        if (blog.author.toString() !== req.user._id.toString()) {
          return res.status(403).json({ success: false, message: "You are not authorized to update this blog!" });
        }
    
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.imageUrl = imageUrl || blog.imageUrl;
        blog.updatedAt = new Date();
    
        await blog.save();
    
        res.status(200).json({ success: true, message: "Blog updated successfully!", blog });
      } catch (error) {
        console.log("Error in updateBlog controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error!" });
      }
    }
    
    // Delete a blog
    export async function deleteBlog(req, res) {
      try {
        const { id } = req.params;
    
        const blog = await Blog.findById(id);
          
        if (!blog) {
          return res.status(404).json({ success: false, message: "Blog not found!" });
        }
    
        // Ensure only the author can delete the blog
        if (blog.author.toString() !== req.user._id.toString()) {
          return res.status(403).json({ success: false, message: "You are not authorized to delete this blog!" });
        }
    
        await Blog.deleteOne({ _id: id });
    
        res.status(200).json({ success: true, message: "Blog deleted successfully!" });
      } catch (error) {
        console.log("Error in deleteBlog controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error!" });
      }
    }


export async function updateBlogStatus(req, res) {
  try {
    const { id } = req.params;
    const { isPublished } = req.body; 
    
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found!" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this blog!" });
    }

    blog.isPublished = isPublished;
    blog.updatedAt = new Date();

    await blog.save();

    res.status(200).json({ success: true, message: `Blog ${isPublished ? "published" : "unpublished"} successfully!`, blog });
  } catch (error) {
    console.log("Error in updateBlogStatus controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}
