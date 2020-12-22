const express = require("express");
const {
  validateSignup,
  makeSignup,
  verifyEmail,
  validateLogin,
  makeLogin,
} = require("../controllers/user");
const router = express.Router();

/**
 * @swagger
 * /api/signup:
 *  post:
 *    produces:
 *      - application/json
 *    description: API to register a user
 *    parameters:
 *      - name: email
 *        in : formData
 *        required: true
 *        type: string
 *      - name: password
 *        in : formData
 *        required: true
 *        type: string
 *      - name: userName
 *        in : formData
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: successful registration and Verification Mail sent
 *      '400':
 *        description: Invalid entries or Email already taken
 */

router.post("/signup", validateSignup, makeSignup);
/**
 * @swagger
 * /api/verify:
 *  post:
 *    produces:
 *      - application/json
 *    description: API to Verify a user email
 *    parameters:
 *      - name: token
 *        in : formData
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: successful Verification
 *      '400':
 *        description: Invalid entries or already Verified
 *      '500':
 *        description: Internal Server Error
 */
router.post("/verify", verifyEmail);

/**
 * @swagger
 * /api/login:
 *  post:
 *    produces:
 *      - application/json
 *    description: API to Login a user and get Token
 *    parameters:
 *      - name: email
 *        in : formData
 *        required: true
 *        type: string
 *      - name: password
 *        in : formData
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: successful Login
 *      '400':
 *        description: Invalid entries or No user or email and password doesn't match or email not verified
 *      '500':
 *        description: Internal Server Error
 */
router.post("/login", validateLogin, makeLogin);

module.exports = router;
