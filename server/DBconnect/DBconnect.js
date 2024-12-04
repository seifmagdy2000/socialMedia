const mongoose = require("mongoose");

const dbUrl = process.env.dbUrl;
function DBconnect() {
  try {
    mongoose.connect(`${dbUrl}`);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { DBconnect };
clearImmediate;
