import express from 'express';
import User from '../models/user';
import auth from './auth';
import passport from 'passport';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {

    res.send(users);
  });

});;
router.post('/', auth.optional,  (req, res) => {
  console.log('password :', req.body.password);
  console.log('User ', req.body.email);
  var newUser = new User({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
  });
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (user) {
      res.json({
        message: 'This user already exists. '
      });
      return;
    } else {
      var newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
      });
      return newUser.save()
        .then(() => res.json({ user: newUser.toAuthJSON() }));
    }
  });
});

router.post('/login', auth.optional, (req, res, next) => {
  const { body: {user} } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
