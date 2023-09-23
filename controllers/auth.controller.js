const bcrypt = require("bcrypt");
const Users = require("../model/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.password) {
      return res.status(400).send({
        message: "Password is required!",
      });
    }

    // Hashing
    const hashValue = await bcrypt.hash(payload.password, 15); //firstParam: original Data, secondParam: saltingRounds

    payload.hashedPassword = hashValue;
    delete payload.password;

    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        return res.status(201).send({
          message: "User has been registered successfully.",
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while registering user.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      const isValidUser = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      );

      if (isValidUser) {
        // Encryption
        const token = await jwt.sign(
          { _id: existingUser._id },
          process.env.SECRET_KEY
        );

        res.cookie("accessToken", token, { expire: new Date() + 86400000 });
        return res.status(201).send({
          message: "User has been signed-in successfully.",
        });
      }
      return res.status(401).send({ message: "Invalid Credentials." });
    }

    return res.status(400).send({
      message: "User does not exist",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    return res.status(200).send({
      message: "User has been signed-out successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// Registeration
// Name
// Email
// Password
// Mobile Number
// Role

// Converting data to a random form ->
// Hashing -> Hashing is unidirectional
// Encryption -> Encryption is bidirectional

// Cookie
// Local Storage
// Session Storage
