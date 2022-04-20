//User Schema for the project

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength:3,
        maxLength : 24,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        validate:[validator.isEmail, "Please Enter A Valid Email"]
    },
    password:{
        type: String,
        requied: true,
        select:false,
        minLength:[8, "Password must contain 8 digits"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number,
        default:null
    }
})

userSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        next();
    }

    //bcrypt not working as expected -- to be resolved
    // this.password = await bcrypt.hash(this.password, 10)

})

//Generating JWT token
userSchema.methods.generateJWT = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//generateOTP -- [To ADD - Encrypt generated OTP]
userSchema.methods.generateOTP = function(){
    
    const OTPvalue = Math.floor(1000 + Math.random() * 9000);
    
    return OTPvalue
}

module.exports = mongoose.model("User", userSchema) 