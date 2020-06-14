let express = require('express');


let port = 3000;

let app = express();




app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(chalk.yellow(`server start on ${port}`))
})