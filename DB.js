let mysql = require('mysql2');

class DB {
    connect() {
        this.config = {
            host:'localhost',
            user:'server',
            password:'server',
            database:'task',
            port:'3306'
        }
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
    async addTask(name,task,id){
        let answer = await this.request('INSERT INTO `tasks` (`name`, `task`, `user_id`, `status`) VALUES ( ?,?,?,?);',[name,task,id,0]);
        return answer;
    }
    async signUpUser(login,pass,salt){
        let answer = await this.request('INSERT INTO `users` (`login`, `pass`, `salt`) VALUES (?, ?, ?);',[login,pass,salt])
        return answer;
    }
    async getTask(id){
        let answer = await this.request('select * from tasks where user_id = ?',[id]);
        return answer;
    }
    async changeStatus(id,status){
        let answer = await this.request('update tasks set status = ? where id = ?',[status,id]);
        return answer;
    }
    async changeName(id,name){
        let answer = await this.request('update tasks set name = ? where id = ?',[name,id]);
        return answer;
    }
    async changeTask(id,task){
        let answer = await this.request('update tasks set task = ? where id = ?',[task,id]);
        return answer;
    }
    async getTaskInfo(id){
        let answer = await this.request('select * from tasks where id=?',[id]);
        return answer
    }
    async getSubtaskInfo(taskId){
        let answer = await this.request('select * from subtask where task_id=?',[taskId]);
        return answer;
    }
    async addSubtask(task_id,task){
        let answer = await this.request('INSERT INTO `subtask` (`task_id`, `task`, `status`) VALUES (?,?,?);',[task_id,task,0])
        return answer
    }
    async listTask(user_id){
        let answer = await this.request('select * from tasks where user_id =?',[user_id])
        return answer
    }
    async deleteTask(id){
        let answer = await this.getSubtaskInfo(id);
        if(answer[0]!=undefined){
            for(let i=0;i<answer.length;i++){
                this.deleteSubtask(answer[i].id);
            }
        }
        answer = await this.request('delete from tasks where id=?',[id])
        return answer;
    }
    async deleteSubtask(id){
        let answer = await this.request('delete from subtask where id=?',[id])
        return answer
    };
    async changeSubStatus(id,status){
        let answer = await this.request('update subtask set status = ? where id = ?',[status,id]);
        return answer;
    }
    async changeSubtask(id,task){
        let answer = await this.request('update subtask set task = ? where id = ?',[task,id]);
        return answer;
    }
    async deleteJustUser(id){
        let answer = await this.request('delete from users where id=?',[id])
        return answer
    }
    async deleteUser(id){
        let answer =await this.listTask(id);
        if(answer[0]!=undefined){
            for(let i=0;i<answer.length;i++){
                this.deleteTask(answer[i].id)
            }
        }
        let del = await this.deleteJustUser(id)
        return del;
    }
}

module.exports.DB = DB;