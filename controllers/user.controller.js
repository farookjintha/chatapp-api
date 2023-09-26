const Users = require("../model/user.model");

exports.getUser = async (req, res) => {
  try {
    const { id } = req;

    let user = await Users.findById(id);

    if (user) {
      user = user.toObject();
      delete user.hashedPassword;
      return res.status(200).send({ success: true, user: user });
    }
    return res
      .status(400)
      .send({ success: false, message: "User does not exist." });
  } catch (error) {
    console.log("Error while getting Users: ", error);
    res.status(500).send({ message: "Interal Server Error" });
  }
};
