const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./passportConfig')(passport);
const db = require('./db');

dotenv.config();

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  db.connect();
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello Adi');
});

// route yang dibutuhkan untuk oauth google
// 1. redirect the user to the google auth signin page
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  (req, res) => {
    console.log('request to /auth/google');
  }
);

// 2. retrieve the user data using the access token
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    console.log('Response dari google');
    console.log(req.user);
    res.redirect("/profile/");
    // jwt.sign(
    //   { user: req.user },
    //   'secretKey',
    //   { expiresIn: '1h' },
    //   (err, token) => {
    //     if (err) {
    //       return res.json({
    //         token: null,
    //       });
    //     }
    //     res.json({
    //       token,
    //     });
    //   }
    // );
  }
);

// 3. profile route after successfull login
app.get(
  '/profile',
  (req, res) => {
    res.send('Welcome');
  }
  // passport.authenticate('jwt', { session: false }),
  // (req, res, next) => {
  //   res.send('Welcome');
  // }
);
