const express = require('express');
const {
  createRoute,
  getRoutes,
  updateRoute,
  deleteRoute
} = require('../controllers/routeController');
const protect = require('../middlewares/authMiddleware'); // Ensure this line is present
const verifyAdminRole = require('../middlewares/roleMiddleware'); // Ensure this line is present

const router = express.Router();

// Create a Route
router.post('/add-route', protect, verifyAdminRole, createRoute);

// Get All Routes or Filter by Criteria
router.get('/view', protect, verifyAdminRole, getRoutes);

// Update a Route
router.put('/update/:id', protect, verifyAdminRole, updateRoute);

// Delete a Route by routeId
router.delete('/delete/:id', protect, verifyAdminRole, deleteRoute);

module.exports = router;

/**
 * @swagger
 * /tp/routes/add-route:
 *   post:
 *     summary: Create a route
 *     tags: [Route]
 *     security:
 *       - bearerAuth: [admintoken]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeId:
 *                 type: string
 *                 example: R-001
 *               startPoint:
 *                 type: string
 *                 example: Colombo
 *               endPoint:
 *                 type: string
 *                 example: Galle
 *               distance:
 *                 type: number
 *                 example: 116
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["Kalutara", "Bentota", "Hikkaduwa"]
 *               prices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                       example: Colombo
 *                     to:
 *                       type: string
 *                       example: Galle
 *                     price:
 *                       type: number
 *                       example: 500
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Validation error or missing prices for stop combinations
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/routes/view:
 *   get:
 *     summary: Get all routes or filter by criteria
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startPoint
 *         schema:
 *           type: string
 *         description: Starting point of the route
 *       - in: query
 *         name: endPoint
 *         schema:
 *           type: string
 *         description: Ending point of the route
 *     responses:
 *       200:
 *         description: List of routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   routeId:
 *                     type: string
 *                     example: R-002
 *                   startPoint:
 *                     type: string
 *                     example: Colombo
 *                   endPoint:
 *                     type: string
 *                     example: Jaffna
 *                   distance:
 *                     type: number
 *                     example: 400
 *                   stops:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: ["Vavuniya", "Kilinochchi"]
 *       404:
 *         description: No routes found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/routes/update/{id}:
 *   put:
 *     summary: Update a route
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startPoint:
 *                 type: string
 *                 example: Colombo
 *               endPoint:
 *                 type: string
 *                 example: Kandy
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["Peradeniya", "Kadugannawa"]
 *               prices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                       example: Colombo
 *                     to:
 *                       type: string
 *                       example: Kandy
 *                     price:
 *                       type: number
 *                       example: 700
 *     responses:
 *       200:
 *         description: Route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 676d6bd6952ba42c62c436eb
 *                 routeId:
 *                   type: string
 *                   example: R-003
 *                 startPoint:
 *                   type: string
 *                   example: Colombo
 *                 endPoint:
 *                   type: string
 *                   example: Kandy
 *                 distance:
 *                   type: number
 *                   example: 115
 *                 stops:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Peradeniya", "Kadugannawa"]
 *                 prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       from:
 *                         type: string
 *                         example: Colombo
 *                       to:
 *                         type: string
 *                         example: Peradeniya
 *                       price:
 *                         type: number
 *                         example: 300
 *       404:
 *         description: Route not found
 *       400:
 *         description: Validation error or missing prices
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/routes/delete/{id}:
 *   delete:
 *     summary: Delete a route by routeId
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route deleted successfully
 *                 route:
 *                   type: object
 *                   properties:
 *                     routeId:
 *                       type: string
 *                       example: R-004
 *                     startPoint:
 *                       type: string
 *                       example: CityA
 *                     endPoint:
 *                       type: string
 *                       example: CityB
 *                     distance:
 *                       type: number
 *                       example: 150
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["CityA", "Stop1", "Stop2", "CityB"]
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route not found
 *       500:
 *         description: Server error
 */