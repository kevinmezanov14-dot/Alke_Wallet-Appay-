        // Credenciales válidas (simuladas)
        const usuarioValido = "copo@appay.cl";
        const contraseñaValida = "1234";
        // Evento submit usando jQuery
        $("#loginForm").submit(function (e) { //envia el formulario pero se detiene para validación
        e.preventDefault();
        const email = $("#email").val().trim(); // obtiene los valores de email (trim elimina espacios)
        const password = $("#password").val().trim(); // obtiene los valores de password
        if (!email || !password) { // si el email o || pass estan vacíos se ejecuta
            $("#loginMessage").html(`
            <div class="alert alert-warning text-center">
                ⚠️ Completa todos los campos
            </div>
            `);
            return;
        }
        if (email === usuarioValido && password === contraseñaValida) { // si el usuario y ademas el pass son iguales puede ingresar
            //GUARDAR SESIÓN
            localStorage.setItem( //guarda el usuario con fecha u hora, esto permite mantener sesión y validar en otras paginas
            "usuarioLogueado",
            JSON.stringify({ //convierte el objeto js a texto ya que local storage no guarda objetos
                email: email,
                loginAt: new Date().toISOString() //obtiene fecha y hora actual
            })
            );
            $("#loginMessage").html(`
            <div class="alert alert-success text-center">
                ✔ Acceso correcto. Redirigiendo…
            </div>
            `);
            setTimeout(() => {
            window.location.href = "wmenu.html";
            }, 1200); //1.2 seg de espera
        } else { // por el contrario si no se cumple envia mensaje
            $("#loginMessage").html(`
            <div class="alert alert-danger text-center">
                ❌ Email o contraseña incorrectos
            </div>
            `);
        }
        });


