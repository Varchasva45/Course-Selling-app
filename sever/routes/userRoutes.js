const express = require('express');
const router = express.Router();
const {User, Course} = require("../db/models");
const {authenticateJwt} = require("../middleware/auth");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

  
router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if(user){
      res.status(403).json({message : 'User already exists'});
    }else{
      const newUser = new User({username : username, password : password});
      await newUser.save();
      const token = jwt.sign({username: username, role : 'user'}, SECRET, {expiresIn : '1h'});
      res.status(200).json({message : 'user created successfully', token, status : 200});
    }
});
  
router.post('/login', async (req, res) => {
    const {username, password} = req.headers;
    const user = await User.findOne({username : username, password: password});
    if(user){
      const token = jwt.sign({username : username, role : 'user'}, SECRET, {expiresIn : '1h'});
      res.status(200).json({message : "Logged In successfully", token});
    }else{
      res.status(403).json({message : "Invalid username or password"});
    }
});
  
router.get('/me', authenticateJwt, async(req, res) => {
    res.json({username : req.user.username});
});
  
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published : true});
    res.status(200).json({courses});
});
  
router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if(course){
      const user = await User.findOne({username: req.user.username});
      if(user){
        user.purchasedCourses.push(course);
        await user.save();
        res.status(200).json({message : "Course purchased successfully"});
      }else{
        res.status(403).json({message : "User not found"});
      }
    }else{
      res.status(404).json({message: 'Course not found'});
    }
});
  
router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

module.exports = router;
  
