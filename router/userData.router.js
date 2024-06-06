const express = require('express');
const { getUserData, registerUser, loginUser,logoutUser } = require('../controller/userData.controller');
const { verifyToken } = require('../middlewares/helpers');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /registerUser:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with full name, username, password, and about section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               about:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Registration failed
 */
router.post('/registerUser', registerUser);

/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: Login as a user
 *     description: Login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request - Login failed
 */
router.post('/loginUser', loginUser);

/**
 * @swagger
 * /getUserData:
 *   get:
 *     summary: Get user data
 *     description: Retrieve user data by token
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/getUserData', verifyToken, getUserData);

router.post('/logoutUser', verifyToken, logoutUser);

module.exports = router;
