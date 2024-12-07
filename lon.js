// Datos de ejemplo para validar (normalmente, esto vendría de una base de datos)
const agentes = [
    { cedula: "40211321456", clave: "12345" },
    { cedula: "87654321", clave: "clave456" },
];

// Función para manejar el inicio de sesión
function login(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener los valores de los campos de entrada
    const cedula = document.getElementById("cedula").value;
    const clave = document.getElementById("clave").value;

    // Verificar si la cédula y la clave coinciden con algún agente en la base de datos (simulada aquí)
    const agente = agentes.find(a => a.cedula === cedula && a.clave === clave);

    if (agente) {
        // Si los datos son correctos, redirige al panel del agente
        window.location.href = "agentes.html";  // Cambia este enlace a la página del Agente
    } else {
        // Si los datos son incorrectos, muestra un mensaje de error
        alert("Cédula o clave incorrecta. Intente nuevamente.");
    }
}
