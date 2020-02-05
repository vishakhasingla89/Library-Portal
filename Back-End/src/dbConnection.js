const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/uca2',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
});


//instance of connection
var db = mongoose.connection;

//for error
db.on('error', function() {
    console.log("Error connecting to db");
})

//for success
db.once('open', function() {
    console.log("Connected to db");
});




