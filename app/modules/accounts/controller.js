const { getAllBizByRole, createNewBiz, editBizDetails } = require('./service');
const AppError = require('../../utils/AppError');


const getAllBiz = async (req, res, next) => {
  try {
    const { userId, userCode } = req.user;

    const businesses = await getAllBizByRole(userId, userCode);

    return res.status(200).json({
      success: true,
      total: businesses.length,
      data: businesses
    });
  } catch (err) {
    next(err);
  }
};

const createBiz = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;

    const newBiz = await createNewBiz(user, data);

    res.status(201).json({
      success: true,
      message: 'Business created successfully.',
      data: newBiz
    });
  } catch (err) {
    next(err);
  }
};

const editBiz = async (req, res, next) => {
  try {
    const { bizId, updates } = req.body;
    if (!bizId || !updates) throw new AppError('Missing bizId or updates', 400);

    const updatedBiz = await editBizDetails(bizId, updates);

    res.status(200).json({
      success: true,
      message: 'Business updated successfully.',
      data: updatedBiz
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBiz, createBiz, editBiz };