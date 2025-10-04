import User from "../models/User.js";
import jwt from 'jsonwebtoken';

//route protection middleware
export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.headers.token;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.userId).select("-password");


        if(!user) return res.status(200).json({success: false, message: "User not Found"});

        req.user = user;
        next();
    } catch (error) {
        console.error("Internal server error")
        res.status(500).json({success: false, message: error.message});
    }
}