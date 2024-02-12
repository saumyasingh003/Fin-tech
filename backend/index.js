const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors")
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/UserModel");
const session = require("express-session");
const authRoutes = require("./routes/auth")
const transactionsRoutes = require("./routes/transaction")
// Initialize express app

const app = express();
app.use(cors())
env.config();



// Middlewares
app.use(express.json());
app.use('/api', transactionsRoutes)

const sessionOptions = {
  secret: "mypersonalsecret",
  resave: false,
  saveUninitialized: false
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', authRoutes)
mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.45qqwjm.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
  console.log(process.env.MONGO_USER)
// Routes
// app.use("/DocApi/user", require("./routes/UserRouter"));

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
