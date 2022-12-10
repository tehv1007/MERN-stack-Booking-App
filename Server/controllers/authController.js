const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const username = await User.findOne({ username: req.body.username });
  const email = await User.findOne({ email: req.body.email });
  if (username) {
    return next(createError(403, "This username is already registered"));
  } else if (email) {
    return next(createError(403, "This email is already registered"));
  } else
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
      });

      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
