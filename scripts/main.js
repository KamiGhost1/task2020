let loguot = async function() {
    console.log(document.cookie);
    await $.get('/logout',()=>{});
    dropCookie();
    window.location.href='/login'
}

function getUrlVars()
{
    return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/);
}