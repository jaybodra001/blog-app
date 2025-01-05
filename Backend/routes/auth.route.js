import express from 'express'
import {  authCheck, createBlog, deleteBlog, getUserBlogs, login, logout, signup, updateBlog } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protechRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)    
router.post("/logout", logout)
router.get("/authCheck", protectRoute, authCheck)
router.post("/add-blog",protectRoute, createBlog)
router.post("/blogs",protectRoute, getUserBlogs)
router.put("/blog/:id",protectRoute, updateBlog)
router.delete("/blog/:id",protectRoute, deleteBlog)


export default router;

