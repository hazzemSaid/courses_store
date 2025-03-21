const express = require("express");
const router = express.Router();
const Courses = require("../../models/course.model");

const {body,validationResult} = require("express-validator");
router.post("/",[body("title").isLength({min:3}),body("price").isLength({min:3})],(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    // const { title, price } = req.body;
    const newcourse=new Courses({...req.body});
    newcourse.save();
    res.json(newcourse);
  })
  module.exports = router;