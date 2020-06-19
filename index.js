let express = require('express');


let port = 3000;

let app = express();
app.use((req,res,next)=>{
    console.log(chalk.green(getTime())+' '+chalk.blue(req.method)+' '+chalk.red(req.url))
    next()
})
app.use();



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(chalk.yellow(`server start on ${port}`))
})
