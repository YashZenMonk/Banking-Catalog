const express = require("express");
const BankCatalogController = require("../controllers/BankCatalog.controller");
const { validateswiftPatternCode } = require("../middlewares/checkSwiftCode");
const { userRequestFilterAndPaginate} = require("../middlewares/userRequestFilterAndPaginate");
const { validateUUID } = require("../middlewares/validateUuid");

const router = express.Router();

//ValidateSwiftCode function will check whether user is providing a right swift code or not and registerBank will register a new Bank
router.route("/").post(validateswiftPatternCode, BankCatalogController.RegisterBank);

//userRequestFilterAndPaginate Middleware and then getAllBanks function will return all bank details
router
  .route("/")
  .get(userRequestFilterAndPaginate, BankCatalogController.GetAllBanks);

//validateUuid Middleware will validate the uuid format and getBanksByUuid will fetch a specific bank details
router
  .route("/:uuid")
  .get(validateUUID, BankCatalogController.GetBanksByUuid);

//validateUuid Middleware will validate the uuid format and deleteBankByUuid will delete a specific bank
router
  .route("/delete-Bank/:uuid")
  .delete(validateUUID, BankCatalogController.DeleteBankByUuid);

//validateUuid Middleware will validate the uuid format and updateBanksByUuid will update a specific bank details
router
  .route("/update-Bank/:uuid")
  .patch(validateUUID, BankCatalogController.UpdateBankByUuid);

module.exports = router;
