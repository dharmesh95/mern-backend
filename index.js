const express = require("express");
var cors = require("cors");
const signUpRoute = require("./routes/api/sign-up-route");
const connectDB = require("./config/connectDB");

const app = express();
app.use(cors());
app.use(express.json());

//connect to db
connectDB();

const SIGN_UP_ENDPOINT = "/api/sign-up";

app.get("/", (req, res) => {
  res.redirect(SIGN_UP_ENDPOINT);
});

app.use(SIGN_UP_ENDPOINT, signUpRoute);

app.listen(8080);
