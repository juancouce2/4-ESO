const ENDPOINT = https://script.google.com/macros/s/AKfycbzS8ZK5HuI8g-1AkhRp9fqnlDP3i9-J6OP9Cr79WUs2j4pOPYwVXy2CZMtCP3g-IgjW/exec;

const form = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value.trim(),
    grupo: document.getElementById("grupo").value,
    ud: document.getElementById("ud").value,
    reto_base: document.getElementById("base").value,
    reto_opcional: document.getElementById("opcional").value,
    evidencia_url: document.getElementById("evidencia").value.trim(),
    esfuerzo: document.getElementById("esfuerzo").value,
    energia: document.getElementById("energia").value,
    reflexion: document.getElementById("reflexion").value.trim()
  };

  if (data.reflexion.length < 40) {
    mostrarMensaje("La reflexión es demasiado corta.", false);
    return;
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const resultado = await response.json();

    if (resultado.ok) {
      mostrarMensaje("Registro guardado. Puntuación provisional: " + resultado.puntuacion.toFixed(2), true);
      form.reset();
    } else {
      mostrarMensaje("Error al guardar.", false);
    }

  } catch (error) {
    mostrarMensaje("Error de conexión.", false);
  }
});

function mostrarMensaje(texto, correcto) {
  mensaje.style.display = "block";
  mensaje.className = "msg " + (correcto ? "ok" : "bad");
  mensaje.textContent = texto;
}
