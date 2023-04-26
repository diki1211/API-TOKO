const userModel = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    let [userIsExist] = await userModel.userIsExist(email);
    if (userIsExist.length === 1) {
      user = userIsExist[0];
      if (password == user.password) {
        jsonwebtoken.sign(
          {
            email: user.email,
          },
          SECRET_KEY,
          (err, token) => {
            res.status(200).json({
              status: 200,
              timestamp: new Date().toLocaleTimeString(),
              message: "Login telah berhasil berikut tokennya",
              token,
            });
          }
        );
      } else {
        res.status(401).json({
          status: 401,
          timestamp: new Date().toLocaleTimeString(),
          message: "Aduh maaf password yang dimasukkan tidak sesuai nih",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const registrasi = async (req, res) => {
  const { password } = req.body;
  const { email } = req.body;
  const [userIsExist] = await userModel.userIsExist(email);
  if (userIsExist.length === 1) {
    res.status(400).json({
      status: 400,
      timestamp: new Date().toLocaleTimeString(),
      message: "Aduh maaf emailnya udah dipake, masukkan email yang lain",
    });
  } else {
    try {
      await userModel.insertNewUser(email, password);
      res.status(201).json({
        status: 201,
        timestamp: new Date().toLocaleTimeString(),
        message: "Register berhasil nih, udah bisa login",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        timestamp: new Date().toLocaleTimeString(),
        message: error,
      });
    }
  }
};

module.exports = {
  login,
  registrasi,
};
