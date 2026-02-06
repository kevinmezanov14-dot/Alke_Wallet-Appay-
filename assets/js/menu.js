        $(document).ready(function () {
            const $message = $("#menuMessage");
            function redirectWithMessage(text, url) { //muestra mensaje visual
                $message.html(`
                    <div class="alert alert-success text-center">
                        🔄 Redirigiendo a ${text}...
                    </div>
                `); //ocupo template literals para hacer uso del ${text} personaliza mensaje segun el boton
                setTimeout(function () {
                    window.location.href = url;
                }, 1200); //espera 1.2 segundos par redirigir
            }
            // BOTONES DEL MENÚ
            $("#btnDeposit").on("click", function () { // escucho el evento click y se realiiza la función 
                redirectWithMessage("Depósito", "deposit.html");
            });
            $("#btnSend").on("click", function () {
                redirectWithMessage("Enviar Dinero", "sendmoney.html");
            });
            $("#btnTransactions").on("click", function () {
                redirectWithMessage("Últimos Movimientos", "transaction.html");
            });
            // SALDO
            let saldo = Number(localStorage.getItem("saldo")) || 60000; //intenta obtener saldo guardado || o si no hay o es inválido utiliza 60000
            $("#balance").text(`$${saldo.toLocaleString("es-CL")}`); //muestra saldo en moneda chilena
        });