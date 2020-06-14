let mysql = require('mysql2');

class DB {
    config={
        host:'localhost',
        user:'root',
        password:'',
        database:'treasurehunt',
        port:'3306'
    }
    connect() {
        this.connection = mysql.createConnection(this.config);
    }
    request(sql,values){
        return new Promise((resolve,reject)=>{
            this.connection.query(sql,values,(err,results)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        })
    }
    async get_user_tokenData(id){
        return this.request('select * from users where id=?',id)
    }
    async add_task(task){
        let answer = await this.request('INSERT INTO `answers` (`answer`, `right_answer`) VALUES (?, 0)',task)
        return answer;
    }
}

module.exports.DB = DB;