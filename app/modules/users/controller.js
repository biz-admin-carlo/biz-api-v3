const { fetchAccountDetails, updateUserInfo, deactivateUserAccount, fetchAllUsers, fetchUserById } = require('./service');

const getAccountDetails = async (req, res, next) => {
  try {
    const user = await fetchAccountDetails(req.user.userId);
    res.status(200).json({ success: true, data: user, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
};

const updateAccountDetails = async (req, res, next) => {
  try {
    const updated = await updateUserInfo(req.user.userId, req.body);
    res.status(200).json({ success: true, message: 'Account updated successfully', data: updated });
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await deactivateUserAccount(req.user.userId);
    res.status(200).json({
      success: true,
      message: 'Account has been deactivated successfully'
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({
      success: true,
      data: users,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await fetchUserById(userID);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAccountDetails,
  updateAccountDetails,
  deleteAccount,
  getAllUsers,
  getUserById
};