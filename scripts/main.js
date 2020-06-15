let loguot = async function() {
    console.log(document.cookie);
    await $.get('/logout',()=>{});
    dropCookie();
    window.location.href='/login'
}

let dropCookie = function(){
    document.cookie = 'token = ;max-age=-1'
    document.cookie = 'id = ;max-age=-1'
}

let getTask = function () {
    $.get('/task/get',viewTask)
}

let viewTasks = function (data,status) {
    let table = document.getElementById('content');
    let html = '';
    data.forEach(el=>{
        html+=`<tr><td onclick="changeName(${el.id})">${el.name}</td><td>${el.task}</td><td onclick="changeStatus(${el.id})">${statusRender(el.status)}</td><td><button class="btn btn-success" onclick="viewTask(${el.id})">Смотреть</button></td></tr>`;
    })
    table.innerHTML = html;
}

let changeName = function(id){

}

let statusRender = function(status){

}

let changeStatus = function(id){

}

let viewTask = function (id) {

}

function getUrlVars()
{
    return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/);
}