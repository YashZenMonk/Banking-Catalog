const uuidPattern =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
const validateUUID = (req, res, next) => {
  const uuid = req.params.uuid;

  // Checking if the UUID matches the pattern
  if (!uuidPattern.test(uuid)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  // If the UUID is valid, continue to the next middleware or route handler
  next();
};

module.exports = {
  validateUUID,
};
