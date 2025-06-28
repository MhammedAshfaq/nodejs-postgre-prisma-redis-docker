"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controller/user/user.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: User not found or bad request
 *       500:
 *         description: Internal server error
 */
router.post("/create", userController.createUser);
/**
 * @swagger
 * /user/update/{id}:
 *   patch:
 *     summary: Update user details
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: User not found or bad request
 *       500:
 *         description: Internal server error
 */
router.patch("/update/:id", userController.updateUser);
/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: User not found or bad request
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", userController.deleteUser);
/**
 * @swagger
 * /user/get/{id}:
 *   post:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User data retrived successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     Address:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           address1:
 *                             type: string
 *                           address2:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           district:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       400:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/get/:id", userController.getUser);
/**
 * @swagger
 * /user/list:
 *   post:
 *     summary: Get list of users with optional search and pagination
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name to search (partial match)
 *                 example: John
 *               page:
 *                 type: integer
 *                 default: 1
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 default: 10
 *                 example: 10
 *     responses:
 *       200:
 *         description: Users list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User data retrived successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       Address:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             address1:
 *                               type: string
 *                             address2:
 *                               type: string
 *                             city:
 *                               type: string
 *                             state:
 *                               type: string
 *                             district:
 *                               type: string
 *                             userId:
 *                               type: string
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Bad request or user not found
 *       500:
 *         description: Internal server error
 */
router.post("/list", userController.getUsersList);
exports.default = router;
