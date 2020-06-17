const mocha = require('mocha');
const chai = require('chai');
const assert = require('assert');
const sub = require('../sub.js')
const DB = require('../DB.js')

let db = new DB.DB
db.connect();
let user ={
    login:sub.hashing('login'),
    salt:sub.hashing('salt'),
    pass:sub.hashing('pass'+this.salt),
}
describe('Проверка подключения к Базе данных',async ()=>{
    it('подключена',async ()=>{
        assert.notEqual(db.connection,undefined)
    })
})
describe("Создание пользователя",async()=>{
    it('Создан',async ()=>{
        let answer = await db.signUpUser(user.login,user.pass,user.pass)
        assert.notEqual(answer,undefined);
    })
    it('Есть в базе',async ()=>{
        let answer = await db.getUserInfo(user.login);
        assert.notEqual(answer[0],undefined)
    })
})

describe('Создание задачи',async ()=>{
    it('задача создана',async ()=>{
        let id = await db.getUserInfo(user.login);
        id = id[0].id
        let answer = await db.addTask('unit test','test',id)
        assert.notEqual(answer,undefined);
    })
    it('проверка задачи',async ()=>{
        let id = await db.getUserInfo(user.login);
        id = id[0].id
        let answer = await db.getTask(id)
        assert.notEqual(answer[0],undefined)
    })
})

describe('Удаление пользователя',async ()=>{
    it('Удален',async ()=>{
        let answer = await db.getUserInfo(user.login);
        let id = answer[0].id
        answer = await db.deleteUser(id)
        assert.notEqual(answer,undefined)
    })
    it('проверка удаления',async ()=>{
        let answer = await db.getUserInfo(user.login)
        assert.equal(answer[0],undefined);
    })
})

