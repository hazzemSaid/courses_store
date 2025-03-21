const express = require("express");
const router = express.Router();
const Courses = require("../../models/course.model");

router.get("/", (req, res, next) => {
  const Allcourses = Courses.find().then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.status(500).send({massage:"error"});
  });
});
  //get single course
  router.get('/:id',(req,res,next)=>{
    console.log(req.params);
    const   Course = Courses.findById(req.params.id).then((data)=>{
      if(data)res.json(data);
      else   res.status(404).json({
        "error":"not found"
      })
    }).catch((err)=>{
      res.status(404).json({
        "error":"not found"
      })
    });
  // const course = Course.findById({id:req.params.id}).then((course)=>{
  //   res.json(course);
  // }).catch((err)=>{
  //   res.status(500).send({massage:"error"});
  // });
  // console.log(course);
  // if(course == undefined){
  //   res.status(404).send({massage:"the id not found"})
  // }
  // res.json(course);
  })
  module.exports = router;