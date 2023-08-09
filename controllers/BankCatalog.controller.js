const BankCatalogModel = require("../models/bankCatalogSchema");
const helper = require("../utils/bankCatalogHelperFunction");
const { startSession } = require("mongoose");

//Controller function for registering a Bank
const RegisterBank = async (req, res) => {
  const session = await startSession();
  try {
    const BankData = req.body;
    session.startTransaction();

    const registerBankRequest = new BankCatalogModel(BankData);

    const savedRegisterBankRequest = await registerBankRequest.save();

    const updatedResponse = JSON.parse(
      JSON.stringify(registerBankRequest, helper.removeUnderScoreIds),
      helper.removeUnderScoreIds
    );

    if (savedRegisterBankRequest) {
      await session.commitTransaction();
      res.status(201).json(updatedResponse);
    } else {
      await session.abortTransaction();
      res.status(500).json({
        error:
          "Failed to publish message to RabbitMQ and saving data in database",
      });
    }
  } catch (error) {
    console.log("Error creating Bank", error.message);
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

//Controller function for getting all Banks
const GetAllBanks = async (req, res) => {
  try {
    const limit = req.limit;
    const page = req.page;
    const allBanks = await BankCatalogModel.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const updatedResponse = allBanks.map((item) =>
      JSON.parse(
        JSON.stringify(item, helper.removeUnderScoreIds),
        helper.removeUnderScoreIds
      )
    );

    return res.status(200).json({
      status: "success",
      page: page,
      BanksLength: allBanks.length,
      updatedResponse,
    });
  } catch (error) {
    console.error("Error fetching all-Banks:", error);
    res.status(500).json({ error: error.message });
  }
};

//Controller function for getting a specific banks using uuid
const GetBanksByUuid = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const BankData = await BankCatalogModel.findOne({ uuid });
    if (BankData === null) {
      const message = "Bank not found with id " + uuid;
      return res.status(404).json({ error: message });
    }

    const updatedResponse = JSON.parse(
      JSON.stringify(BankData, helper.removeUnderScoreIds),
      helper.removeUnderScoreIds
    );

    return res.status(200).json({
      status: "success",
      updatedResponse,
    });
  } catch (error) {
    console.error("Error finding request:", error);
    return res.status(500).json({ error: error.message });
  }
};

//Controller function for deleting a specific bank by uuid
const DeleteBankByUuid = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const BankData = await BankCatalogModel.findOneAndDelete({ uuid });
    if (BankData === null) {
      const message = "Bank not found with id " + uuid;
      return res.status(404).json({ error: message });
    }
    return res.status(200).json({
      status: "success",
      message: "Bank Deleted Successfully with id" + uuid,
    });
  } catch (error) {
    console.error("Error finding request:", error);
    return res.status(500).json({ error: error.message });
  }
};

//Controller function for updating a specific bank by uuid
const UpdateBankByUuid = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const updateFields = req.body;

    const UpdateBankDetails = await BankCatalogModel.updateOne(
      { uuid },
      { $set: updateFields }
    );

    return res.status(200).json({
      status: "success",
      UpdateBankDetails,
    });
  } catch (error) {
    console.error("Error updating bank details with uuid:" + uuid, error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  RegisterBank,
  GetAllBanks,
  GetBanksByUuid,
  DeleteBankByUuid,
  UpdateBankByUuid,
};
