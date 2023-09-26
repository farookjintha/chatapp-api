const Users = require("../model/user.model");

exports.isAdmin = async (req, res, next) => {
  const { id } = req;
  const user = await Users.findOne({ _id: id });
  if (user.role != 0) {
    return res.status(401).send({ message: "Unauthorized: Admin Resource" });
  }

  next();
};
