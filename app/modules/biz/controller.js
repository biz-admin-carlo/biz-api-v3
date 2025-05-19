const { getCombinedBusinessResults, getBusinessesByLatLong, findBizByName } = require('./service');

const searchByLocation = async (req, res, next) => {
  try {
    const { state, category } = req.query;

    if (!state || !category) {
      return res.status(400).json({ success: false, message: 'State and category are required' });
    }

    const { businesses, counts } = await getCombinedBusinessResults(state, category);

    res.status(200).json({
      success: true,
      message: 'Businesses fetched successfully',
      counts,
      data: businesses
    });
  } catch (error) {
    next(error);
  }
};

const searchByGeoCoordinates = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.params;
    const { category } = req.query;

    if (!latitude || !longitude || !category) {
      return res.status(400).json({
        success: false,
        message: 'Latitude, longitude, and category are required'
      });
    }

    const { businesses, counts } = await getBusinessesByLatLong(latitude, longitude, category);

    res.status(200).json({
      success: true,
      message: 'Businesses fetched successfully',
      counts,
      data: businesses
    });
  } catch (err) {
    next(err);
  }
};

const getBizByName = async (req, res, next) => {
  try {
    const { bizName } = req.params;

    if (!bizName) {
      return res.status(400).json({ success: false, message: 'Business name is required' });
    }

    const business = await findBizByName(bizName);

    if (!business) {
      return res.status(404).json({ success: false, message: 'No business found' });
    }

    return res.status(200).json({ success: true, data: business });
  } catch (err) {
    next(err);
  }
};

module.exports = { searchByLocation, searchByGeoCoordinates, getBizByName };
