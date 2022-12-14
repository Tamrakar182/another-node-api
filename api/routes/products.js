const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destnation: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); 
    } else {
    cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize:1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



const Product = require('../models/products');

router.get('/', ProductsController.products_get_all);

router.post('/', upload.single('productImage'), checkAuth, ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_edit_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;