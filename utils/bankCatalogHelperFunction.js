const areAllFieldsFilled = (bankData) => {
  // Checking for bank details object fields and validations
  if (
    !bankData ||
    !bankData.name ||
    !bankData.abbrevation ||
    !bankData.swiftCode ||
    !bankData.bankImage
  ) {
    throw new Error("All fields must be filled");
  }

  return null; // Return null if all required fields are filled (no error)
};

function removeUnderScoreIds(key,value){
  if (key === '_id'||key==='__v') {
    return undefined;
}
return value;
}

module.exports = {
  areAllFieldsFilled,
  removeUnderScoreIds
};
