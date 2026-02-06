$(document).ready(function () {

    // VALIDACIÓN DE SESIÓN (protege la página)
    if (!localStorage.getItem("usuarioLogueado")) {
        window.location.href = "login.html";
        return;
    }

    // LOGOUT (si existe el botón en la vista)
    $("#logoutBtn").on("click", function () {

        localStorage.removeItem("usuarioLogueado");
        // elimina sesión simulada

        window.location.href = "login.html";
    });

});




