const Role = require("../models/role");

const admin = async (req, res, next) => {
  let role = await Role.findById(req.user.roleId);
  if (!role)
    return res
      .status(400)
      .send("The role does not exist in the database check again");

  if (role.name === "admin") next();
  else return res.status(400).send("User is not authorized");
};
module.exports = admin;
