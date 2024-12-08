require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { DBconnect } = require("./server/DBconnect/DBconnect");
const cor = require("cors");
const router = require("./server/routes/routes");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("common"));
app.use(helmet());
app.use(cor());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT} `);
  DBconnect();
});
