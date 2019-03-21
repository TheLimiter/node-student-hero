var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);

const studentController = require('../controllers').student;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/student', studentController.list);
router.get('/api/student/:id', studentController.getById);
router.post('/api/student', studentController.add);
router.put('/api/student/:id', studentController.update);
router.delete('/api/student/:id', studentController.delete);

router.post('/api/student/signin', studentController.signin);
router.post('/api/student/signup', studentController.signup);

router.get('/api/secure/student', passport.authenticate('student', { session: false}), studentController.list);
router.get('/api/secure/student/me', passport.authenticate('student', { session: false}), studentController.getSecById);

module.exports = router;
