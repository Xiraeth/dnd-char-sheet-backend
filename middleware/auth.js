import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies.token;

    if (!token) {
      // Check Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Debug log
    res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};
