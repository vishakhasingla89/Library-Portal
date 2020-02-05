const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const UsersModel = require('./../models/users.js');

router.get('',(req,res)=>{
    console.log('route was called');
    UsersModel.findUsers(req,(error,response)=>{   
        if(error)
        console.log("error: ",error);
        if(response)
        console.log("response: ",response); 
        res.send(response);
     })
    
})



router.post('/login',(req,res)=>{
    
    UsersModel.findUserForLogin(req,(error,response)=>{
        if(error) {
            console.log('Error Occurred');
            res.status(400).send(error);
        }
        if (response) { 
            if (response!=null) {
                req.session.userName = response.userName;
                console.log("Success response is: ",JSON.stringify(response));
                res.status(200).send(response);
            } else {
                return res.status(404).send();
            }
        }
        
    })
})
router.post('/add',(req,res)=>{
    UsersModel.addUsers(req,(error,response)=>{
        if(error)
        console.log('error occured.user not added.',error);
        if(response)
        {
            //req.userName = response.userName;
            console.log('successful: ',response,' added.');
            res.send(response);
        }
    })
})


router.get('/getUsername', (req,res)=>{
    
    console.log("req.userName ", req.session.userName);
    return res.json(req.session.userName);
})

router.put('/update',(req,res)=>{
    UsersModel.updateUsers(req,(error,response)=>{
        if(error)
        console.log('error occured. user not added ',error)
        if(response)
        {
            console.log('successful ',response);
            res.send(response);

        }
    })
})




module.exports = router;

