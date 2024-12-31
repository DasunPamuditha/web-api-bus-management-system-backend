const express = require('express');
const { addBus, updateBus, getBuses, deactivateBus } = require('../controllers/busController');
const { validateBus } = require('../middlewares/validationMiddleware');
const protect = require('../middlewares/authMiddleware');
const verifyAdminRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus-related routes
router.post('/add', protect, verifyAdminRole, validateBus, addBus);
router.put('/update/:id', protect, verifyAdminRole, updateBus);
router.get('/view', protect, verifyAdminRole, getBuses);
router.delete('/remove/:id', protect, verifyAdminRole, deactivateBus);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bus
 *   description: Bus management
 */

/**
 * @swagger
 * /tp/admin/buses/add:
 *   post:
 *     summary: Add a bus
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *                 example: ABC-1234
 *               type:
 *                 type: string
 *                 enum: [Luxury, Semi-Luxury, Normal]
 *                 example: Semi-Luxury
 *               capacity:
 *                 type: integer
 *                 minimum: 10
 *                 maximum: 100
 *                 example: 40
 *               operatorId:
 *                 type: string
 *                 example: BO-1023
 *     responses:
 *       201:
 *         description: Bus added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busNumber:
 *                   type: string
 *                   example: ABC-1234
 *                 type:
 *                   type: string
 *                   example: Semi-Luxury
 *                 capacity:
 *                   type: integer
 *                   example: 40
 *                 operatorId:
 *                   type: string
 *                   example: BO-1023
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 _id:
 *                   type: string
 *                   example: 605c72b8e5f1234567a12345
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Validation error or duplicate bus number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus number already exists
 */

/**
 * @swagger
 * /tp/admin/buses/view:
 *   get:
 *     summary: Get all buses
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   busNumber:
 *                     type: string
 *                     example: ABC-1234
 *                   type:
 *                     type: string
 *                     example: Semi-Luxury
 *                   capacity:
 *                     type: integer
 *                     example: 40
 *                   operatorId:
 *                     type: string
 *                     example: BO-1023
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   _id:
 *                     type: string
 *                     example: 605c72b8e5f1234567a12345
 *                   __v:
 *                     type: integer
 *                     example: 0
 */

/**
 * @swagger
 * /tp/admin/buses/update/{id}:
 *   put:
 *     summary: Update bus details
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Luxury, Semi-Luxury, Normal]
 *                 example: Normal
 *               capacity:
 *                 type: integer
 *                 minimum: 10
 *                 maximum: 100
 *                 example: 60
 *               operatorId:
 *                 type: string
 *                 example: BO-1023
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 605c72b8e5f1234567a12345
 *                 busNumber:
 *                   type: string
 *                   example: ABC-1234
 *                 type:
 *                   type: string
 *                   example: Normal
 *                 capacity:
 *                   type: integer
 *                   example: 60
 *                 operatorId:
 *                   type: string
 *                   example: BO-1023
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 __v:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus not found
 */

/**
 * @swagger
 * /tp/admin/buses/remove/{id}:
 *   delete:
 *     summary: Deactivate a bus
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID to deactivate
 *     responses:
 *       200:
 *         description: Bus deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus deactivated
 *                 deactivatedBus:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 605c72b8e5f1234567a12345
 *                     busNumber:
 *                       type: string
 *                       example: ABC-1234
 *                     type:
 *                       type: string
 *                       example: Semi-Luxury
 *                     capacity:
 *                       type: integer
 *                       example: 40
 *                     operatorId:
 *                       type: string
 *                       example: BO-1023
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *                     __v:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus not found
 */
