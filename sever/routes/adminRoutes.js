const express = require('express');
const router = express.Router();
const {Admin, Course} = require("../db/models");
const {authenticateJwt} = require("../middleware/auth");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

  
router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin) {
        res.status(403).json({message : 'Admin already exists'});
    }else{
        const newAdmin = new Admin({username : username, password: password});
        newAdmin.save();
        const token = jwt.sign({username : username, role: 'admin'}, SECRET, {expiresIn : '1h'});
        res.status(200).json({message : 'Admin created successfully', token, status : 200});
    }
});

  
router.post('/login', async (req, res) => {
    const {username, password} = req.headers;
    const admin = await Admin.findOne({username: username, password: password});
    if(admin){
      const token = jwt.sign({username: username, role : 'admin'}, SECRET, {expiresIn : '1h'});
      res.status(200).json({message: 'Logged in successfully', token, status : "200"});
    }else{
      res.status(403).json({message : 'Invalid username or password'});
    }
});

  
router.get('/me', authenticateJwt, async(req, res) => {
    res.json({username : req.user.username});
});

  
router.post('/addcourses', authenticateJwt, async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(200).json({message : 'Cousre created successfully', courseId : newCourse.id});
});


router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course){
    res.status(200).json({course});
  }else{
    res.status(404).json({message : 'Course not found'});
  }
});

  
router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if(course){
      course.set(req.body);
      await course.save();
      res.status(200).json({message : 'Course updated successfully'});
    }else{
      res.status(404).json({message : 'Course not found'});
    }
});
  
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.status(200).json({courses});
});
  
module.exports = router;