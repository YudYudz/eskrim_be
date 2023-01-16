const connectDatabase = require('../database/db');

function stockPOST(req, res) {
  connectDatabase.connection.query(
    `INSERT INTO stock (nama, jenis, jumlah, kadaluarsa) VALUES ('${req.body.nama}','${req.body.jenis}','${req.body.jumlah}','${req.body.kadaluarsa}')`,
    function (err, result) {
      if (err) {
        res.status(400).send({
          message: err,
        });
      } else {
        res.status(201).send({
          message: 'Succesfully Add Stock',
        });
      }
    }
  );
}

function stockGET(req, res) {
  connectDatabase.connection.query(
    `SELECT * FROM stock`,
    function (err, result) {
      if (err) {
        res.status(400).send({
          message: 'Cant Get Stock',
        });
      } else {
        res.status(200).send({
          status: 200,
          data: result,
          message: 'Succesfully Get Product',
        });
      }
    }
  );
}

function stockSearchingName(req, res) {
  console.log(req.params.search);
  
  connectDatabase.connection.query(
    `SELECT * FROM stock WHERE nama LIKE '%${req.params.search}%'`,
    function (err, result) {
      console.log(result);
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        if(result.length == 0) {
          return res.status(200).send({
            message: "Stock Not Found"
          });
        } else {
          return res.status(200).send({
            data: result, 
            message: 'Stock Found',
          });
        }
      }
    } 
  );
}

module.exports = {
 stockPOST,
 stockGET,
 stockSearchingName
}