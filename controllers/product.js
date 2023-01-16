const connectDatabase = require('../database/db');

function productPOST(req, res) {
  connectDatabase.connection.query(`INSERT INTO product (nama, harga, keterangan, gambar) VALUES ('${req.body.nama}', '${req.body.harga}', '${req.body.keterangan}', '${req.file.filename}')`,


  function (err, result) {
    if (err) {
      res.status(400).send({
        message: err,
      });  
    } else {
      res.status(201).send({
        message: "Succesfully Add Product",
      });
    }
  });
}

function productSearchingName(req, res) {
  console.log(req.params.search);
  
  connectDatabase.connection.query(
    `SELECT * FROM product WHERE nama LIKE '%${req.params.search}%'`,
    function (err, result) {
      console.log(result);
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        if(result.length == 0) {
          return res.status(200).send({
            message: "Data Not Found"
          });
        } else {
          return res.status(200).send({
            data: result, 
            message: 'Data Found',
          });
        }
      }
    } 
  );
}

function productGET(req, res) {
  connectDatabase.connection.query(
    `SELECT * FROM product`,
    function (err, result) {
      if (err) {
        res.status(400).send({
          message: "Can't Get Product",
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

module.exports = { 
    productPOST,
    productSearchingName,
    productGET
}; 