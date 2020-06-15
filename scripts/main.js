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

function getUrlVars()
{
    return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/);
}