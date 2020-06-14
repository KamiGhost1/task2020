const express = require('express');
const fs = require('fs');
const md5 = require('md5');
const request = require('request');
const bP = require('body-parser');
const cP = require('cookie-parser');


const port = 3000;
const dir = __dirname

let app = express();

app.use(cP())
app.use(bP.urlencoded({extended:false}))
app.use(bP.json())
app.use((req,res,next)=>{
    console.log(chalk.green(getTime())+' '+chalk.blue(req.method)+' '+chalk.red(req.url))
    next()
})

app.route('/')
    .get((req,res)=>{

    })

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(chalk.yellow(`server start on ${port}`))
})