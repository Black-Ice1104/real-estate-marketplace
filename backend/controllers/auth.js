// Process and generate different requests and responses
// Control their logic under the hood
// e.g. refresh token / pre-register / login / forgot password, etc
import * as config from "../config.js";
import jwt from 'jsonwebtoken';
import {emailTemplate} from "../helpers/email.js";
import {hashPassword, comparePassword} from '../helpers/auth.js';
import User from '../models/user.js';
import Ad from "../models/ad.js";
import {nanoid} from 'nanoid';
import validator from "email-validator";

export const welcome = (req, res)=>{
    res.json({
        data: 'hello from nodejs api!'
    });
};

export const refreshToken = async (req, res) => {
    try{
        // 1. check if the refresh token has expired
        const {_id} = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
        const user = await User.findById(_id);

        // create jwt tokens and send the response to user
        tokenAndUserResponse(req, res, user);

    } catch (err) {
        console.log(err);
        return res.status(403).json({error: "Refresh token failed"});
    }
};

export const tokenAndUserResponse = (req, res, user) => {
    // create jwt tokens
    const token = jwt.sign({_id: user._id}, config.JWT_SECRET, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({_id: user._id}, config.JWT_SECRET, {
        expiresIn: "1w",
    });

    // send the response to user
    user.password = undefined;
    user.resetCode = undefined;
    return res.json({
        token,
        refreshToken,
        user,
    });
};

export const preRegister = async (req, res) => {
    // This is an email comfirmation process to check if user provided valid email address
    // create jwt (json web token) with email and password, then email it as clickable link
    // only when user clicks on the link will registration completes
    try {
        // console.log(req.body);
        const {email, password} = req.body;

        // validation (comfirmation email clicked or not)
        if(!validator.validate(email)){
            return res.json({error: "A valid email is required"});
        }
        if(!password){
            return res.json({error: "Password is required"});
        }else if(password.length < 6){
            return res.json({error: "Password should be at least 6 characters"});
        }

        // if the user exists
        // find it based on the email
        const user = await User.findOne({email});
        if(user){
            return res.json({error: "Email is taken"});
        }

        const token = jwt.sign({email, password}, config.JWT_SECRET, {
            expiresIn: "1d", // format: 1h, 1d, 1w, etc
        });

        config.AWSSES.sendEmail(
            emailTemplate(
                email, // email
                `
                <p>Please click the link below to activate your account: </p>
                <a href="${
                    config.CLIENT_URL
                }/auth/account-activate/${token}">Activate my account</a>
                `, // content
                config.REPLY_TO, // replyTo
                "Activate your account" // subject
            ),
            (err, data) => { // callback function
                if(err){
                    console.log(err, "Please provide a valid email address");
                    return res.json({ok: false});
                }else{
                    console.log(data, "Please check email to complete registration");
                    return res.json({ok: true});
                }
            }
        );
    } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again"});
    }
};

export const register = async(req, res) => {
    try{
        // console.log(req.body);
        const {email, password}= jwt.verify(req.body.token, config.JWT_SECRET);
        const hashedPassword = await hashPassword(password);
        const user = await new User({
            username: nanoid(6),
            email,
            password: hashedPassword,
        }).save(); // this is where the data got saved in MongoDB

        // create jwt tokens and send the response to user
        tokenAndUserResponse(req, res, user);

    } catch(err){
        console.log(err);
        return res.json({ error: "Something went wrong. Try again"});
    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        // 1. find user by email in the database
        const user = await User.findOne({email});
        if(!user){
            return res.json({error: "No existing account found"});
        }

        // 2. then compare password
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.json({error: "Wrong password"});
        }
        
        // create jwt tokens and send the response to user
        tokenAndUserResponse(req, res, user);

    } catch(err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again"});
    }
};

export const forgotPassword = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({error: "Could not find user with the email!"});
        }else{
            const resetCode = nanoid();
            user.resetCode = resetCode;
            user.save();
            const token = jwt.sign({resetCode}, config.JWT_SECRET, {
                expiresIn:"1h",
            });

            config.AWSSES.sendEmail(
                emailTemplate(
                    email,
                    `
                    <p>Please click the link below to access your account: </p>
                    <a href="${config.CLIENT_URL}/auth/access-account/${token}">
                        Access your account
                    </a>
                    `,
                    config.REPLY_TO,
                    "Access your account"
                ),
                (err, data) => { // callback function
                    if(err){
                        console.log(err, "Please provide a valid email address");
                        return res.json({ok: false});
                    }else{
                        console.log(data, "Please check email to complete registration");
                        return res.json({ok: true});
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again"});
    }
};

export const accessAccount = async (req, res) => {
    try{
        const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);
        // 1. once we find the user, reset the resetCode to empty string
        const user = await User.findOneAndUpdate({resetCode}, {resetCode: ""});
        
        // create jwt tokens and send the response to user
        tokenAndUserResponse(req, res, user);

    } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again"});
    }
};

export const currentUser = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(403).json({error: "Unauthorized"});
    }
};

export const publicProfile = async (req, res) => {
    try{
        const user = await User.findOne({username: req.params.username});
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch(err) {
        console.log(err);
        return res.json({error: "User not found"});
    }
};

export const updatePassword = async (req, res) => {
    try{
        const {password} = req.body;

        if(!password){
            return res.json({error: "Password is required"});
        } else if(password.length < 6){
            return res.json({error: "Password should be at least 6 characters"});
        }

        const user = await User.findByIdAndUpdate(req.user._id, {
            password: await hashPassword(password),
        });

        res.json({ok: true});
    } catch (err) {
        console.log(err);
        return res.status(403).json({error: "Unauthorized"});
    }
};

export const updateProfile = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
        });
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);

    } catch (err) {
        if(err.codeName === "DuplicateKey"){
            return res.json({error: "Username or email is already taken"});
        }else{
            return res.status(403).json({error: "Unauthorized"});
        }
    }
};

// fetch all users with the role of Seller
export const agents = async (req, res) => {
    try {
      const users = await User.find({ role: "Seller" }).select(
        "-password -role -enquiredProperties -wishlist -photo.ETag -photo.Key -photo.key -photo.Bucket"
      );
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  };
  
// show how many ads one agent have
export const agentAdCount = async (req, res) => {
try {
  const ads = await Ad.find({ postedBy: req.params._id }).select("_id");
  res.json(ads);
} catch (err) {
  console.log(err);
}
};

// find the agent's info
export const agent = async (req, res) => {
try {
  const user = await User.findOne({ username: req.params.username }).select(
    "-password -role -enquiredProperties -wishlist -photo.ETag -photo.Key -photo.key -photo.Bucket"
  );
  const ads = await Ad.find({ postedBy: user._id }).select(
    "-photos.Key -photos.key -photos.ETag -photos.Bucket -location -googleMap"
  );
  res.json({ user, ads });
} catch (err) {
  console.log(err);
}
};
