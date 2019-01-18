"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();
/* GET users listing. */


router.get('/', function (req, res, next) {
  _user.default.find({}, function (err, users) {
    res.send(users);
  });
});
;
router.post('/', function (req, res) {
  console.log('password :', req.body.password);
  console.log('User ', req.body.email);
  var newUser = new _user.default({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
  });

  _user.default.findOne({
    email: req.body.email
  }, function (err, user) {
    if (user) {
      res.json({
        message: 'This user already exists. '
      });
      return;
    } else {
      var newUser = new _user.default({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
      });
      console.log('USER before save :', newUser);
      newUser.save(function (err, user) {
        console.log('error in save :', err);
        console.log('USER after save :', user); //req.login(user, err => {

        if (err) {
          console.log(err);
          res.status(420).json({
            message: 'Your user was created, but an error happened in auto-logging you in. '
          });
        } else {
          res.status(201).json({
            message: 'Successfully created new User.'
          });
        } //});

      });
    }
  });
});
module.exports = router;