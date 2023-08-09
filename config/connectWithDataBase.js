const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((database) => {
      console.log(`Connected`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;
