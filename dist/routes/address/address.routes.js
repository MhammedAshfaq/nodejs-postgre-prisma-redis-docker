"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../../controller/address/address.controller");
const router = (0, express_1.Router)();
const addressController = new address_controller_1.AddressController();
/**
 * @swagger
 * tags:
 *   name: Address
 *   description: User Address management
 */
/**
 * @swagger
 * /user-address/create:
 *   post:
 *     summary: Create a new user Address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address1
 *               - city
 *               - state
 *               - district
 *               - userId
 *             properties:
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User address created successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     address1:
 *                       type: string
 *                     address2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     district:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Internal server error
 */
router.post("/create", addressController.createUserAddress);
/**
 * @swagger
 * /user-address/update/{id}:
 *   patch:
 *     summary: Update user address details
 *     tags: [Address]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     address1:
 *                       type: string
 *                     address2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     district:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: User address not found or bad request
 *       500:
 *         description: Internal server error
 */
router.patch("/update/:id", addressController.updateUserAddress);
/**
 * @swagger
 * /user-address/delete/{id}:
 *   delete:
 *     summary: Delete a user address by ID
 *     tags: [Address]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user address to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User address deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User address deleted successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: User address not found or bad request
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", addressController.deleteUserAddress);
/**
 * @swagger
 * /user-address/get/{id}:
 *   post:
 *     summary: Get a user address by ID
 *     tags: [Address]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user address to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User address data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User address data retrived successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     address1:
 *                       type: string
 *                     address2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     district:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
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
router.post("/get/:id", addressController.getUserAddress);
exports.default = router;
