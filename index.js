// Panggil Express   
const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const productController = require('./controllers/product');
const usersController = require('./controllers/users');
const stockController = require('./controllers/stock');
const authMiddleware = require('./middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.trim().replaceAll(" ", ""))
  }
})

const upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({extended:true}));

app.use("/img", express.static("image"))



app.get('/api/product/search/:search', productController.productSearchingName);
app.get('/api/product', authMiddleware.authenticateToken, productController.productGET);
app.get('/api/image', function(req, res) {
  res.send("localhost:3000/img")
});
app.post('/product/create-product',upload.single("image") ,productController.productPOST);

app.get('/api/stock/search/:search', stockController.stockSearchingName);
app.get('/api/stock', stockController.stockGET); 
app.post('/stock/create-stock', stockController.stockPOST);

app.post('/users/register', usersController.signUp);
app.post('/users/login', usersController.signIn);
app.post('/api/users/search/:search', usersController.usersSearchingName);

 
app.listen(port, function() {
  console.log(`Server Running on localhost:${port}`);
}); 


// Di Export Controller User
// GW BILANGIN BAPAK LU
// SIAPA NAMANYA?