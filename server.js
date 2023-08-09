const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectDB = require("./config/connectWithDataBase");

const app = require("./app");

//connect to mongodb
connectDB();
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Bank Catalog Server has started at port : ", port);
});
