//Module imports
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const sendToken = require("../utils/jwt.js");
const sendEmail = require("../utils/sendEmail.js");
const jwt = require("jsonwebtoken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  //destructring values fetched from body
  const { name, email, password } = req.body;

  //Registering user in DB
  const user = await User.create({
    name,
    email,
    password,
  });

  const message = `Hey ${user.name}! Welcome to the club. Go to your profile page and get your email verified to get started`;
  sendEmail({
    email: user.email,
    subject: `Welcome ${user.name}`,
    message,
  });
  sendToken(user, 200, res);
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  //Searching for email && password in DB
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email/Password Combination", 400));
  }

  //Commenting this as bcrypt isnt working as expected -- TO BE RESOLVED
  // const isPasswordMatched = await user.comparePassword(password);

  let isPasswordMatched = false;
  if (user.password === password) {
    isPasswordMatched = true;
  }

  if (isPasswordMatched == false) {
    return next(new ErrorHandler(`Invalid Email/Password Combination`, 400));
  }

  sendToken(user, 200, res);
});

//Logout Feature
exports.signout = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  //Making token(cookie) value null on logout
  res.cookie("token", null, {
    expires: new Date(Date.now),
    httpOnly: true,
  });

  //Making OTP null on logout
  req.user.otp = null;

  await req.user.save();

  res.status(200).json({
    success: true,
    message: "You have successfully logged out!",
  });
});

//Profile Updation
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  //Verification of user provided cookie and generated cookie
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  const originalName = req.user.name;

  const newUserData = {
    name: req.body.name,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const message = `
    You changed your name from ${originalName} changed to ${user.name} 
    `;

  try {
    await sendEmail({
      email: user.email,
      subject: `We received a request to update your profile`,
      message,
    });

    return res.status(200).json({
      success: true,
      user,
      message: `Email Sent to ${user.email}. Check your inbox`,
    });
  } catch (error) {
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//generating otp and saving it to DB
exports.initOTPandSaveToDB = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  const generatedOTP = await req.user.generateOTP();

  const newUserData = {
    otp: generatedOTP,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  //Making OTP Null in 15 mins
  setTimeout(
    (makeOTPnull = async () => {
      user.otp = null;
      await user.save();
    }),
    900000
  );

  const message = `
    ${generatedOTP} is the OTP generated for your email verification. Please do it asap as it will expire in 15 minutes 
    `;

  try {
    await sendEmail({
      email: user.email,
      subject: `OTP to verify your email`,
      message,
    });

    return res.status(200).json({
      success: true,
      user,
      message: `Email Sent to ${user.email}. Check your inbox`,
    });
  } catch (error) {
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Verifying Email
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { enteredOTP } = req.body;

  const { token } = req.cookies;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  if (enteredOTP != req.user.otp) {
    return next(new ErrorHandler("Invalid OTP", 401));
  }

  req.user.isEmailVerified = true;
  await req.user.save();

  const message = `Hey ${req.user.name}! Your email was verified successfully.`;
  sendEmail({
    email: req.user.email,
    subject: `Email verified Successfully!`,
    message,
  });
  return res.status(200).json({
    user: req.user,
  });
});
