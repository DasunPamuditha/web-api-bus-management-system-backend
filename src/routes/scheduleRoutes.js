const express = require('express');
const router = express.Router();
const { createSchedule, getSchedules, updateSchedule } = require('../controllers/scheduleController');
const protect = require('../middlewares/authMiddleware');

// Create a Schedule (admin only)
router.post('/create', protect, createSchedule);

// Get All Schedules (admin only)
router.get('/view', protect, getSchedules);

// Update a Schedule (admin only)
router.put('/update/:id', protect, updateSchedule);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Schedule management
 */

/**
 * @swagger
 * /tp/schedules/create:
 *   post:
 *     summary: Create a schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *                 example: S-1001
 *               routeId:
 *                 type: string
 *                 example: R-001
 *               startPoint:
 *                 type: string
 *                 example: Colombo
 *               endPoint:
 *                 type: string
 *                 example: Kandy
 *               busNumber:
 *                 type: string
 *                 example: B-1234
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-01T08:00:00Z
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-01T12:00:00Z
 *               stops:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stopName:
 *                       type: string
 *                       example: Kadugannawa
 *                     arrivalTime:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-01T10:00:00Z
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                   example: ["Monday", "Wednesday", "Friday"]
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/schedules/view:
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   scheduleId:
 *                     type: string
 *                     example: S-1002
 *                   routeId:
 *                     type: string
 *                     example: R-002
 *                   startPoint:
 *                     type: string
 *                     example: Galle
 *                   endPoint:
 *                     type: string
 *                     example: Matara
 *                   busNumber:
 *                     type: string
 *                     example: B-5678
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-01-02T09:00:00Z
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-01-02T11:00:00Z
 *                   days:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: ["Tuesday", "Thursday", "Saturday"]
 *       404:
 *         description: No schedules found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/schedules/update/{id}:
 *   put:
 *     summary: Update a schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeId:
 *                 type: string
 *                 example: R-003
 *               busNumber:
 *                 type: string
 *                 example: B-7890
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-03T07:00:00Z
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-03T11:00:00Z
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                   example: ["Tuesday", "Friday", "Sunday"]
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule updated successfully"
 *                 updatedSchedule:
 *                   type: object
 *                   properties:
 *                     scheduleId:
 *                       type: string
 *                       example: S-1003
 *                     routeId:
 *                       type: string
 *                       example: R-003
 *                     busNumber:
 *                       type: string
 *                       example: B-7890
 *                     startTime:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-03T07:00:00Z
 *                     endTime:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-03T11:00:00Z
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["Tuesday", "Friday", "Sunday"]
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
