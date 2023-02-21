const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
global.__basedir = __dirname;
const ejs = require("ejs");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const helmet = require('helmet');
const passport = require("passport");

const app = express();
const http = require("http");;
const server = http.createServer(app);
const _ = require("lodash");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.options("*", cors());


server.listen(process.env.PORT, () => {
  console.log(`your application is running on ${process.env.PORT}`);
});