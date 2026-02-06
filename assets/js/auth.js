$(document).ready(function () {

    const usuario = localStorage.getItem("usuarioLogueado");
    // verifica si existe sesión activa

    if (!usuario) { 
        // si no hay usuario logueado, bloquea el acceso
        window.location.href = "login.html";
        return;
    }

});



