//User routes -- through which frontend will interact with backend
const express = require("express");
const { registerUser, loginUser, signout, updateUserDetails,initOTPandSaveToDB, verifyEmail} = require("../controllers/userController.js");
const {testUserRoute, sendRandomValue} = require("../controllers/testUserRouteController")
const {isSignedIn} = require("../middlewares/isSignedIn")

const router = express.Router();

//Auth routes
router.post('/', registerUser) //for signing up
router.post('/signin', loginUser) //for signing in
router.get('/signout', signout) //for signing out

// router.get('/test', isSignedIn,testUserRoute)
router.get('/test', sendRandomValue) //Test route to test functions -- independent of running code

//Profile Routes
router.put('/update', updateUserDetails) //Updating user details
router.put('/verify-email', isSignedIn, initOTPandSaveToDB) //Initialising OTP and sending it to mail
router.post('/verify-email', isSignedIn, verifyEmail) //Verifying OTP && Email

module.exports = router