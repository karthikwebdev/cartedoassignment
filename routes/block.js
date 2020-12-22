const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers");
const { postBlocks, getAllBlocks } = require("../controllers/block");

/**
 * @swagger
 * /api/blockchain:
 *  post:
 *    produces:
 *      - application/json
 *    description: API to Add and update Blocks
 *    parameters:
 *      - name: blocks
 *        in : formData
 *        type: Array
 *        items:
 *           type: object
 *           properties:
 *             data:
 *                type: string
 *             nonce:
 *                type: string
 *             timestamp:
 *               type: number
 *      - name: x-auth-token
 *        in : headers
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Save blocks successful
 *      '401':
 *          description: No token sent or No access or Token expired
 *      '500':
 *        description: Internal Server Error
 */
router.post("/blockchain", isLoggedIn, postBlocks);
/**
 * @swagger
 * /api/blockchain:
 *  get:
 *    produces:
 *      - application/json
 *    description: API to Retrieve Blocks
 *    parameters:
 *      - name: x-auth-token
 *        in : headers
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Blocks Retrieved successfully
 *      '401':
 *          description: No token sent or No access or Token expired
 *      '500':
 *        description: Internal Server Error
 */
router.get("/blockchain", isLoggedIn, getAllBlocks);

module.exports = router;
