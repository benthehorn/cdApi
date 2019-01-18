"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _promise = _interopRequireDefault(require("promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbURI = 'mongodb://127.0.0.1:27017/benseed';
_mongoose.default.Promise = global.Promise;

_mongoose.default.connect(dbURI, {
  userNewUrlParser: true
});

_mongoose.default.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

_mongoose.default.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

_mongoose.default.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  _mongoose.default.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});