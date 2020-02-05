const express = require('express');
const router = express.Router();
const BooksModel = require('./../models/books');

router.get('/bookList', (req, res) => {
    BooksModel.findBooks(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.get('/searchBook', (req, res) => {
    BooksModel.searchBooks(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.post('/form', (req, res) => {
    BooksModel.addBook(req, (error, response) => {
        console.log('hello');
        if (error) 
        res.status(400).send({message: 'Id already taken.'});
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.put('/editBook', (req, res) => {
    BooksModel.updateBook(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.delete('/remove', (req, res) => {
    BooksModel.deleteBook(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = router;
