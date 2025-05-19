const express = require('express');
const router = express.Router();
const { getAccountDetails, updateAccountDetails, deleteAccount } = require('./controller');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/account-details/', authMiddleware, getAccountDetails);
router.put('/account-details/', authMiddleware, updateAccountDetails);
router.delete('/delete-account/', authMiddleware, deleteAccount);

module.exports = router;
