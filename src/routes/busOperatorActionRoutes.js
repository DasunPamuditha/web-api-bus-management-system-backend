const express = require('express');
const {
  getSchedulesForOperator,
  getSeatBookingsForOperator,
  reassignBusInSchedule,
} = require('../controllers/busOperatorActionsController');
const operatorProtect = require('../middlewares/operatorAuthMiddleware');

const router = express.Router();

// Route to view schedules for operator's buses
router.get('/schedules', operatorProtect, getSchedulesForOperator);

// Route to view seat bookings for operator's buses
router.get('/bookings', operatorProtect, getSeatBookingsForOperator);

// Route to reassign a bus
router.put('/reassign-bus', operatorProtect, reassignBusInSchedule);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: BusOperatorActions
 *   description: Bus operator-specific actions
 */

/**
 * @swagger
 * /tp/bus-operators/actions/schedules:
 *   get:
 *     summary: View schedules for operator's buses
 *     tags: [BusOperatorActions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter schedules
 *         example: 2024-12-10
 *     responses:
 *       200:
 *         description: List of schedules for operator's buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       scheduleId:
 *                         type: string
 *                         example: SCHD12345
 *                       routeId:
 *                         type: string
 *                         example: RT56789
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-10T08:00:00Z
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-10T12:00:00Z
 *                       busNumber:
 *                         type: string
 *                         example: BUS1234
 *       404:
 *         description: No schedules found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/bus-operators/actions/bookings:
 *   get:
 *     summary: View seat bookings for operator's buses
 *     tags: [BusOperatorActions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: busNumber
 *         schema:
 *           type: string
 *         description: Filter bookings by bus number
 *         example: BUS5678
 *     responses:
 *       200:
 *         description: List of seat bookings for operator's buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       busNumber:
 *                         type: string
 *                         example: BUS5678
 *                       seatNumber:
 *                         type: number
 *                         example: 12
 *                       passengerName:
 *                         type: string
 *                         example: John Doe
 *                       boardingPlace:
 *                         type: string
 *                         example: Central Station
 *                       destinationPlace:
 *                         type: string
 *                         example: North Avenue
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2024-12-11
 *       404:
 *         description: No bookings found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/bus-operators/actions/reassign-bus:
 *   put:
 *     summary: Reassign a bus in a schedule
 *     tags: [BusOperatorActions]
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
 *                 description: ID of the schedule to update
 *                 example: SCHD56789
 *               newBusNumber:
 *                 type: string
 *                 description: New bus number to assign to the schedule
 *                 example: BUS9876
 *     responses:
 *       200:
 *         description: Bus reassigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus reassigned successfully
 *                 schedule:
 *                   type: object
 *                   properties:
 *                     scheduleId:
 *                       type: string
 *                       example: SCHD56789
 *                     busNumber:
 *                       type: string
 *                       example: BUS9876
 *       400:
 *         description: Validation error
 *       404:
 *         description: Schedule or bus not found
 *       500:
 *         description: Server error
 */
