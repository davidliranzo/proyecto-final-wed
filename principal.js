// Arreglo para almacenar las multas registradas
let multas = [];

// Arreglo para almacenar los agentes registrados
let agentes = [
    { id: "40211321456", nombre: "Juan Pérez", clave: "123" },
    { id: "987654321", nombre: "Ana García", clave: "clave987" }
];

// Variable para guardar el usuario activo
let usuarioActivo = null;

// Función para mostrar la comisión mensual en el módulo de Agente
function showCommission() {
    const commissionContainer = document.getElementById("commission");
    let totalCommission = 0;
    let lastFiveContributions = multas.slice(-5); // Últimos 5 aportes

    // Calcular la comisión (10% del monto total de las multas registradas)
    multas.forEach(multa => {
        totalCommission += multa.monto * 0.1; // Comisión del 10%
    });

    // Mostrar el total de la comisión y los últimos 5 aportes
    commissionContainer.innerHTML = `
        <h3>Comisión por Mes 💰</h3>
        <p><strong>Total Comisión:</strong> ${totalCommission.toFixed(2)} USD</p>
        <h4>Últimos 5 Aportes:</h4>
        <ul>
            ${lastFiveContributions.map(multa => `
                <li>${multa.concepto} - ${multa.monto} USD</li>
            `).join('')}
        </ul>
    `;
}

// Función para mostrar el formulario de registro de multa en el módulo de Agente
function showAgentForm() {
    const formContainer = document.getElementById("agent-form");
    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
}

// Manejar el registro de multas en el módulo de Agente
document.getElementById("multasForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir recarga del formulario

    // Obtener datos del formulario
    const cedula = document.getElementById("id-cédula").value;
    const nombre = document.getElementById("nombre").value;
    const concepto = document.getElementById("concepto").value;
    const descripcion = document.getElementById("descripcion").value;
    const coordenadas = document.getElementById("coordenadas").value;
    const foto = document.getElementById("foto").files[0];
    const monto = parseFloat(document.getElementById("monto").value);

    // Validar monto
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor ingresa un monto válido para la multa.");
        return;
    }

    // Crear el objeto de la multa
    const multa = {
        cedula,
        nombre,
        concepto,
        descripcion,
        coordenadas,
        foto: foto ? foto.name : "sin foto", // Valor por defecto si no hay foto
        monto
    };

    // Agregar la multa al arreglo
    multas.push(multa);

    // Limpiar el formulario
    document.getElementById("multasForm").reset();

    // Ocultar el formulario
    document.getElementById("agent-form").style.display = "none";

    // Mostrar la comisión actualizada
    showCommission();
});

// Función para mostrar el listado de multas en el módulo de Agente
function showListOfFines() {
    const finesListContainer = document.getElementById("listado-multas");
    finesListContainer.style.display = finesListContainer.style.display === "none" ? "block" : "none";

    const finesList = document.getElementById("multas-list");
    finesList.innerHTML = ""; // Limpiar el listado antes de mostrar las multas

    if (multas.length === 0) {
        finesList.innerHTML = "<li>No hay multas registradas aún.</li>";
    } else {
        multas.forEach(multa => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${multa.nombre}</strong> - ${multa.concepto} - ${multa.monto} USD
                <br><small>Descripción: ${multa.descripcion}</small>
            `;
            finesList.appendChild(listItem);
        });
    }
}

// Función para mostrar la información de "Acerca de"
function showAbout() {
    alert("Aplicación desarrollada por:\nDavid Liranzo - Tel: 849-432-1520\nElier Moreta - Tel: 829-763-1347");
}

// Función para manejar el login de agentes
function agentLogin(cedula, clave) {
    const agente = agentes.find(agent => agent.id === cedula && agent.clave === clave);
    if (agente) {
        usuarioActivo = agente;
        alert(`Bienvenido ${agente.nombre}`);
        window.location.href = "agente.html"; // Redirigir al módulo de agentes
    } else {
        alert("Cédula o clave incorrectos.");
    }
}

// Función para manejar el login en el módulo de Oficina Central
function officeLogin(cedula, clave) {
    if (cedula === "admin" && clave === "admin123") {
        alert("Bienvenido a la Oficina Central.");
        window.location.href = "oficina-central.html"; // Redirigir a Oficina Central
    } else {
        alert("Cédula o clave incorrectos.");
    }
}

// Función para mostrar y buscar multas en Oficina Central
function searchFines() {
    const searchCedula = document.getElementById("search-cedula").value;
    const finesList = document.getElementById("fines-list");
    finesList.innerHTML = ""; // Limpiar lista de resultados

    const foundFines = multas.filter(multa => multa.cedula === searchCedula);

    if (foundFines.length === 0) {
        finesList.innerHTML = "<li>No se encontraron multas para esa cédula.</li>";
    } else {
        foundFines.forEach(multa => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${multa.nombre}</strong> - ${multa.concepto} - ${multa.monto} USD
                <br><small>Descripción: ${multa.descripcion}</small>
                <button onclick="markFineAsPaid('${multa.cedula}')">Marcar como pagada</button>
            `;
            finesList.appendChild(listItem);
        });
    }
}

// Función para marcar una multa como pagada
function markFineAsPaid(cedula) {
    const multaIndex = multas.findIndex(multa => multa.cedula === cedula);
    if (multaIndex !== -1) {
        multas[multaIndex].pagada = true;
        alert("Multa marcada como pagada.");
        showCommission(); // Actualizar comisión
    } else {
        alert("No se encontró la multa.");
    }
}

// Función para mostrar la estadística de ingresos en Oficina Central
function showIncomeReport() {
    const month = document.getElementById("report-month").value;
    const year = document.getElementById("report-year").value;

    const totalIncome = multas.filter(multa => {
        const multaDate = new Date(multa.fecha);
        return multaDate.getMonth() === parseInt(month) && multaDate.getFullYear() === parseInt(year);
    }).reduce((total, multa) => total + multa.monto, 0);

    alert(`Total de ingresos en ${month}/${year}: ${totalIncome.toFixed(2)} USD`);
}

// Función para manejar el login en el módulo administrativo
function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (username === "adamix" && password === "estoesfacil") {
        alert("Acceso autorizado.");
        window.location.href = "admin.html"; // Redirigir al módulo administrativo
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    }
}
