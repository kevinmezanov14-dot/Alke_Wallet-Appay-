// Credenciales válidas (simuladas)
const usuarioValido = "copo@appay.cl";
const passwordValido = "1234"; // ❗ sin acentos (convención JS)

// Evento submit usando jQuery
$("#loginForm").submit(function (e) { 
    // envía el formulario pero se detiene para validación
    e.preventDefault();

    const email = $("#email").val().trim(); 
    // obtiene el valor del email (trim elimina espacios)

    const password = $("#password").val().trim(); 
    // obtiene el valor del password

    // si el email o || password están vacíos se ejecuta
    if (!email || !password) {
        $("#loginMessage").html(`
            <div class="alert alert-warning text-center">
                ⚠️ Completa todos los campos
            </div>
        `);
        return; // corta la ejecución
    }

    // si el usuario y además el password son iguales puede ingresar
    if (email === usuarioValido && password === passwordValido) {

        // GUARDAR SESIÓN
        localStorage.setItem(
            "usuarioLogueado",
            JSON.stringify({
                email: email,
                loginAt: new Date().toISOString() 
                // obtiene fecha y hora actual
            })
        );

        $("#loginMessage").html(`
            <div class="alert alert-success text-center">
                ✔ Acceso correcto. Redirigiendo…
            </div>
        `);

        // redirección con pequeña espera para mostrar mensaje
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1200); // 1.2 segundos de espera

    } else {
        // si no se cumplen las credenciales muestra error
        $("#loginMessage").html(`
            <div class="alert alert-danger text-center">
                ❌ Email o contraseña incorrectos
            </div>
        `);
    }
});



