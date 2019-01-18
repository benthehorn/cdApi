import mongoose from 'mongoose';
import Promise from 'promise';
let dbURI = 'mongodb://127.0.0.1:27017/benseed';
mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {userNewUrlParser: true});

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
