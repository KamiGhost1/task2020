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
    console.log(chalk.green(sub.getTime())+' '+chalk.blue(req.method)+' '+chalk.red(req.url))
    next()
})

app.route('/')
    .get(async (req,res)=>{
        if(req.cookies.id && req.cookies.token){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0].token === req.cookies.token){
                res.sendFile(dirPub+'index.html');
                res.status(200);
                res.end;
            }else {
                res.redirect('/login');
            }
        }else{
            res.redirect('/login');
        }

    })
app.route('/login')
    .get(async (req,res)=>{
        if(req.cookies.token && req.cookies.id){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0].token === req.cookies.token){
                res.redirect('/');
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
        let login = req.body.login;
        let password = req.body.password;
        let answer = await db.getUserInfo(login);
        if(answer != null || answer!=''){
            let id = answer[0].id;
            let salt = answer[0].salt;
            password = sub.hashing(password+salt);
            answer = db.checkUserData(login,password);
            if(answer!=null || answer!=''){
                let token = sub.hashing(id+sub.getTime());
                answer = await db.setToken(token,id);
                if(answer!=null || answer!=''){
                    res.cookie('id',id);
                    res.cookie('token',token);
                    res.status(200)
                    res.end;
                }else{
                    res.status(400);
                    res.send('error');
                    res.end
                }
            }else{
                res.send('incorrect data');
                res.status(400);
                res.end
            }
        }else{
            res.send('user dont exist');
            res.status(400)
            res.end
        }
    })
app.route('/signup')
    .get( async (req,res)=>{
        if(req.cookies.token && req.cookies.id){
            let token = await db.get_user_tokenData(req.cookies.id);
            if(token[0].token === req.cookies.token){
                res.redirect('/');
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
    .post(async (req,res)=>{
        let login = req.body.login;
        let pass = req.body.password1;
        let answer = await db.getUserInfo(login)
        if(answer != null || answer!=''){
            res.send('this user exist');
            res.status(400);
            res.end
        }else{
            let salt = sub.hashing(sub.getTime());
            pass = sub.hashing(pass+salt);
            answer = await  db.signUpUser(login,pass,salt);
            if(answer === null){
                res.status(400)
                res.send('error');
                res.end;
            }else{
                res.send('ok');
                res.status(200);
                res.end;
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


app.get('/scripts/main.js',(req,res)=>{
    res.sendFile(dir+'/scripts/main.js')
})

app.get('*',(req,res)=>{
    res.sendFile(dirPub +'error.html')
    res.status(404)
    res.end
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(chalk.yellow(`server start on ${port}`))
})