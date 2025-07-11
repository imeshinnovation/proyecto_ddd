const helpers = require("../libs/helpers");
const logger = require("../libs/logger");
const Users = require("../models/userModel");

const adminMaster = async () => {
  const data = {
    names: "Admin",
    lastnames: "Global",
    idnumber: "987654321",
    phonenumber: "+573007910101",
    email: "admin@demo.co",
    password: "admin1234",
    roll: 1,
    status: 1
  }
  const userExists = await Users.findOne({email:'admin@demo.co'});
  if (!userExists) {
    const newUser = new Users(data);
    await newUser.save();
  }
}

const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({}).lean();
    res.status(200).json(allUsers);
  } catch (e) {
    logger.warn("getUsers: " + e);
    res.status(409).json({ message: e, status: 0 });
  }
};

const getOneUserbyId = async (req, res) => {
  try {
    const userExists = await Users.findById(req.params.id);
    if (!userExists) {
      logger.info("getOneUserbyId: User not found " + id);
      return res.status(404).json({
        message: "User not found",
        status: 0,
      });
    }
    res.status(200).json(userExists);
  } catch (e) {
    logger.warn("getOneUserbyId: " + e);
    res.status(409).json({ message: e, status: 0 });
  }
};

const getOneUserbyEmail = async (req, res) => {
  try {
    const userExists = await Users.findOne({email: req.params.email});
    if (!userExists) {
      logger.info("getOneUserbyEmail: Email not found " + email);
      return res.status(404).json({
        message: "Email not found",
        status: 0,
      });
    }
    res.status(200).json(userExists);
  } catch (e) {
    logger.warn("getOneUserbyEmail: " + e);
    res.status(409).json({ message: e, status: 0 });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = new Users(req.body);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (e) {
    logger.warn("addUser: " + e);
    res.status(409).json({ message: e, status: 0 });
  }
};

const updUser = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const upd = await Users.updateOne({ _id: id }, updateData);
    if (upd.matchedCount === 0) {
      logger.info("updUser: Record not found " + id);
      res.status(404).json({
        message: "Record not found",
        status: 0,
      });
    }
    if (upd.modifiedCount === 1) {
      logger.info("updUser: Update Record " + id);
      res.status(200).json({ message: "Update record", status: 1 });
    } else {
      res.status(423).json({ message: "No update", status: 0 });
    }
  } catch (e) {
    logger.warn("updUser: " + e);
    res.status(401).json({ message: e.errmsg, status: 0 });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userExists = await Users.findById(req.body.id);
    if (!userExists) {
      logger.info("deleteUser: Record not found " + id);
      return res.status(404).json({
        message: "Record not found",
        status: 0,
      });
    }
    const delus = await Users.deleteOne({ _id: req.body.id });
    res.status(200).json({ message: "Deleted user", status: 1 });
  } catch (e) {
    logger.warn("deleteUser: " + e.message);
    res.status(401).json({ message: e.errmsg, status: 0 });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, serviceKey } = req.body;
    const userExists = await Users.findOne({ email: email });
    if (!userExists) {
      logger.info("Login: User not found " + email);
      return res.status(404).json({
        message: "User not found",
        status: 0,
      });
    }
    if (userExists.status === 0) {
      logger.info("Login: Inactive user for " + email);
      return res.status(404).json({
        message: "Inactive user",
        status: 0,
      });
    }
    const validate = await helpers.comparePassword(
      password,
      userExists.password
    );
    if (!validate) {
      logger.info("Login: Invalid credentials for " + email);
      return res.status(404).json({
        message: "Invalid credentials",
        status: 0,
      });
    } else {
      const token = helpers.makeToken({ email }, serviceKey);
      logger.info("Login: New login " + email);
      return res.status(200).json({ token: token });
    }
  } catch (e) {
    logger.warn("Login: " + e);
    res.status(409).json({ message: e.errmsg, status: 0 });
  }
};



module.exports = {
  adminMaster,
  getUsers,
  login,
  addUser,
  updUser,
  deleteUser,
  getOneUserbyId,
  getOneUserbyEmail
};
