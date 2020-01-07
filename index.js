const express = require('express');
const jwt=require('jsonwebtoken');
const app=express();
app.get('/api',(req,res)=>{
    res.json({
        message: 'Welome to the API'
    });
});
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post Created',
                authData
            })
        }
    })
    res.json({
        message: 'post created....'
    });
});
app.post('/api/login',(req,res)=>{
    //create user
    const user={
        id: 1,
        username: 'prachi',
        email: 'prachi@gmail.com'
    }
    jwt.sign({user: user},'secretkey',(err,token)=>{
        res.json({
            token: token
        });
    });
});
function verifyToken(req,res,next){
    // Authenticate
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        //console.log(bearer[1]);
        req.token=bearerToken;
        next();
    }
    else {
        // Forbidden
        console.log('verify');
        res.sendStatus(403);
    }
}
app.listen(3000,()=>console.log('Server gets started'));