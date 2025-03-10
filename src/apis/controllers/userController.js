const logger = require("../../utils/logger.js");
const Users = require("../../models/Users.js");

const userCont = async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

module.exports = {userCont}