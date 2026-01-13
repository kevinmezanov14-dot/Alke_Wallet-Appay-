        $(document).ready(function () {
            const $list = $("#transactionList");
            const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
            // Obtener tipo para el filtro
            function getTipoTransaccion(tipo) {
                if (tipo.toLowerCase().includes("depósito")) return "deposito"; //evita problemas de mayusculas tildes o textos largos
                if (tipo.toLowerCase().includes("transferencia")) return "transferencia"; 
                return "otro";
            }
            // Mostrar movimientos
            function mostrarUltimosMovimientos(filtro = "todos") {
                $list.empty(); //limpia la lista antes de renderizar evita duplicar datos
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
            .slice(-5) //toma los últimos 5 movimientos
            .reverse() //los invierte para ver desde el mas nuevo al mas antiguo
            .forEach(mov => { //recorre cada mov con los datos
                const montoFormateado = Math.abs(mov.monto) //formatea monto en pesos chilenos elimina signo negativo
                .toLocaleString("es-CL");
                const claseMonto = mov.monto > 0 //estilos visuales
                    ? "transaction-income" 
                    : "transaction-expense";
                // 👤 AVATAR 
                const avatar = mov.destinatario ? "👤" : "💰"; //si hay destinatario : si es deposito
                const avatarClass = mov.destinatario
                    ? "avatar-transfer"
                    : "avatar-income";
                // 📌 Inserta dinamicamente un item en li con iconos, si es deposito o trasferencia con el detinatario
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
            });
            // boton vuelta a menu
                    $(document).ready(function () {
            $("#backMenuBtn").on("click", function () {
                window.location.href = "wmenu.html";
            });
            });

