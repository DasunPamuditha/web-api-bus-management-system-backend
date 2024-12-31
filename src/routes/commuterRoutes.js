const express = require('express');
const router = express.Router();
const {
  searchBuses,
  getSeats,
  bookSeatWithPayment,
  cancelBooking,
  searchAvailableBuses,
} = require('../controllers/commuterController');

// Search for buses
router.get('/buses', searchBuses);

// Get seats for a bus
router.get('/available-seats', getSeats);

router.get('/available-buses', searchAvailableBuses);

// Book a seat with payment
router.post('/book-and-pay', bookSeatWithPayment);

// Cancel a booking
router.post('/cancel-booking', cancelBooking);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Commuter
 *   description: Commuter operations
 */

/**
 * @swagger
 * /tp/commuters/buses:
 *   get:
 *     summary: Search for available buses
 *     tags: [Commuter]
 *     parameters:
 *       - in: query
 *         name: boardingPlace
 *         schema:
 *           type: string
 *         required: true
 *         description: Boarding place
 *       - in: query
 *         name: destinationPlace
 *         schema:
 *           type: string
 *         required: true
 *         description: Destination place
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Travel date
 *     responses:
 *       200:
 *         description: List of available buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 buses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       scheduleId:
 *                         type: string
 *                         example: "sch-5678"
 *                       routeId:
 *                         type: string
 *                         example: "r-3456"
 *                       busNumber:
 *                         type: string
 *                         example: "XYZ-1234"
 *                       type:
 *                         type: string
 *                         example: "Luxury"
 *                       capacity:
 *                         type: integer
 *                         example: 45
 *                       boardingPlace:
 *                         type: string
 *                         example: "Galle"
 *                       destinationPlace:
 *                         type: string
 *                         example: "Matara"
 *                       price:
 *                         type: integer
 *                         example: 1500
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-10T06:30:00Z"
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-10T08:30:00Z"
 *                       stops:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             stopName:
 *                               type: string
 *                               example: "Ambalangoda"
 *                             arrivalTime:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-02-10T07:00:00Z"
 *       404:
 *         description: No buses found
 */

/**
 * @swagger
 * /tp/commuters/available-seats:
 *   get:
 *     summary: Get seat availability
 *     tags: [Commuter]
 *     parameters:
 *       - in: query
 *         name: busNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Bus number
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Travel date
 *     responses:
 *       200:
 *         description: Seat availability
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   seatNumber:
 *                     type: integer
 *                     example: 12
 *                   status:
 *                     type: string
 *                     enum: [Available, Booked]
 *                     example: "Available"
 */

/**
 * @swagger
 * /tp/commuters/book-and-pay:
 *   post:
 *     summary: Book a seat with payment
 *     tags: [Commuter]
 *     description: Books a seat for the specified bus and sends a confirmation email with booking details and price to the provided email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *                 description: Bus number to book a seat on
 *                 example: "XYZ-1234"
 *               seatNumber:
 *                 type: integer
 *                 description: Seat number to book
 *                 example: 15
 *               passengerName:
 *                 type: string
 *                 description: Name of the passenger
 *                 example: "Nimal"
 *               mobileNumber:
 *                 type: string
 *                 description: Passenger's mobile number
 *                 example: "0712345678"
 *               email:
 *                 type: string
 *                 description: Passenger's email address for confirmation
 *                 example: "nimal@example.com"
 *               boardingPlace:
 *                 type: string
 *                 description: Boarding place of the passenger
 *                 example: "Colombo"
 *               destinationPlace:
 *                 type: string
 *                 description: Destination place of the passenger
 *                 example: "Kandy"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of travel
 *                 example: "2025-03-10T09:00:00Z"
 *     responses:
 *       201:
 *         description: Seat booked successfully, and a confirmation email is sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seat booked successfully, confirmation email sent"
 *                 booking:
 *                   type: object
 *                   properties:
 *                     busNumber:
 *                       type: string
 *                       example: "XYZ-1234"
 *                     seatNumber:
 *                       type: integer
 *                       example: 15
 *                     passengerName:
 *                       type: string
 *                       example: "Nimal"
 *                     mobileNumber:
 *                       type: string
 *                       example: "0712345678"
 *                     email:
 *                       type: string
 *                       example: "nimal@example.com"
 *                     boardingPlace:
 *                       type: string
 *                       example: "Colombo"
 *                     destinationPlace:
 *                       type: string
 *                       example: "Kandy"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-10T09:00:00Z"
 *                     transactionId:
 *                       type: string
 *                       example: "txn1234567890"
 *                     cancellationToken:
 *                       type: string
 *                       example: "can7894561230"
 *                     price:
 *                       type: number
 *                       example: 1800
 *       400:
 *         description: Seat already booked, payment failed, or price not found.
 *       404:
 *         description: Bus or schedule not found for the given details.
 *       500:
 *         description: Internal server error.
 */
