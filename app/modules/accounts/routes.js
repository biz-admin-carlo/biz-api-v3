const express = require('express');
const { getAllBizForAgent, createBiz, editBiz, getAllBizForSuper } = require('./controller');
const agentOnly = require('../../middlewares/agentMiddleware');
const privilegedOnly = require('../../middlewares/privilegedMiddleware');

const router = express.Router();

router.get('/get-bizness/', agentOnly, getAllBizForAgent);
router.get('/get-bizness/super', agentOnly, getAllBizForSuper);
router.post('/create-biz/', agentOnly, createBiz);
router.put('/edit-biz/', privilegedOnly, editBiz);

module.exports = router;
