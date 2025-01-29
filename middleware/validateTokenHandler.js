const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
   let token; 
   let authHeader = req.headers.Authorization || req.headers.authorization;
   console.log("Auth Header:", authHeader); // Debugging log
   if (authHeader && authHeader.startsWith("Bearer")) {
       token = authHeader.split(" ")[1];    
       console.log("Token:", token); // Debugging log
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
           if (err) {
               res.status(401); 
               throw new Error("Not Authorized, Token Failed");
           }
           req.user = decoded; // Attach the decoded user info to the request
           console.log("User info:", req.user); // Debugging log
           next(); // Call next to proceed to the next middleware
       });
   } else {
       res.status(401);
       throw new Error("Not Authorized, No Token");
   }
});

module.exports = { validateToken };
