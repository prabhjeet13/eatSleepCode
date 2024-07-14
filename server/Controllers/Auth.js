// send otp , signup, login
// functions for connecting with models and apply operations on database
const Otp = require("../Models/Otp");
const User = require("../Models/User");
const otp_generator = require("otp-generator");
const bcrypt = require('bcrypt');

exports.sendOtp = async(req,res) => {
    try {
          
          const {emailAddress} = req.body;
          // email address given ?
          if(!emailAddress)
          {    
               return res.status(404).json({
                  success : false,
                  message : 'enter your email address',
               }); 
          }  


          // find existing user   
          const existUser = await User.findOne({emailAddress});
          console.log("hee")
          if(existUser)
          {
            return res.status(401).json({
                success : false,
                message : 'User is already registered',
             }); 
          }

          //unique otp generation 
          var otp = otp_generator.generate(6,{
                lowerCaseAlphabets : false,
                upperCaseAlphabets : false,
                specialChars : false,
          });

          var result = await Otp.findOne({otp : otp});

          while(result)
          {
                otp = otp_generator.generate(6,{
                    lowerCaseAlphabets : false,
                    upperCaseAlphabets : false,
                    specialChars : false,
                });  
                result = await Otp.findOne({otp : otp});
          }

          const otpdata = await Otp.create({
            emailAddress,
            otp,
          });

          return res.status(200).json({
            success: true,
            message : 'otp send succcessfully',
            data : otpdata,
            otp : otp,
          });    
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'error at otp',
          });
    }
}

exports.signUp = async(req,res) => {

  try {
    const {
        firstName,
        lastName,
        emailAddress,
        accountType,
        password,
        confirmPassword,
        otp,
    } = req.body;

    // every detail given ?
    if(!firstName || !lastName || !emailAddress || !otp || !password || !confirmPassword || !accountType)
    {
        return res.status(404).json({
            success : false,
            message : 'enter your details',
         }); 
    }

    // check user is registered ?
    const exitUser = await User.findOne({emailAddress : emailAddress});

    if(exitUser)
    {
        return res.status(401).json({
            success : false,
            message : 'User is already registered',
         }); 
    }

    //verify password and confirm password
    if(password !== confirmPassword)
    {
        return res.status(400).json({
            success : false,
            message : 'password and confirm-password does not match',
         }); 
    }

    // verifying otp
    const recentOtp = await Otp.find({emailAddress}).sort({createdAt : -1}).limit(1);
    if(recentOtp.length === 0)
    {
        return res.status(400).json({
            success: false,
            message: 'OTP NOT FOUND',
        }); 
    }else if(otp !== recentOtp[0].otp)
    {    
            return res.status(400).json({
               success: false,
               message: 'Otp Not valid',
            }); 
    }


    // password hashing using bcrypt

    const hashedPassword = await bcrypt.hash(password,10);

    // create the user
    const userdetails = await User.create({
        firstName,
        lastName,
        emailAddress,
        accountType,
        password: hashedPassword,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
        success : true,
        message : 'registration successfull',
    });
  }catch(error)
  {
    return res.status(500).json({
        success: false,
        message : 'error at registration side'
    })
  }
    
}