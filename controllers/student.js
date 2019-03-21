const Student = require('../models').student;
const bcrypt = require('../app.js').bcrypt
const jwt = require('jsonwebtoken');

module.exports = {
  list(req, res) {    
    return Student
      .findAll({ 
        attributes: ['id','name','handphone','email','address'],
        order: [
            ['createdAt', 'DESC'],          
          ],        
      })
      .then((Student) => res.status(200).send(Student))
      .catch((error) => { res.status(400).send(error); });
  },
  getById(req, res) {
    return Student
      .findByPk(req.params.id, {        
        attributes: ['id','name','handphone','email','address','createdAt','updatedAt'], 
      })
      .then((Student) => {
        if (!Student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return res.status(200).send(Student);
      })
      .catch((error) => res.status(400).send(error));
  },
  getSecById(req, res) {
    return Student
      .findByPk(req.user.id, {        
        attributes: ['id','name','handphone','email','address','createdAt','updatedAt'], 
      })
      .then((Student) => {
        if (!Student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return res.status(200).send(Student);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    var body = req.body;
    var hash = bcrypt.hashSync(body.password, 10);   
    return Student
      .create({        
        password:hash,   
        name:body.name,
        email:body.email, 
        handphone:body.handphone, 
        address:body.address, 
      })
      .then((Student) => res.status(201).send(Student))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    var body = req.body;
    var hash = bcrypt.hashSync(body.password, 10);
    return Student
      .findById(req.params.id, {        
      })
      .then(Student => {
        if (!Student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return Student
          .update({            
            password:hash || Student.hash,   
            name:body.name || Student.name,
            email:body.email || Student.email, 
            handphone:body.handphone || Student.handphone, 
            address:body.address || Student.address, 
          })
          .then(() => res.status(200).send(Student))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Student
      .findById(req.params.id)
      .then(Student => {
        if (!Student) {
          return res.status(400).send({
            message: 'Student Not Found',
          });
        }
        return Student
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },  
  signup(req, res){
    var body = req.body;
    var hash = bcrypt.hashSync(body.password, 10);   
    if (!body.email || !body.password) {
        res.status(400).send({msg: 'Please pass email and password.'})
      } else {
        Student
          .create({
            email: body.email,
            password: hash,
            name:body.name,            
            handphone:body.handphone, 
            address:body.address,             
          })
          .then((user) => res.status(201).send(user))
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      }
  },
  signin(req, res) {
    return Student
    .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication failed. User not found.',
          });
        }
                
        let passwordIsValid = false;
        
        if(user.password){
            passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        }else{
            passwordIsValid = req.body.password == user.token;
        }

        if(!passwordIsValid){
            return res.status(401).send({
              status: 0,
              message: 'Email or Password is Incorrect',
            });
          }
        const data = {};
        Object.assign(data, { user });

        var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'secretBanget', {expiresIn: 1 * 3600});

        jwt.verify(token, 'secretBanget', function(err, data){
          console.log(err, data);
        })

        token = 'JWT '+token;

        return res.status(200).send({
            status: 1,
            message: "Authorization Success",
            token,
            // data,
        });                                  
      })
      .catch((error) => res.status(400).send(error));
  },
};