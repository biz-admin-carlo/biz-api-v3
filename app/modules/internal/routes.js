const express = require('express');
const { getAllUsers, updateAccountType, deleteUserAccount, getUserById, getAllBiz, getAllTransactions } = require('./controller');
const internalMiddleware = require('../../middlewares/internalMiddleware');

const router = express.Router();

router.get('/users/', internalMiddleware, getAllUsers);
router.get('/fetch-user/:userID/', internalMiddleware, getUserById);
router.get('/fetch-biz/', internalMiddleware, getAllBiz);
router.get('/fetch-transactions/', internalMiddleware, getAllTransactions);
router.put('/type-updates/', internalMiddleware, updateAccountType);
router.delete('/users/', internalMiddleware, deleteUserAccount);

module.exports = router;