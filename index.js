const express = require('express');
const fs = require('fs');
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
    console.log((sub.getTime())+' '+(req.method)+' '+(req.url))
    next()
})

// ---------------------------------------------------------------------------------------------------------------------
app.route('/')
    .get(async (req,res)=>{
        if(req.cookies.id && req.cookies.token){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0]!=undefined){
                if(token[0].token === req.cookies.token){
                    res.status(200);
                    res.sendFile(dirPub+'index.html');
                    res.end;
                }else {
                    res.redirect('/login');
                }
            }else{
                res.status(401);
                res.end
            }

        }else{
            res.redirect('/login');
        }

    })
app.route('/login')
    .get(async (req,res)=>{
        if(req.cookies.token && req.cookies.id){
            let token = await db.get_user_tokenData(req.cookies.id);
            if (token[0]!=undefined){
                if(token[0].token === req.cookies.token){
                    res.redirect('/');
                }
                else{
                    res.status(400);
                    res.sendFile(dirPub+'login.html')
                    res.end
                }
            }else{
                res.status(401);
                res.end;
            }

        }else{
            res.status(200);
            res.sendFile(dirPub+'login.html');
            res.end;
        }
    })
    .post(async (req,res)=>{
        let login = req.body.login;
        let password = req.body.password;
        let answer = await db.getUserInfo(login);
        if(answer[0]!=undefined || answer==='' ){
            let id = answer[0].id;
            let salt = answer[0].salt;
            password = sub.hashing(password+salt);
            answer = await db.checkUserData(login,password);
            if(answer[0]!=undefined){
                let token = sub.hashing(id+sub.getTime());
                answer = await db.setToken(token,id);
                if(answer!=null || answer!=''){
                    res.cookie('id',id);
                    res.cookie('token',token);
                    res.status(200)
                    res.send('ok')
                    res.end;
                }else{
                    res.status(400);
                    res.send('error');
                    res.end
                }
            }else{
                res.status(400);
                res.send('incorrect data');
                res.end
            }
        }else{
            res.status(400)
            res.send('user dont exist');
            res.end
        }
    })
app.route('/signup')
    .get( async (req,res)=>{
        if(req.cookies.token && req.cookies.id){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0]!=undefined){
                if(token[0].token === req.cookies.token){
                    res.redirect('/');
                }
                else{
                    res.status(400);
                    res.sendFile(dirPubr+'signup.html')
                    res.end
                }
            }else{
                res.status(401)
                res.send('non auth')
                res.end
            }
        }else{
            res.status(200);
            res.sendFile(dirPub+'signup.html');
            res.end;
        }
    })
    .post(async (req,res)=>{
        let login = req.body.login;
        let pass = req.body.password1;
        let pass1 = req.body.password2;
        if(pass!=pass1){
                res.status(400);
                res.send('passwords not equal');
                res.end
        }else{
            let answer = await db.getUserInfo(login)
            if(answer[0] != undefined){
                res.status(400);
                res.send('this user exist');
                res.end
            }else{
                let salt = sub.hashing(sub.getTime());
                pass = sub.hashing(pass+salt);
                answer = await  db.signUpUser(login,pass,salt);
                if(answer === undefined || answer===null || answer ===''){
                    res.status(400)
                    res.send('error');
                    res.end;
                }else{
                    res.status(200);
                    res.send('ok');
                    res.end;
                }
            }
        }

    })

app.route('/logout')
    .get(async (req,res)=>{
        if(req.cookies.id){
            db.dropToken(req.cookies.id);
            res.status(200);
            res.send('ok');
            res.end;
        }else{
            res.redirect('/login');
            res.end
        }
        }
    )

// ---------------------------------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------------------------------
app.get('/scripts/main.js',(req,res)=>{
    res.sendFile(dir+'/scripts/main.js')
})

app.get('*',(req,res)=>{
    res.status(404)
    res.sendFile(dirPub +'error.html')
    res.end
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server start on ${port}`)
})