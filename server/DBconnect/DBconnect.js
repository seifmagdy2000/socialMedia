const mongoose = require("mongoose");

const dbUrl = process.env.dbUrl;
DBconnect = async () => {
  try {
    await mongoose.connect(`${dbUrl}`);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DBconnect };
clearImmediate;
