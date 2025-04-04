const asyncWrapper = require("../middleware/asyncwrapper")
const userSchema = require("../models/user.model");
const { validationResult } = require("express-validator");
const Error_handler = require("../utils/error");
const httpResponseText = require("../models/httpResponsetext");
const bcrypt = require('bcryptjs');

const getalluser = asyncWrapper(async(req,res)=>{
	const users = await userSchema.find({}, { __v: false });
	return res.status(200).json({
		status: "success",
		data: [users]
	});
});
const register = asyncWrapper(async(req,res,next)=>{
	//req.body 
	//req.params
	//req.query
	const { email, password, name, phone } = req.body;
	console.log(email, password, name, phone);
	const hashpasswrod =  bcrypt.hashSync(password, 10);
	const newuser=userSchema({
		email,
		password: hashpasswrod,
		name,
		phone
	});
	const saveduser = await newuser.save();
	return res.status(201).json({
		status: httpResponseText.Success,
		data: saveduser,
});
}
);
const deleteuser = asyncWrapper(async(req,res,next)=>{
	console.log(req.params.id);
	
	const user = await userSchema.findById({_id:req.params.id}, { __v: false });
	console.log(user);
	console.log(req.params.id);
	if (!user) {
		const err = Error_handler.createError("User not found", 404);
		return next(err);
	}
	await userSchema.findOneAndDelete({ _id: req.params.id });
	return res.status(200).json({
		status: httpResponseText.Success,
		data: user
	});
});
const login= asyncWrapper(async(req,res,next)=>{
	const { email, password } = req.body;
	const user = await userSchema.findOne({ email });
	if (!user) {
		const err = Error_handler.createError("User not found", 404);
		return next(err);
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		const err = Error_handler.createError("wrong email or password", 401);
		return next(err);
	}
	return res.status(200).json({
		status: httpResponseText.Success,
		data: user
	});
})
module.exports={
	getalluser,
	register,
	deleteuser
	,login
}
