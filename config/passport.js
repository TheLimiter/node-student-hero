const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const Student = require('../models').student;

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'secretBanget',
  };

  passport.use('student', new JwtStrategy(opts, function(jwt_payload, done) {       
    Student
      .findByPk(jwt_payload.id)
      .then((Student) => { return done(null, Student); })
      .catch((error) => { return done(error, false); });
  }));  

  // passport.use('admin', new JwtStrategy(opts, function(jwt_payload, done) {       
  //   Student
  //     .findByPk(jwt_payload.id)
  //     .then((Student) => { return done(null, Student); })
  //     .catch((error) => { return done(error, false); });
  // }));  
  

};