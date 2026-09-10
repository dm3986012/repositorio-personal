/*
  ====================================================================
  EL ARCHIVERO — asistente del portafolio
  ====================================================================
  Es un asistente basado en reglas: no necesita internet ni una API
  externa, solo compara palabras clave con las preguntas del usuario.

  Para agregar más respuestas, añade un objeto nuevo al arreglo
  INTENCIONES con sus "palabras" clave y su "respuesta".
  ====================================================================
*/

const INTENCIONES = [
  {
    palabras: ["hola", "buenas", "hey", "que tal"],
    respuesta: "Buenas tardes. Soy el Archivero de este portafolio. Puedo indicarle cómo consultar las unidades, semanas y actividades. ¿Qué desea saber?"
  },
  {
    palabras: ["unidad", "unidades"],
    respuesta: "El archivo está dividido en 4 unidades, cada una con su propio color de etiqueta. Ábralas desde el menú de la izquierda para ver sus cajones (semanas)."
  },
  {
    palabras: ["semana", "semanas"],
    respuesta: "Cada unidad guarda 4 semanas. Despliegue la unidad correspondiente y elija la semana que desea consultar."
  },
  {
    palabras: ["actividad", "actividades", "tarea", "tareas"],
    respuesta: "Cada semana contiene 2 actividades. Al abrir una verá su descripción, el sello de estado y el enlace a su evidencia archivada."
  },
  {
    palabras: ["evidencia", "evidencias", "enlace", "link"],
    respuesta: "La evidencia es el documento que respalda su trabajo: una imagen, un enlace o un archivo. Se archiva editando el campo evidenciaUrl de cada actividad en js/data.js."
  },
  {
    palabras: ["editar", "cambiar", "modificar", "actualizar"],
    respuesta: "Para actualizar sus fichas, abra js/data.js en VS Code. Ahí puede cambiar la descripción, el estado (\"pendiente\" o \"listo\") y el enlace de evidencia de cada actividad."
  },
  {
    palabras: ["pendiente", "listo", "completado", "estado", "sello"],
    respuesta: "El estado se muestra como un sello: PENDIENTE en tinta ocre, o COMPLETADO en tinta roja. Cambie estado a \"listo\" en data.js cuando termine una actividad."
  },
  {
    palabras: ["color", "colores"],
    respuesta: "Cada unidad lleva un color distinto en su etiqueta: Unidad 1 rojo óxido, Unidad 2 mostaza, Unidad 3 oliva y Unidad 4 petróleo."
  },
  {
    palabras: ["quien eres", "que eres", "tu nombre"],
    respuesta: "Soy un pequeño asistente escrito en JavaScript, sin conexión a ninguna oficina central: solo busco palabras clave en su consulta y respondo desde mi propio fichero."
  },
  {
    palabras: ["gracias", "genial", "perfecto"],
    respuesta: "A su servicio. Vuelva cuando lo necesite."
  },
  {
    palabras: ["adios", "chau", "bye"],
    respuesta: "Que tenga buena jornada. El archivo quedará aquí, ordenado, para cuando regrese."
  }
];

const RESPUESTA_DEFECTO =
  "No tengo ficha para eso. Puede consultarme sobre unidades, semanas, actividades, evidencias, sellos de estado o cómo editar el archivo.";

const SUGERENCIAS = [
  "¿Cuántas unidades hay?",
  "¿Cómo archivo una evidencia?",
  "¿Cómo cambio el sello de una actividad?"
];

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotPanel = document.getElementById("chatbotPanel");
const chatbotMessages = document.getElementById("chatbotMessages");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
}

function responderA(mensaje) {
  const texto = normalizar(mensaje);

  const intencion = INTENCIONES.find((it) =>
    it.palabras.some((palabra) => texto.includes(palabra))
  );

  return intencion ? intencion.respuesta : RESPUESTA_DEFECTO;
}

function agregarMensaje(texto, autor) {
  const burbuja = document.createElement("div");
  burbuja.className = `chatbot__msg chatbot__msg--${autor}`;
  burbuja.textContent = texto;
  chatbotMessages.appendChild(burbuja);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function agregarSugerencias() {
  const fila = document.createElement("div");
  fila.className = "chatbot__chips";

  SUGERENCIAS.forEach((texto) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chatbot__chip";
    chip.textContent = texto;
    chip.addEventListener("click", () => enviarMensaje(texto));
    fila.appendChild(chip);
  });

  chatbotMessages.appendChild(fila);
}

function enviarMensaje(texto) {
  if (!texto.trim()) return;

  agregarMensaje(texto, "user");
  chatbotInput.value = "";

  setTimeout(() => {
    agregarMensaje(responderA(texto), "bot");
  }, 350);
}

chatbotToggle.addEventListener("click", () => {
  chatbotPanel.hidden = false;
  chatbotToggle.classList.add("is-hidden");

  if (!chatbotMessages.dataset.iniciado) {
    agregarMensaje(
      "Buenas tardes. Soy el Archivero de su portafolio. Pregúnteme cómo consultar el archivo, editar fichas o archivar evidencias.",
      "bot"
    );
    agregarSugerencias();
    chatbotMessages.dataset.iniciado = "true";
  }

  chatbotInput.focus();
});

chatbotClose.addEventListener("click", () => {
  chatbotPanel.hidden = true;
  chatbotToggle.classList.remove("is-hidden");
});

chatbotForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  enviarMensaje(chatbotInput.value);
});
