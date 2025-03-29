const asyncWrapper = require("../middleware/asyncwrapper")
const userSchema = require("../models/user.model");
const getalluser = asyncWrapper(async(req,res)=>{
	const users = await userSchema.find({}, { __v: false });
	return res.status(200).json({
		status: "success",
		data: [users]
	});
});
module.exports={
	getalluser
}
