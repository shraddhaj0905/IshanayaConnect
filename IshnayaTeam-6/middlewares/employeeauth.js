const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "babbar";

const employeeAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify Token
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    // ✅ Check if the role is "employee"
    if (decoded.role !== "employee") {
      return res.status(403).json({ message: "Access denied. Only employees allowed." });
    }

    req.employee = decoded; // Store employee details in request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = employeeAuth;


// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET || "babbar";

// const employeeAuth = (req, res, next) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       console.error("❌ No token provided.");
//       return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     // Ensure token is properly formatted
//     const actualToken = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;

//     // Verify JWT Token
//     const decoded = jwt.verify(actualToken, JWT_SECRET);

//     console.log("🔹 Decoded Token:", decoded); // Debugging output

//     // ✅ Ensure employee role and ObjectId exist
//     if (!decoded._id || decoded.role !== "employee") {
//       console.error("❌ Invalid token: Missing _id or incorrect role.");
//       return res.status(403).json({ message: "Access denied. Only employees allowed." });
//     }

//     req.employee = decoded; // ✅ Store decoded employee data (including _id)
//     console.log("✅ req.employee set:", req.employee);

//     next(); // Proceed to next middleware
//   } catch (error) {
//     console.error("❌ Token verification failed:", error.message);
//     res.status(401).json({ message: "Invalid or expired token." });
//   }
// };

// module.exports = employeeAuth;



