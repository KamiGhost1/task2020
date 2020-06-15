let mysql = require('mysql2');

class DB {
    config={
        host:'localhost',
        user:'root',
        password:'',
        database:'task',
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
    async dropToken(id){
        let answer = await this.request('update users set token = ? where id = ?',['',id]);
        return answer;
    }
    async setToken(token,id){
        let answer = await this.request('update users set token = ? where id =?',[token,id])
        return answer;
    }
    async checkUserData(login,pass){
        let answer = await this.request('select id from users where login=? && pass=?',[login,pass])
        return answer;
    }
    async getUserInfo(login){
        let answer = await this.request('select id,salt from users where login =?',[login]);
        return answer;
    }
    async get_user_tokenData(id){
        let answer = await this.request('select * from users where id=?',[id])
        return answer;
    }
    async add_task(name,task,id){
        let answer = await this.request('INSERT INTO `tasks` (`name`, `task`, `user_id`, `status`) VALUES ( ?,?,?,?);',[name,task,id]);
        return answer;
    }
    async signUpUser(login,pass,salt){
        let answer = await this.request('INSERT INTO `users` (`login`, `pass`, `salt`) VALUES (?, ?, ?);',[login,pass,salt])
        return answer;
    }
}

module.exports.DB = DB;