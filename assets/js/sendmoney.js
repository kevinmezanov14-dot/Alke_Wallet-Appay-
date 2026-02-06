$(document).ready(function () {

    // VALIDACIÓN DE SESIÓN
    if (!localStorage.getItem("usuarioLogueado")) {
        window.location.href = "login.html";
        return;
    }

    const $list = $("#contactList");
    const $sendBtn = $("#sendBtn");
    const $confirmation = $("#confirmationMessage");
    const $amountContainer = $("#amountContainer");
    const $amountInput = $("#sendAmount");

    let selectedContact = null; // guarda contacto seleccionado actualmente
    let contactos = JSON.parse(localStorage.getItem("contactos")) || []; // carga contactos guardados

    /* RENDER CONTACTOS */
    function renderContacts(data) {
        $list.empty();

        if (data.length === 0) { // si no hay contactos muestra mensaje
            $list.append(`
                <li class="list-group-item text-center text-muted">
                    No hay contactos guardados
                </li>
            `);
            return;
        }

        data.forEach(c => {
            const realIndex = contactos.findIndex(x => x.cbu === c.cbu); 
            // se necesita indice real desde el array original

            $list.append(`
                <li class="list-group-item contact-item" data-index="${realIndex}"> 
                    <strong>${c.nombre}</strong><br>
                    <small>${c.alias}</small>
                </li>
            `);
        });
    }

    renderContacts(contactos); // muestra contacto al cargar la pagina

    /* GUARDAR CONTACTO (MODAL) */
    $("#contactForm").on("submit", function (e) { 
        // envia formulario y evita su envio para validar
        e.preventDefault();

        const nombre = $("#contactName").val().trim(); // obtiene valores
        const alias = $("#contactAlias").val().trim();
        const cbu = $("#contactCBU").val().trim();

        if (!nombre || !alias || !/^\d{22}$/.test(cbu)) { 
            // simbolo "!" significa si el cbu no es válido
            // ^ inicio, \d digito, {22} exactamente 22 digitos, $ fin
            alert("Datos inválidos. El CBU debe tener 22 dígitos.");
            return;
        }

        contactos.push({ nombre, alias, cbu }); // guarda contactos
        localStorage.setItem("contactos", JSON.stringify(contactos));

        renderContacts(contactos);
        this.reset();

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("addContactModal")
        ); // cierra modal

        modal.hide();
    });

    /* BUSCADOR */
    $("#searchInput").on("input", function () { 
        // se ejecuta en tiempo real
        const term = $(this).val().toLowerCase();

        const filtrados = contactos.filter(c =>
            c.nombre.toLowerCase().includes(term) ||
            c.alias.toLowerCase().includes(term)
        );

        renderContacts(filtrados);

        selectedContact = null; 
        // reset estado UI para evitar error al cambiar contacto seleccionado

        $(".contact-item").removeClass("active");
        $sendBtn.addClass("d-none");
        $amountContainer.addClass("d-none");
        $amountInput.val("");
    });

    /* SELECCIONAR CONTACTO */
    $(document).on("click", ".contact-item", function () {
        $(".contact-item").removeClass("active"); // marcar activo
        $(this).addClass("active");

        selectedContact = contactos[$(this).data("index")]; 
        // guardar contacto seleccionado

        $amountContainer.removeClass("d-none"); // mostrar input monto
        $sendBtn.addClass("d-none");
        $amountInput.val("");
    });

    /* MOSTRAR BOTÓN */
    $amountInput.on("input", function () { 
        // solo muestra boton si el monto es valido
        const monto = Number($(this).val());
        monto > 0 ? $sendBtn.removeClass("d-none") : $sendBtn.addClass("d-none");
    });

    /* ENVIAR DINERO (SIN MODAL) */
    $sendBtn.on("click", function () {

        const monto = Number($amountInput.val());

        let saldo = Number(localStorage.getItem("saldo"));
        // obtiene saldo actual

        if (isNaN(saldo)) {
            saldo = 60000; // saldo inicial por defecto
            localStorage.setItem("saldo", saldo);
        }

        if (isNaN(monto) || monto <= 0) { 
            // validación si el monto es menor o igual a 0
            alert("Ingresa un monto válido");
            return;
        }

        if (monto > saldo) { 
            // si el monto es mayor al saldo
            alert("Saldo insuficiente");
            return;
        }

        saldo -= monto;
        localStorage.setItem("saldo", saldo); 
        // actualiza el saldo

        const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

        movimientos.push({ 
            // registra movimiento
            tipo: "Transferencia enviada",
            destinatario: selectedContact.nombre,
            monto: -monto,
            fecha: new Date().toLocaleString("es-CL")
        });

        localStorage.setItem("movimientos", JSON.stringify(movimientos));
        // lo guarda y después está la confirmación visual

        $confirmation.html(` 
            <div class="alert alert-success text-center mt-3">
                ✅ Enviaste <strong>$${monto.toLocaleString("es-CL")}</strong><br>
                a <strong>${selectedContact.nombre}</strong>
            </div>
        `);

        // Reset de UI
        $sendBtn.addClass("d-none");
        $amountContainer.addClass("d-none");
        $amountInput.val("");
        $(".contact-item").removeClass("active");
        selectedContact = null;
    });

    /* VOLVER AL MENÚ */
    $("#backMenuBtn").on("click", function () {
        window.location.href = "menu.html";
    });
});

