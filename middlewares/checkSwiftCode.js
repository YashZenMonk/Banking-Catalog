const validateswiftPatternCode = (req, res, next) => {
  const { swiftCode } = req.body;
  const swiftCodePattern = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

  const isValid = swiftCodePattern.test(swiftCode);
  if (!isValid) {
    return res.status(400).json({
      error: "Please provide a valid swift code",
    });
  }
  next();
};

module.exports = { validateswiftPatternCode };
