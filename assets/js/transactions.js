$(document).ready(function () {

    // VALIDACIÓN DE SESIÓN
    if (!localStorage.getItem("usuarioLogueado")) {
        window.location.href = "login.html";
        return;
    }

    const $list = $("#transactionList");
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];


    // Obtener tipo para el filtro
    function getTipoTransaccion(tipo) {
        if (tipo.toLowerCase().includes("depósito")) return "deposito"; 
        // evita problemas de mayúsculas, tildes o textos largos
        if (tipo.toLowerCase().includes("transferencia")) return "transferencia";
        return "otro";
    }

    // Mostrar movimientos
    function mostrarUltimosMovimientos(filtro = "todos") {

        $list.empty(); 
        // limpia la lista antes de renderizar evita duplicar datos

        const movimientosFiltrados = movimientos.filter(mov => {
            if (filtro === "todos") return true;
            return getTipoTransaccion(mov.tipo) === filtro;
        });

        if (movimientosFiltrados.length === 0) {
            $list.html(`
                <li class="list-group-item text-center">
                    No hay movimientos para este filtro
                </li>
            `);
            return;
        }

        movimientosFiltrados
            .slice(-5) // toma los últimos 5 movimientos
            .reverse() // los invierte para ver desde el más nuevo al más antiguo
            .forEach(mov => { // recorre cada movimiento con los datos

                const montoFormateado = Math.abs(mov.monto)
                    .toLocaleString("es-CL"); 
                // formatea monto en pesos chilenos elimina signo negativo

                const claseMonto = mov.monto > 0
                    ? "transaction-income"
                    : "transaction-expense";
                // estilos visuales

                // 👤 AVATAR
                const avatar = mov.destinatario ? "👤" : "💰"; 
                // si hay destinatario es transferencia, si no es depósito

                const avatarClass = mov.destinatario
                    ? "avatar-transfer"
                    : "avatar-income";

                // 📌 Inserta dinámicamente un item en la lista
                $list.append(`
                    <li class="list-group-item transaction-item">
                        <div class="d-flex align-items-center gap-2">
                            <div class="transaction-avatar ${avatarClass}">
                                ${avatar}
                            </div>
                            <div>
                                <strong>
                                    ${mov.tipo}
                                    ${mov.destinatario ? " a " + mov.destinatario : ""}
                                </strong><br>
                                <span class="transaction-date">${mov.fecha}</span>
                            </div>
                        </div>
                        <div class="${claseMonto}">
                            ${mov.monto > 0 ? "+" : "-"} $${montoFormateado}
                        </div>
                    </li>
                `);
            });
    }

    // Evento filtro en tiempo real
    $("#filtroTipo").on("change", function () {
        mostrarUltimosMovimientos($(this).val());
    });

    // Carga inicial
    mostrarUltimosMovimientos();

    // Botón volver al menú
    $("#backMenuBtn").on("click", function () {
        window.location.href = "menu.html";
    });

});


