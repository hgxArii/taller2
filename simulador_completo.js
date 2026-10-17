
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones() {
  document.querySelectorAll("section").forEach(seccion => {
    seccion.classList.remove("activa");
  });
}

function mostrarSeccion(id) {
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let tasa = Number(document.getElementById("tasaInteres").value);
  let mensaje = document.getElementById("mensajeTasa");

  if (document.getElementById("tasaInteres").value !== "" &&
      tasa >= 10 && tasa <= 20) {
    tasaInteres = tasa;
    mensaje.textContent = "Tasa configurada correctamente: " + tasa + "%";
  } else {
    mensaje.textContent = "La tasa debe estar entre 10% y 20%";
  }
}

function buscarCliente(cedula) {
  return clientes.find(cliente => cliente.cedula === cedula) || null;
}

function guardarCliente() {
  let cedula = document.getElementById("cedula").value.trim();
  let nombre = document.getElementById("nombre").value.trim();
  let apellido = document.getElementById("apellido").value.trim();
  let ingresos = document.getElementById("ingresos").value;
  let egresos = document.getElementById("egresos").value;

  if (!cedula || !nombre || !apellido || ingresos === "" || egresos === "") {
    alert("Complete todos los campos.");
    return;
  }

  ingresos = Number(ingresos);
  egresos = Number(egresos);

  if (!Number.isFinite(ingresos) || !Number.isFinite(egresos) ||
      ingresos < 0 || egresos < 0) {
    alert("Ingrese valores válidos para ingresos y egresos.");
    return;
  }

  if (clienteSeleccionado) {
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;
  } else {
    if (buscarCliente(cedula)) {
      alert("Ya existe un cliente con esa cédula.");
      return;
    }

    clientes.push({ cedula, nombre, apellido, ingresos, egresos });
  }

  pintarClientes();
  limpiar();
}

function pintarClientes() {
  let tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";

  clientes.forEach(cliente => {
    let fila = tabla.insertRow();

    fila.insertCell().textContent = cliente.cedula;
    fila.insertCell().textContent = cliente.nombre;
    fila.insertCell().textContent = cliente.apellido;
    fila.insertCell().textContent = cliente.ingresos;
    fila.insertCell().textContent = cliente.egresos;

    let boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Actualizar";
    boton.onclick = function() {
      seleccionarCliente(cliente.cedula);
    };

    fila.insertCell().appendChild(boton);
  });
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula);

  if (!clienteSeleccionado) return;

  document.getElementById("cedula").value = clienteSeleccionado.cedula;
  document.getElementById("cedula").disabled = true;
  document.getElementById("nombre").value = clienteSeleccionado.nombre;
  document.getElementById("apellido").value = clienteSeleccionado.apellido;
  document.getElementById("ingresos").value = clienteSeleccionado.ingresos;
  document.getElementById("egresos").value = clienteSeleccionado.egresos;

  mostrarSeccion("clientes");
}

function limpiar() {
  document.getElementById("cedula").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("ingresos").value = "";
  document.getElementById("egresos").value = "";
  document.getElementById("cedula").disabled = false;

  clienteSeleccionado = null;
}

pintarClientes();
mostrarSeccion("parametros");