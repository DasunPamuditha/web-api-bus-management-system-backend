const express = require('express');
const {
  issuePermit,
  updatePermit,
  getPermits,
  deactivatePermit,
  getPermitById,
} = require('../controllers/permitController');
const protect = require('../middlewares/authMiddleware');
const verifyAdminRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all permit-related routes
router.post('/new-permit', protect, verifyAdminRole, issuePermit);
router.put('/update-permit/:id', protect, verifyAdminRole, updatePermit); // `id` refers to `permitNumber` here
router.get('/view-permit', protect, verifyAdminRole, getPermits);
router.delete('/remove-permit/:id', protect, verifyAdminRole, deactivatePermit);
router.get('/view-permit-id/:id', protect, verifyAdminRole, getPermitById);


module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Permit
 *   description: Permit management
 */

/**
 * @swagger
 * /tp/admin/permits/new-permit:
 *   post:
 *     summary: Issue a permit
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permitNumber:
 *                 type: string
 *                 example: P-2025-001
 *               busNumber:
 *                 type: string
 *                 example: XYZ-1234
 *               routeId:
 *                 type: string
 *                 example: R-4567
 *               validFrom:
 *                 type: string
 *                 format: date
 *                 example: 2025-03-01
 *               validTo:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *     responses:
 *       201:
 *         description: Permit issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permitNumber:
 *                   type: string
 *                   example: P-2025-001
 *                 busNumber:
 *                   type: string
 *                   example: XYZ-1234
 *                 routeId:
 *                   type: string
 *                   example: R-4567
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                   example: 2025-03-01
 *                 validTo:
 *                   type: string
 *                   format: date
 *                   example: 2025-12-31
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 _id:
 *                   type: string
 *                   example: 647fda3210c845e9d2b1a5b2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-01T10:00:00Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-01T10:00:00Z
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit number already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/admin/permits/view-permit:
 *   get:
 *     summary: Get all permits
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of permits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   permitNumber:
 *                     type: string
 *                     example: P-2025-001
 *                   busNumber:
 *                     type: string
 *                     example: XYZ-1234
 *                   routeId:
 *                     type: string
 *                     example: R-4567
 *                   validFrom:
 *                     type: string
 *                     format: date
 *                     example: 2025-03-01
 *                   validTo:
 *                     type: string
 *                     format: date
 *                     example: 2025-12-31
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *       404:
 *         description: No permits found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/admin/permits/view-permit-id/{id}:
 *   get:
 *     summary: Get permit by ID
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permit ID
 *     responses:
 *       200:
 *         description: Permit details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 647fda3210c845e9d2b1a5b2
 *                 permitNumber:
 *                   type: string
 *                   example: P-2025-001
 *                 busNumber:
 *                   type: string
 *                   example: XYZ-1234
 *                 routeId:
 *                   type: object
 *                   properties:
 *                     routeId:
 *                       type: string
 *                       example: R-4567
 *                     startPoint:
 *                       type: string
 *                       example: Colombo
 *                     endPoint:
 *                       type: string
 *                       example: Kandy
 *                     distance:
 *                       type: number
 *                       example: 120
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                   example: 2025-03-01
 *                 validTo:
 *                   type: string
 *                   format: date
 *                   example: 2025-12-31
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Permit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching permit details
 */

/**
 * @swagger
 * /tp/admin/permits/update-permit/{id}:
 *   put:
 *     summary: Update a permit
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validFrom:
 *                 type: string
 *                 format: date
 *                 example: 2025-04-01
 *               validTo:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Permit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 647fda3210c845e9d2b1a5b2
 *                 permitNumber:
 *                   type: string
 *                   example: P-2025-001
 *                 busNumber:
 *                   type: string
 *                   example: XYZ-1234
 *                 routeId:
 *                   type: string
 *                   example: R-4567
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                   example: 2025-04-01
 *                 validTo:
 *                   type: string
 *                   format: date
 *                   example: 2025-12-31
 *                 isActive:
 *                   type: boolean
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-01T10:00:00Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-04-01T12:00:00Z
 *       404:
 *         description: Permit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tp/admin/permits/remove-permit/{id}:
 *   delete:
 *     summary: Deactivate a permit
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permit ID
 *     responses:
 *       200:
 *         description: Permit deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit deactivated successfully
 *                 deactivatedPermit:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 647fda3210c845e9d2b1a5b2
 *                     permitNumber:
 *                       type: string
 *                       example: P-2025-001
 *                     busNumber:
 *                       type: string
 *                       example: XYZ-1234
 *                     routeId:
 *                       type: string
 *                       example: R-4567
 *                     validFrom:
 *                       type: string
 *                       format: date
 *                       example: 2025-03-01
 *                     validTo:
 *                       type: string
 *                       format: date
 *                       example: 2025-12-31
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: Permit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit not found
 *       500:
 *         description: Server error
 */
