 let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;
 
function ocultarSecciones() {
    let secciones = document.querySelectorAll("section");

    for (let indice = 0; indice < secciones.length; indice++) {
        secciones[indice].classList.remove("activa");
    }
}

function mostrarSeccion(id) {
    ocultarSecciones();

    let seccion = document.getElementById(id);

    if (seccion != null) {
        seccion.classList.add("activa");
    }
}

function guardarTasa() {
    let valorTasa = recuperaraTexto("tasaInteres");
    let tasa = recuperarFloat("tasaInteres");

    if (valorTasa == "") {
        mostrarTexto("mensajeTasa", "Ingrese una tasa de interés.");
    } else {
        if (tasa >= 10 && tasa <= 20) {
            tasaInteres = tasa;

            mostrarTexto(
                "mensajeTasa",
                "Tasa configurada correctamente: " + tasaInteres + "%"
            );
        } else {
            mostrarTexto(
                "mensajeTasa",
                "La tasa debe estar entre 10% y 20%."
            );
        }
    }
}

function buscarCliente(cedula) {
    let encontrado = null;

    for (let indice = 0; indice < clientes.length; indice++) {
        if (clientes[indice].cedula == cedula) {
            encontrado = clientes[indice];
        }
    }

    return encontrado;
}

function guardarCliente() {
    let cedula = recuperaraTexto("cedula").trim();
    let nombre = recuperaraTexto("nombre").trim();
    let apellido = recuperaraTexto("apellido").trim();
    let valorIngresos = recuperaraTexto("ingresos");
    let valorEgresos = recuperaraTexto("egresos");

    if (
        cedula == "" ||
        nombre == "" ||
        apellido == "" ||
        valorIngresos == "" ||
        valorEgresos == ""
    ) {
        alert("Complete todos los campos.");
    } else {
        let ingresos = recuperarFloat("ingresos");
        let egresos = recuperarFloat("egresos");

        if (ingresos < 0 || egresos < 0) {
            alert("Los ingresos y egresos no pueden ser negativos.");
        } else {
            if (clienteSeleccionado == null) {
                let clienteExistente = buscarCliente(cedula);

                if (clienteExistente != null) {
                    alert("Ya existe un cliente con esa cédula.");
                } else {
                    let cliente = {
                        cedula: cedula,
                        nombre: nombre,
                        apellido: apellido,
                        ingresos: ingresos,
                        egresos: egresos
                    };

                    clientes.push(cliente);

                    pintarClientes();
                    limpiar();

                    alert("Cliente guardado correctamente.");
                }
            } else {
                clienteSeleccionado.nombre = nombre;
                clienteSeleccionado.apellido = apellido;
                clienteSeleccionado.ingresos = ingresos;
                clienteSeleccionado.egresos = egresos;

                pintarClientes();
                limpiar();

                alert("Cliente actualizado correctamente.");
            }
        }
    }
}

function pintarClientes() {
    let tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    for (let indice = 0; indice < clientes.length; indice++) {
        let cliente = clientes[indice];
        let fila = tabla.insertRow();

        let celdaCedula = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaApellido = fila.insertCell();
        let celdaIngresos = fila.insertCell();
        let celdaEgresos = fila.insertCell();
        let celdaAcciones = fila.insertCell();

        celdaCedula.textContent = cliente.cedula;
        celdaNombre.textContent = cliente.nombre;
        celdaApellido.textContent = cliente.apellido;
        celdaIngresos.textContent = cliente.ingresos;
        celdaEgresos.textContent = cliente.egresos;

        let boton = document.createElement("button");

        boton.type = "button";
        boton.textContent = "Actualizar";

        boton.onclick = function() {
            seleccionarCliente(cliente.cedula);
        };

        celdaAcciones.appendChild(boton);
    }
}

function seleccionarCliente(cedula) {
    clienteSeleccionado = buscarCliente(cedula);

    if (clienteSeleccionado != null) {
        mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
        mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
        mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
        mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
        mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);

        document.getElementById("cedula").disabled = true;

        mostrarSeccion("clientes");
    }
}

function limpiar() {
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");

    document.getElementById("cedula").disabled = false;

    clienteSeleccionado = null;
}

pintarClientes();
mostrarSeccion("parametros");