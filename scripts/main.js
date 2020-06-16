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
    $.get('/task/get',viewTasks)
}

let viewTasks = function (data,status) {
    if(data[0]!=undefined){
        let table = document.getElementById('content');
        let html = '';
        data.forEach(el=>{
            html+=`<tr><td onclick="changeName(${el.id})">${el.name}</td><td onclick="changeTask(${el.id})">${el.task}</td><td onclick="changeStatus(${el.id},${el.status})">${statusRender(el.status)}</td><td><button class="btn btn-success" onclick="viewTask(${el.id})">Смотреть</button></td></tr>`;
        })
        table.innerHTML = html;
    }
}

let viewTask = function (id){
    window.location.href ='/task/edit?id='+id;
}

let changeTask = function(id){
    let task = prompt('Введи новое задание')
    if(task){
        $.ajax({
            type:'POST',
            url:'/task/change',
            data:{type:'task',task:task,id:id},
            success:()=>{
                alert('Задача изменена!')
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }
}

let addSubtask = function(){
    let subtask = prompt('Введи подзадачу')
    if(subtask===null){
        alert('отменено')
    }else{
        console.log(subtask);
        let task_id = getUrlVars()
        task_id = task_id[1];
        $.ajax({
            type:'POST',
            url:'/task/addSubtask',
            data:{subtask:subtask,id:task_id},
            success:()=>{
                alert('Подзадача добавлена')
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }
}

let renderEdit = function () {
    let html = '';
    let table =  document.getElementById('content');
    let params = window.location.search.replace('?','').split('&').reduce((p,e)=>{
        var a = e.split('=');
        p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;}, {});
    $.ajax({
        type:'GET',
        url:'/task/getInfo?id='+params.id,
        success:(data)=>{
            document.getElementById('taskText').innerText = data.task.task
            document.getElementById('task').setAttribute('onclick',`changeTask(${data.task.id})`)
            data.subtasks.forEach((el)=>{
                html+=`<tr><td onclick="editSubtask(${el.id})">${el.task}</td>
                <td onclick="editSubtaskStatus(${el.id},${el.status})">${statusRender(el.status)}</td>
                <td><button class="btn btn-danger" onclick="deleteSubtask(${el.id})">Delete</button></td></tr>`
            })
            table.innerHTML = html;
        },
        error:(xhr)=>{

        }
    })
}

function deleteTask(){
    let params = getUrlVars();
    $.ajax({
        type:'POST',
        url:'/task/edit',
        data:{type:'delete',id:params[1]},
        success:()=>{
            alert('удалено!')
            window.location.href='/'
        },
        error:()=>{
            alert('что-то пошло не так')
        }
    })
}

let deleteSubtask = function(id){
    $.ajax({
        type:'POST',
        url:'/task/edit',
        data:{type:'deleteSub', id:id},
        success:()=>{
            alert('удалено!')
            window.location.href = window.location.href
        },
        error:()=>{
            alert('что-то пошло не так')
        }
    })
}

let editSubtaskStatus = function(id,status){
    if(status=='1'){
        $.ajax({
            type:'POST',
            url:'/task/edit',
            data:{type:'SubStatus',id:id,status:0},
            success:()=>{
                alert('изменено!')
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }else{
        $.ajax({
            type:'POST',
            url:'/task/edit',
            data:{type:'SubStatus',id:id,status:1},
            success:()=>{
                alert('изменено!')
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }

}

let editSubtask = function(id){
    let task = prompt('Введите новую подзадачу');
    if (task===null){
        alert('отменено')
    }else{
        $.ajax({
            type:'POST',
            url:'/task/edit',
            data:{type:'SubTask',id:id,task:task},
            success:()=>{
                alert('изменено!')
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }

}

let changeName = function(id){
    let name = prompt('Введи новое имя')
    if(name){
        $.ajax({
            type:'POST',
            url:'/task/change',
            data:{type:'name',name:name,id:id},
            success:()=>{
                alert('Имя изменено!')
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }
}

let statusRender = function(status){
    if(status === 0){
        return 'В процессе'
    }else {
        return 'Сделано'
    }
}

let changeStatus = function(id,status){
    if (status == '1'){
        $.ajax({
            type:'POST',
            url:'/task/change',
            data:{type:'status',status:0,id:id},
            success:()=>{
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }else {
        $.ajax({
            type:'POST',
            url:'/task/change',
            data:{type:'status',status:1,id:id},
            success:()=>{
                window.location.href = window.location.href
            },
            error:()=>{
                alert('что-то пошло не так')
            }
        })
    }
}

function getUrlVars()
{
    return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/);
}
function addTask() {
    let name = document.getElementById('name').value
    let task = document.getElementById('task').value
    if(name!='' && task!=''){
        $.ajax({
            type:'POST',
            url:'/task/add',
            data:{name:name,task:task},
            success:()=>{
                window.location.href ='/'
            },
            error:()=>{
                alert('что-то пошло не так');
            }
        })
    }else{
        alert('ошибка. введите данные!');
    }

}