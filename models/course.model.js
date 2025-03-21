const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title:String,
    price:Number,
  });
  const Course = mongoose.model("Course",courseSchema);
  module.exports = Course;