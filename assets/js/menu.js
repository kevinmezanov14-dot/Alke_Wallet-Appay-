$(document).ready(function () {

    // VALIDACIÓN DE SESIÓN
    if (!localStorage.getItem("usuarioLogueado")) {
        window.location.href = "login.html";
        return;
    }

    const $message = $("#menuMessage");

    function redirectWithMessage(text, url) { 
        // muestra mensaje visual
        $message.html(`
            <div class="alert alert-success text-center">
                🔄 Redirigiendo a ${text}...
            </div>
        `); 
        // ocupo template literals para hacer uso del ${text}
        setTimeout(function () {
            window.location.href = url;
        }, 1200); 
        // espera 1.2 segundos para redirigir
    }

    // BOTONES DEL MENÚ
    $("#btnDeposit").on("click", function () { 
        // escucho el evento click y se realiza la función
        redirectWithMessage("Depósito", "deposit.html");
    });

    $("#btnSend").on("click", function () {
        redirectWithMessage("Enviar Dinero", "sendmoney.html");
    });

    $("#btnTransactions").on("click", function () {
        redirectWithMessage("Últimos Movimientos", "transactions.html");
    });

    // SALDO
    let saldo = Number(localStorage.getItem("saldo"));

    if (isNaN(saldo)) {
        saldo = 60000; // saldo inicial por defecto
        localStorage.setItem("saldo", saldo);
    }

    $("#balance").text(`$${saldo.toLocaleString("es-CL")}`);
    // muestra saldo en moneda chilena
});
