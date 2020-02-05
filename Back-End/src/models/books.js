const mongoose = require('mongoose');
require('../dbConnection');

const bookSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    name: String,
    author: String
    
})

const BooksModel = mongoose.model("Books", bookSchema);

BooksModel.findBooks = function (req, callBack) {
    let id = req.query.id;
    let query = {};
    if (id) {
        query = { id: id }
    }
    BooksModel.find(query, callBack);
}

BooksModel.searchBooks = function( req , callBack ){
    
    BooksModel.find({name : { $regex : ".*" + req.query.searchInput + ".*", $options : 'i'}},callBack);
}


BooksModel.addBook = function (req, callBack) {
    let book = req.body;
    BooksModel.create(book, callBack);
}

BooksModel.updateBook = function (req, callBack) {
    let query = { id: req.body.id };
    let book = req.body;
    BooksModel.updateOne(query, book, callBack);
}

BooksModel.deleteBook = function (req, callBack) {
    let query = { id: req.query.id };
    BooksModel.deleteOne(query, callBack);
}

module.exports = BooksModel;
