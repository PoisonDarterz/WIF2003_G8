const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware to authenticate users based on JWT token
const authenticateUser = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach user object to request for further use
    req.user = user;

    next(); // Move to the next middleware/route handler
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Middleware to check user role
const checkRole = (requiredRole) => (req, res, next) => {
  if (req.user && req.user.role === requiredRole) {
    //res.status(200).json({ message: "Success" });
    next(); // User has the required role, continue to the next middleware/route handler
  } else {
    res.status(403).json({ message: "Forbidden: Insufficient permissions" }); // User doesn't have the required role, send 403 Forbidden
  }
};

module.exports = { authenticateUser, checkRole };
