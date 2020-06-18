let mysql = require('mysql2');

/**
 * @class DB
* */
class DB {
    /**
     * Функция устанавливает соединение с базой данных
     * @function DB~connect
     * @return {connection()}
     * */
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
    /**
     * Функция выполняет запрос к базе данных
     * @function DB~request
     * @param {string} sql - Sql запрос
     * @param {string} values - значения для вставки вместо символа '?'
     * @return {Promise}
     * */
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
    /**
     * Функция удаляет токен из базы банных при разлогине пользователя
     * @function DB~dropToken
     * @param {string} id - id пользователя
     * @return {Promise}
    * */
    async dropToken(id){
        let answer = await this.request('update users set token = ? where id = ?',['',id]);
        return answer;
    }
    /**
     * Функция устанавливает токен при авторизации пользователя
     * @function DB~setToken
     * @param {string} token - токен пользователя
     * @param {string} id - id пользователя
     * @return {Promise}
     * */
    async setToken(token,id){
        let answer = await this.request('update users set token = ? where id =?',[token,id])
        return answer;
    }
    /**
     * Функция возвращает id пользователя
     * @function DB~checkUserData
     * @param {string} login - логин пользователя
     * @param {string} pass - пароль пользователя
     * @return {Promise}
     * */
    async checkUserData(login,pass){
        let answer = await this.request('select id from users where login=? && pass=?',[login,pass])
        return answer;
    }
    /**
     * функция возвращает id и соль для проверки пароля
     * @function DB~getUserInfo
     * @param {string} login - логин пользователя
     * @return {Promise}
     * */
    async getUserInfo(login){
        let answer = await this.request('select id,salt from users where login =?',[login]);
        return answer;
    }
    /**
     * Функция возвращает всю информацию по пользователю из базы данных
     * @function DB~get_user_tokenData
     * @param {string} id - id пользователя
     * @return {Promise}
     * */
    async get_user_tokenData(id){
        let answer = await this.request('select * from users where id=?',[id])
        return answer;
    }
    /**
     * функция добавдяет задачу в базу данных
     * @function DB~addTask
     * @param {string} name - название задачи
     * @param {string} task - задача
     * @param {string} id - id ползователя, которому добавить задачу
     * @return {Promise}
     * */
    async addTask(name,task,id){
        let answer = await this.request('INSERT INTO `tasks` (`name`, `task`, `user_id`, `status`) VALUES ( ?,?,?,?);',[name,task,id,0]);
        return answer;
    }
    /**
     * Функция добавления пользователя в базу данных
     * @function DB~signUpUser
     * @param {string} login - логин пользователя
     * @param {string} pass - "соленый" пароль
     * @param {string} salt - соль
     * @return {Promise}
     * */
    async signUpUser(login,pass,salt){
        let answer = await this.request('INSERT INTO `users` (`login`, `pass`, `salt`) VALUES (?, ?, ?);',[login,pass,salt])
        return answer;
    }
    /**
     * Функция возвращает все задачи пользователя
     * @function DB~getTask
     * @param {string} id - id пользователя
     * @return {Promise}
     * */
    async getTask(id){
        let answer = await this.request('select * from tasks where user_id = ?',[id]);
        return answer;
    }
    /**
     * функция меняет значение статуса задачи
     * @function DB~changeStatus
     * @param {string} id - id задачи
     * @param {boolean} status - статус задачи
     * @return {Promise}
     * */
    async changeStatus(id,status){
        let answer = await this.request('update tasks set status = ? where id = ?',[status,id]);
        return answer;
    }
    /**
     * Функция обновляет название задачи
     * @function DB~changeName
     *@param {string} id - id задачи
     * @param {string} name - новое название
     * @return {Promise}
     * */
    async changeName(id,name){
        let answer = await this.request('update tasks set name = ? where id = ?',[name,id]);
        return answer;
    }
    /**
     * Функция изменения задачи
     * @function DB~changeTask
     * @param {string} id - id задачи
     * @param {string} task - измененная задача
     * @return {Promise}
     * */
    async changeTask(id,task){
        let answer = await this.request('update tasks set task = ? where id = ?',[task,id]);
        return answer;
    }
    /**
     * Функция возвращает всю информацию по задаче
     * @function DB~getTaskInfo
     * @param {string} id - id задачи
     * @return {Promise}
     * */
    async getTaskInfo(id){
        let answer = await this.request('select * from tasks where id=?',[id]);
        return answer
    }
    /**
     * Функция возвращает все подзадачи
     * @function DB~getSubtaskInfo
     * @param {string} id - id задачи
     * @return {Promise}
     * */
    async getSubtaskInfo(taskId){
        let answer = await this.request('select * from subtask where task_id=?',[taskId]);
        return answer;
    }
    /**
     * Функция добавляет подзадачу
     * @function DB~addSubtask
     * @param {string} task_id - id задачи
     * @param {string} task - подзадача
     * @return {Promise}
     * */
    async addSubtask(task_id,task){
        let answer = await this.request('INSERT INTO `subtask` (`task_id`, `task`, `status`) VALUES (?,?,?);',[task_id,task,0])
        return answer
    }
    /**
     * Функция возвращает все задачи пользователя
     * @function DB~listTask
     * @param {string} user_id - id пользователя
     * @return {Promise}
     * */
    async listTask(user_id){
        let answer = await this.request('select * from tasks where user_id =?',[user_id])
        return answer
    }
    /**
     * Функция удаляет задачу
     * @function DB~deleteTask
     * @param {string} id - id задачи
     * @return {Promise}
     * */
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
    /**
     * функция удаляет подзадачу
     * @function DB~deleteSubtask
     * @param {string} id - id подзадачи
     * @return {Promise}
     * */
    async deleteSubtask(id){
        let answer = await this.request('delete from subtask where id=?',[id])
        return answer
    };
    /**
     * Функция меняет статус подзадачи
     * @function DB~changeSubStatus
     * @param {string} id -id подзадачи
     * @param {boolean} status - статус
     * @return {Promise}
     * */
    async changeSubStatus(id,status){
        let answer = await this.request('update subtask set status = ? where id = ?',[status,id]);
        return answer;
    }
    /**
     * Функиця изменяет подзадачу
     * @function DB~changeSubtask
     * @param {string} id - id подзадачи
     * @param {string} task - измененная подзадача
     * @return {Promise}
     * */
    async changeSubtask(id,task){
        let answer = await this.request('update subtask set task = ? where id = ?',[task,id]);
        return answer;
    }
    /**
     * Функция удаляет только пользователя, оставляя его задачи
     * @function DB~deleteJustUser
     * @param {string} id - id пальзователя
     * @return {Promise}
     * */
    async deleteJustUser(id){
        let answer = await this.request('delete from users where id=?',[id])
        return answer
    }
    /**
     * функция удаляет пользователя и все задачи с подзадачами
     * @function DB~deleteUser
     * @param {string} id - id пользователя
     * @return {Promise}
     * */
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