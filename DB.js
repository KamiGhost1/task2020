let mysql = require('mysql');

let DB = {
    connect(){
        this.config={
            host:'localhost',
            user:'server',
            password:'serv',
            database:'users2',
            port:'3306'
        }
        this.connection = mysql.createConnection(this.config);
    },
    request(sql,values){
        return new Promise((resolve,reject)=>{
            this.connect.connection.query(sql,values,(err,results)=>{
                if(results === null || results===''){
                    reject(null);
                }else{
                    resolve(results);
                }
            })
        })
    }

}