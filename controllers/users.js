/* 
 Signin - Signup  using Bcrypt
 

*/

const connection = require("../database/db");
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");
function signUp(req, res) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);


  connection.connection.query(`INSERT INTO users(nama,username,password,no_handphone,alamat) VALUES ('${req.body.name}','${req.body.username}','${hash}','${req.body.no_handphone}','${req.body.alamat}')`,
  function (err, result) {
    if (err) {  
      return res.status(400).send({
      status: 400,
      message: "Username or Password Invalid",
    });
  }  else {
    return res.status(201).send({
      status: 201,
      data: result,
      message: "Succesfully Created Account"
    }) ;
  }
  }) ;
}

function signIn(req, res) {
  connection.connection.query(`SELECT * FROM users WHERE username = '${req.body.username}'`,
  function(err,result) {
    if (err) {
      return res.status(400).send({
        status: 400,
        message: "Username or Password Invalid",
      });
    } else {
      let resPassword = bcrypt.compareSync(req.body.password, result[0].password);

      if (resPassword) {
        let token = jwt.sign({
          data: {
            id: req.body.id,
            username: req.body.username
          },
        },
        'secret',
        { expiresIn: '10h' });
        return res.status(200).send({
          data: {
            id: result[0].id,
            username: result[0].username,
            nama: result[0].nama,
          },
          token: token,
          message: "Succesfully Login", 
        });
      }
    }
  });
}

function usersSearchingName(req, res) {
  console.log(req.params.search);
  
  connection.connection.query(
    `SELECT * FROM users WHERE nama LIKE '%${req.params.search}%'`,
    function (err, result) {
      console.log(result);
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        if(result.length == 0) {
          return res.status(200).send({
            message: "Name Not Found"
          });
        } else {
          return res.status(200).send({
            data: result, 
            message: 'Name Found',
          });
        }
      }
    } 
  );
}

module.exports = {
   signUp,
   signIn,
   usersSearchingName
}
//  Semua Data masuk 
// Result -> Semua Column masuk [Id,Nama,username,password,gambar,dll]
// Nama,username

/*
 data : result 
 
 -> 

 [
   {id: 1, title:"Product"},
   
   {id: 1, title:"Product"},
   
   {id: 1, title:"Product"},
   
   {id: 1, title:"Product"},
 ]

 data: result[0]
 

 result[0]
   {id: 1, title:"Product"},


*/ 