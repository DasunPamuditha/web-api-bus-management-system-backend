const express = require('express');
const { operatorLogin, getOperatorProfile } = require('../controllers/busOperatorAuthController');
const operatorProtect = require('../middlewares/operatorAuthMiddleware');

const router = express.Router();

// Bus Operator Login (Public)
router.post('/login', operatorLogin);

// Bus Operator Profile (Protected)
router.get('/profile', operatorProtect, getOperatorProfile);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: BusOperatorAuth
 *   description: Bus operator authentication
 */

/**
 * @swagger
 * /tp/bus-operators/auth/login:
 *   post:
 *     summary: Operator login
 *     tags: [BusOperatorAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: operator@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 operator:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 98765abcde12345
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: operator@example.com
 *                     role:
 *                       type: string
 *                       example: operator
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */

/**
 * @swagger
 * /tp/bus-operators/auth/profile:
 *   get:
 *     summary: Get operator profile
 *     tags: [BusOperatorAuth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Operator profile retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 98765abcde12345
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: operator@example.com
 *                 role:
 *                   type: string
 *                   example: operator
 *       404:
 *         description: Operator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Operator profile not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */
