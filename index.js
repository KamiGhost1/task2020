const express = require('express');
const fs = require('fs');
const md5 = require('md5');
const request = require('request');
const bP = require('body-parser');
const cP = require('cookie-parser');
const chalk = require('chalk');
const sub = require('./sub.js');
const DB = require('./DB');

const port = 3000;
const  dir = __dirname
const dirPub = __dirname+'/public/'
let db = new DB.DB;
db.connect();

//  check = async function(){
//     console.log(await db.get_user_tokenData(2));
// }
// check()

let app = express();
app.use(cP())
app.use(bP.urlencoded({extended:false}))
app.use(bP.json())
app.use((req,res,next)=>{
    console.log(chalk.green(sub.getTime())+' '+chalk.blue(req.method)+' '+chalk.red(req.url))
    next()
})

app.route('/')
    .get(async (req,res)=>{
        res.sendFile(dirPub+'index.html');
    })
app.route('/login')
    .get(async (req,res)=>{
        if(req.cookies.token && req.cookies.id){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0].token === req.cookies.token){
                res.require('/');
            }
            else{
                res.sendFile(dirPub+'login.html')
                res.status(400);
                res.end
            }
        }else{
            res.sendFile(dirPub+'login.html');
            res.status(200);
            res.end;
        }
    })
    .post(async (req,res)=>{

    })
app.route('/signup')
    .get( async (req,res)=>{
        if(req.cookies.token && req.cookies.id){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0].token === req.cookies.token){
                res.require('/');
            }
            else{
                res.sendFile(dirPubr+'signup.html')
                res.status(400);
                res.end
            }
        }else{
            res.sendFile(dirPub+'signup.html');
            res.status(200);
            res.end;
        }
    })
app.get('/scripts/main.js',(req,res)=>{
    res.sendFile(dir+'/scripts/main.js')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(chalk.yellow(`server start on ${port}`))
})