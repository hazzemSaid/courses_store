const express = require("express");
const router = express.Router();
const Courses = require("../../models/course.model");
router.put("/:id",  (req, res, next) => {
  console.log(req.params.id);
  const course =  Courses.findById(req.params.id).then( (data) => {
    if (data) {
      data.title = req.body.title;
      data.price = req.body.price;
      console.log(req.body);
      console.log(data);
       data.save();
      res.json(data);
    }
    else
    {res.statusCode(404).end();}
  });

  // if(course == undefined){
  //   res.status(404).send({massage:"the id not found"})
  // }
  // course.title = req.body.title;
  // course.price = req.body.price;
  // res.json(course);
});
module.exports = router;