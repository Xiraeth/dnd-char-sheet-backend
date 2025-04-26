import { verifyCharacterData } from "../utils/verifyCharacterData.js";

/**
 * Middleware to validate character data before processing API requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const validateCharacterData = (req, res, next) => {
  // Skip validation if no body is present
  if (!req.body || Object.keys(req.body).length === 0) {
    return next();
  }

  const { isValid, errors, validatedData } = verifyCharacterData(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid character data",
      errors,
    });
  }

  // Replace the request body with the validated data
  req.body = validatedData;
  next();
};
