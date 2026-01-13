        $(document).ready(() => {
            const $balance = $("#currentBalance");
            const $alertContainer = $("#alert-container");
            const $depositInfo = $("#depositInfo");
            // Obtener saldo actual
            let saldo = Number(localStorage.getItem("saldo")) || 60000; //muestra saldo acttual
            $balance.text(`$${saldo.toLocaleString("es-CL")}`); //en pesos chilenos
            // Submit depósito
            $("#depositForm").on("submit", (e) => { //valida antes de enviar
                e.preventDefault();
                const monto = Number($("#depositAmount").val()); //convierte el input a numero si no es valido = NaN
                // Validación
                if (isNaN(monto) || monto < 2000) { // si no es un numero o|| el monto es inferior a 2000 aparece mensaje
                    $alertContainer.empty().html(`
                        <div class="alert alert-danger text-center">
                            ❌ Ingresa un monto válido (mínimo $2.000)
                        </div>
                    `);
                    return;
                }
                // Actualizar saldo
                saldo += monto; // suma el depósito
                localStorage.setItem("saldo", saldo);
                $balance.text(`$${saldo.toLocaleString("es-CL")}`); // actualizar en pantalla
                // Guardar movimiento
                const movimientos = JSON.parse(localStorage.getItem("movimientos")) || []; //recupera el historial si no, vacío
                movimientos.push({ //guarda el movimiento
                    tipo: "Depósito",
                    monto: monto,
                    fecha: new Date().toLocaleString("es-CL")
                });
                localStorage.setItem("movimientos", JSON.stringify(movimientos));
                // Mensaje éxito
                $alertContainer.empty().html(`
                    <div class="alert alert-success text-center">
                        ✅ Depósito realizado con éxito
                    </div>
                `);
                // Info depósito refuerza la acción realizada
                $depositInfo.html(`
                    <p class="text-success fw-semibold">
                        Has depositado $${monto.toLocaleString("es-CL")} 
                    </p>
                `);
                // Limpiar input
                $("#depositAmount").val("");
                // Redirección
                setTimeout(() => window.location.href = "wmenu.html", 2000); //da 2 seg para leer el mensaje antes de redirigir
            });
            // Botón volver al menú
            $("#backMenuBtn").on("click", () => {
                window.location.href = "wmenu.html";
            });
        });
