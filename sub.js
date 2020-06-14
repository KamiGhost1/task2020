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
};

module.exports = sub;