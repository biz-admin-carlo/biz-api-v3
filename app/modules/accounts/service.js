const Biz = require('../biz/model');
const mongoose = require('mongoose');
const AppError = require('../../utils/AppError');

const getAgentBiz = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  return await Biz.find({
    isArchived: false,
    userID: objectId
  }).sort({ createdAt: -1 }).lean();
};

const createNewBiz = async (user, data) => {
  const {
    name,
    email,
    phone,
    category,
    location,
    subscriptionName,
    paymentGateway,
    amountTransacted,
    customerEmail,
    agentName
  } = data;

  if (!name || !category || !location || !subscriptionName) {
    throw new AppError('Missing required business fields.', 400);
  }

  const biz = new Biz({
    name,
    email,
    phone,
    categories: [category],
    location,
    subscriptionName,
    paymentGateway,
    amountTransacted,
    customerEmail,
    agentName: agentName || `${user.firstName} ${user.lastName}`,
    agentId: user.userId,
    userID: user.userId, // Owner = agent for now
    isBizDB: true
  });

  await biz.save();

  return biz;
};

const editBizDetails = async (bizId, updates) => {
  const allowedFields = [
    'name', 'email', 'phone', 'bizStatus', 'paymentStatus',
    'subscriptionName', 'paymentGateway', 'amountTransacted', 'customerEmail'
  ];

  const updatePayload = {};
  for (const key of allowedFields) {
    if (updates[key] !== undefined) updatePayload[key] = updates[key];
  }

  const updated = await Biz.findByIdAndUpdate(
    bizId,
    { $set: updatePayload },
    { new: true, runValidators: true }
  );

  if (!updated) throw new AppError('Business not found', 404);

  return updated;
};


module.exports = {
  getAgentBiz,
  createNewBiz,
  editBizDetails
};
