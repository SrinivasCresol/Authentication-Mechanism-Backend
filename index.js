require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./db/Connect");
const router = require("./Router/Routes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
