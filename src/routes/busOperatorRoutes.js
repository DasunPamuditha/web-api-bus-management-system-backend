const express = require('express');
const {
  addBusOperator,
  updateBusOperator,
  getBusOperators,
  deactivateBusOperator,
  getBusOperatorById,
} = require('../controllers/busOperatorController');
const protect = require('../middlewares/authMiddleware');
const verifyAdminRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus operator-related routes
router.post('/add', protect, verifyAdminRole, addBusOperator);
router.put('/update/:id', protect, verifyAdminRole, updateBusOperator);
router.get('/view', protect, verifyAdminRole, getBusOperators);
router.get('/viewid/:operatorId', protect, verifyAdminRole, getBusOperatorById);
router.delete('/remove/:id', protect, verifyAdminRole, deactivateBusOperator);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: BusOperator
 *   description: Bus operator management
 */

/**
 * @swagger
 * tp/bus-operators/add:
 *   post:
 *     summary: Add a bus operator
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               operatorId:
 *                 type: string
 *                 example: BO-1023
 *               name:
 *                 type: string
 *                 example: John Smith
 *               email:
 *                 type: string
 *                 example: john.smith@busoperators.com
 *               password:
 *                 type: string
 *                 description: Encrypted password (hashed)
 *                 example: $2b$10$XyLBNLPjthYlPHa3MensUy45LrRrtuKTui76MaJkAAAB5guqIYZ/S
 *               nic:
 *                 type: string
 *                 example: 987654321V
 *               role:
 *                 type: string
 *                 example: operator
 *     responses:
 *       201:
 *         description: Bus operator added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 605c72b8e5f1234567a12345
 *                 operatorId:
 *                   type: string
 *                   example: BO-1023
 *                 name:
 *                   type: string
 *                   example: John Smith
 *                 email:
 *                   type: string
 *                   example: john.smith@busoperators.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 nic:
 *                   type: string
 *                   example: 987654321V
 *                 role:
 *                   type: string
 *                   example: operator
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-30T10:30:15.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-30T10:30:15.000Z
 *       400:
 *         description: Operator ID, Email, or NIC already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Operator ID, Email, or NIC already in use
 */

/**
 * @swagger
 * tp/bus-operators/view:
 *   get:
 *     summary: Get all bus operators
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bus operators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 605c72b8e5f1234567a12345
 *                   operatorId:
 *                     type: string
 *                     example: BO-1023
 *                   name:
 *                     type: string
 *                     example: John Smith
 *                   email:
 *                     type: string
 *                     example: john.smith@busoperators.com
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   nic:
 *                     type: string
 *                     example: 987654321V
 *                   role:
 *                     type: string
 *                     example: operator
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-30T10:30:15.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-30T10:30:15.000Z
 *       404:
 *         description: No bus operators found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No bus operators found
 */

/**
 * @swagger
 * tp/bus-operators/viewid/{operatorId}:
 *   get:
 *     summary: Get a bus operator by operatorId
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: operatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Operator ID
 *     responses:
 *       200:
 *         description: Bus operator retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 605c72b8e5f1234567a12345
 *                 operatorId:
 *                   type: string
 *                   example: BO-1023
 *                 name:
 *                   type: string
 *                   example: John Smith
 *                 email:
 *                   type: string
 *                   example: john.smith@busoperators.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 nic:
 *                   type: string
 *                   example: 987654321V
 *                 role:
 *                   type: string
 *                   example: operator
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-30T10:30:15.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-30T11:45:20.000Z
 *       404:
 *         description: Bus operator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus operator not found
 *       500:
 *         description: Server error
 */