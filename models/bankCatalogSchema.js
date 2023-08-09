const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;
const bankCatalogHelperFunction = require("../utils/bankCatalogHelperFunction");
const BankSchema = new Schema({
  submittedAt: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  uuid: {
    type: String,
    unique: true,
  },
  bankCreationStatus: {
    type: String,
    enum: ["SUBMITTED", "IN_PROGRESS"],
    default: "IN_PROGRESS",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  abbrevation: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  swiftCode: {
    type: String,
    required: true,
    unique: true,
  },
  bankImage: {
    type: String,
    required: true,
  },
});
BankSchema.pre("save", function (next) {
  const error = bankCatalogHelperFunction.areAllFieldsFilled(this);
  if (error) {
    return next(error);
  }
  this.bankCreationStatus = "SUBMITTED";
  this.uuid = uuidv4();
  next();
});

const BankCatalogModel = mongoose.model("BankCatalog", BankSchema);
module.exports = BankCatalogModel;
