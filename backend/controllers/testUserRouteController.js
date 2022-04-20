// User Controller -- independent of live code

const User = require("../models/userModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const jwt = require("jsonwebtoken")
// const ErrorHandler = require("../utils/ErrorHandler.js")
// const sendEmail = require("../utils/sendEmail.js")

exports.testUserRoute = catchAsyncErrors(async(req, res) => {
    
    const { token } = req.cookies;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    user = await User.findById(decodedData.id)

    const initialisedOTP = await user.generateOTP(); 

    res.status(200).json({
        message:"Message from Test User Route -- you got this because you are Signed in",
        cookie : token,
        dd : decodedData,
        user : user,
        OTP : initialisedOTP || "undefined"
    })
})

exports.sendRandomValue = catchAsyncErrors(async(req, res,next) => {
    const data = await "Backend routing works";

    return res.status(200).json({
        message:"Voila! message fetched via backend",
        data
    })
})

