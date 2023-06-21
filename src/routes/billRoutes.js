// Import required modules
const express = require("express");
const router = express.Router();

// Import the controller module
const billController = require("../controllers/billController");

// Define the route for the sendBill endpoint
// Define a route for the sendBill endpoint
/**
 * @swagger
 * /sendBill:
 *   post:
 *     summary: Send a bill
 *     description: Endpoint to send a bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               billData:
 *                 type: string
 *             example:
 *               billData: Sample bill data
 *     responses:
 *       200:
 *         description: Bill sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 billData:
 *                   type: string
 *             example:
 *               message: Bill sent successfully
 *               billData: Sample bill data
 */
// router.post("/sendBill", billController.sendBill);

// // Define the route for the getTest endpoint
// router.get("/getTest", billController.getTest);

// Export the router
module.exports = router;
