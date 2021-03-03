const express = require("express");

var Kavenegar = require("kavenegar");
const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017/dbTest");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  password: String,
});

const user = mongoose.model("user", userSchema);

require("dotenv").config();

const app = express();
app.use(express.json()).use(express.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
  const props = { username: req.body.username, password: req.body.password };

  const existUser = await user.findOne({
    username: props.username,
    password: props.password,
  });

  if (existUser) {
    res.send({
      status: "SUCCESS",
      message: "Login User Success Full",
    });
  }
});

app.post("/register", async (req, res) => {
  const props = { username: req.body.username, password: req.body.password };

  const User = await user.create(props);

  sendSms(User);

  res.send({
    status: "SUCCESS",
    message: "Register User Successful",
    data: User,
  });
});
app.listen(process.env.PORT, () => {
  console.log("Connect To server....", process.env.PORT);
});

const sendSms = (message) => {
  var api = Kavenegar.KavenegarApi({
    apikey:
      "5857725A32363365585445663075544237586462317A715744637A6F59326A5A30554D6F32357166634A553D",
  });

  api.Send({
    message,
    sender: "1000596446",
    receptor: "09055709179",
  });
};



// http://localhost:3800/register
// http://localhost:3800/login
