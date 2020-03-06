const { User, schemaValidate, schemaLogin } = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  // async create(req, res) {
  //   try {
  //     const { error } = schemaValidate.validate(req.body);
  //     if (error) return res.status(400).send(error.details[0].message);
  //     let user = await User.findOne({ email: req.body.email });
  //     if (user) return res.status(400).send("User already exists.");

  //     user = new User(_.pick(req.body, ["name", "email", "password"]));
  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(user.password, salt);

  //     await user.save();
  //     res.send(_.pick(req.body, ["name"]));
  //   } catch (err) {
  //     res.send(`Something went wrong. Err: ${err}`);
  //   }
  // },

  async login(req, res) {
    try {
      const user = req.body;
      const { error } = schemaLogin.validate(user);
      if (error) return res.status(400).send(error.details[0].message);

      const token = jwt.sign(
        { id: 10, name: user.name },
        process.env.SECRET_KEY
      );
      res.header("x-auth-token", token).send(token);
    } catch (err) {
      res.json({ res: `Something went wrong. Err: ${err}` });
    }
  },

  async home(req, res) {
    try {
      res.json({ res: "Welcome home" });
    } catch (err) {
      res.json({ res: `Something went wrong. Err: ${err}` });
    }
  }
};
