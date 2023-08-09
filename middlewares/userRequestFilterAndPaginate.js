const userRequestFilterAndPaginate = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Setting the filter and pagination properties in the request object to pass them to the controller
    req.limit = limit;
    req.page = page;

    next();
  } catch (error) {
    console.error("Error in filtering and pagination middleware:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userRequestFilterAndPaginate };
