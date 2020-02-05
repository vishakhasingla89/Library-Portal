const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../dbConnection');
const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    age: Number,
    isEnabled: Boolean
})

//create a model from schema.
//model is that class from which we will create users.
const UsersModel = mongoose.model("Users",usersSchema);


//attching a function to UsersModel class.
UsersModel.findUsers = function (req,callBack) {
    //console.log('model was called');
    var uname=req.session.userName;
    console.log(uname);
    let query={};
    if(uname)
    {
        query = { userName : uname}
    }
    UsersModel.findOne(query, callBack);  //call find function of mongoose.

}

UsersModel.findUserForLogin = function(req,callBack){
    UsersModel.findOne({userName: req.body.userName})
    .exec(function(err,user){
      if(err){
        console.log('error');
        return callBack(err,null)
      }
      else if(!user){
        console.log('user not found');
        return callBack(err,null);
      }
         bcrypt.compare(req.body.password, user.password).then((res) => {
          // res === true
          if(res === true)
          callBack(err,user);
          else
          callBack(err,null);
      });
   })
}

UsersModel.addUsers = function(req,callBack) {
    let user=req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash1 = bcrypt.hashSync(user.password, salt);
    user.password=hash1;
    UsersModel.create(user,callBack);
}

UsersModel.updateUsers = function(req,callBack) {
    let query={ _id : req.body._id};
    let user=req.body;
    UsersModel.updateOne(query,user,callBack);
}

module.exports = UsersModel;