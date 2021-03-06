const express = require("express");
var cors = require("cors");
const signUpRoute = require("./routes/api/sign-up-route");
const loginRoute = require("./routes/api/login-route");
const cartRoute = require("./routes/api/cart-route");
const connectDB = require("./config/connectDB");

const app = express();
app.use(cors());
app.use(express.json());

//connect to db
connectDB();

const SIGN_UP_ENDPOINT = "/api/sign-up";
const LOGIN_ENDPOINT = "/api/login";
const CART_ENDPOINT = "/api/cart";

app.get("/", (req, res) => {
  res.redirect(SIGN_UP_ENDPOINT);
});

app.use(SIGN_UP_ENDPOINT, signUpRoute);
app.use(LOGIN_ENDPOINT, loginRoute);
app.use(CART_ENDPOINT, cartRoute);

app.listen(process.env.PORT || 8080);
