//Middleware  to check if a user is signed in

const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isSignedIn = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("You need to login before accessing this resource", 400))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    // req.user = await User.findById(decodedData.id);
    // console.log(decodedData.id);
    next()
})