$(document).ready(function () {

    const $list = $("#transactionList");
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    // Normaliza tipo de transacción para el filtro
    function getTipoTransaccion(tipo) {
        if (tipo.toLowerCase().includes("depósito")) return "deposito"; 
        if (tipo.toLowerCase().includes("transferencia")) return "transferencia";
        return "otro";
    }

    // Mostrar últimos movimientos
    function mostrarUltimosMovimientos(filtro = "todos") {

        $list.empty(); // limpia lista antes de renderizar

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
            .reverse() // muestra del más nuevo al más antiguo
            .forEach(mov => {

                const montoFormateado = Math.abs(mov.monto)
                    .toLocaleString("es-CL"); // elimina signo negativo

                const claseMonto = mov.monto > 0
                    ? "transaction-income"
                    : "transaction-expense";

                const avatar = mov.destinatario ? "👤" : "💰";
                const avatarClass = mov.destinatario
                    ? "avatar-transfer"
                    : "avatar-income";

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

    // Evento filtro
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

