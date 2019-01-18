import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Promise from "promise";
import * as _ from "lodash";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  password: String,
  email: String
});

UserSchema.pre("save", function(next) {
  var user = this;
  if (user.password) {
    let salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
  next();
});

UserSchema.methods.validatePassword = function(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    "benssecret"
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", UserSchema);
