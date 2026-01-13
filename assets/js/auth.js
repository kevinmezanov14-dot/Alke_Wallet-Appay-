        //SEGURIDAD DE APPAY
        $(document).ready(function () {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado")); //recupera la info de sesión y JASON.parse convierte string en objeto
        if (!usuario) { // si no existe sesión redirige al login
            window.location.href = "wlogin.html";
            return;
        }
        // LOGOUT
        $("#logoutBtn").on("click", function () { //escucha el click
            localStorage.removeItem("usuarioLogueado"); //remueve al usuario
            window.location.href = "wlogin.html"; //redirige al login
        });
        });
