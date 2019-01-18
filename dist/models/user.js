"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _promise = _interopRequireDefault(require("promise"));

var _ = _interopRequireWildcard(require("lodash"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var UserSchema = new Schema({
  userName: String,
  password: String,
  email: String
});
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.password) {
    var salt = _bcryptjs.default.genSaltSync(10);

    user.password = _bcryptjs.default.hashSync(user.password, salt);
  }

  next();
});

UserSchema.methods.validatePassword = function (password, hash) {
  return new _promise.default(function (resolve, reject) {
    _bcryptjs.default.compare(password, hash, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

module.exports = _mongoose.default.model('User', UserSchema);