const md5 = require('md5');

let sub = {
    clocks(time){
        if (time < 10){
            return '0'+time
        }else{
            return time
        }
    },
    getTime() {
        let now = new Date()
        let time = `[${this.clocks(now.getHours())}:${this.clocks(now.getMinutes())}:${this.clocks(now.getSeconds())}]`
        return time
    },
    hashing(message){
        let hash = md5(md5(message));
        return hash;
    }
};

module.exports = sub;