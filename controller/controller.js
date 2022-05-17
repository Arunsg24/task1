'use strict';
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const { authSchema } = require('../validation/validate')
const  User = require('../model/usermodel')

exports.register = async function (req, res) {
  try {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    const result = await authSchema.validateAsync(req.body)
    console.log(result)
    newUser.save(function (err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.password = undefined;
        return res.json(user);
      }
    });
  } catch (error) {
    res.status(200).json({ message: error?.message || error })
  }
};

exports.sign_in = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  }
  else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};