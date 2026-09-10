/*
  ====================================================================
  LÓGICA DEL PORTAFOLIO
  ====================================================================
  No es necesario editar este archivo para agregar contenido:
  eso se hace en data.js. Aquí solo se construye el menú y las vistas.
  ====================================================================
*/

const treeEl = document.getElementById("tree");
const viewEl = document.getElementById("view");
const btnInicio = document.getElementById("btnInicio");

function construirMenu() {
  treeEl.innerHTML = "";

  PORTFOLIO.forEach((unidad) => {
    const detUnidad = document.createElement("details");
    detUnidad.className = `tree__unidad accent-${unidad.color}`;

    const sumUnidad = document.createElement("summary");
    sumUnidad.innerHTML = `<span class="dot"></span><span class="tree__icono">${unidad.icono}</span>${unidad.titulo}`;
    detUnidad.appendChild(sumUnidad);

    unidad.semanas.forEach((semana) => {
      const detSemana = document.createElement("details");
      detSemana.className = "tree__semana";

      const sumSemana = document.createElement("summary");
      sumSemana.textContent = semana.titulo;
      detSemana.appendChild(sumSemana);

      const lista = document.createElement("ul");
      lista.className = "tree__actividades";

      semana.actividades.forEach((actividad) => {
        const item = document.createElement("li");
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "tree__actividad";
        boton.textContent = actividad.titulo;
        boton.dataset.id = actividad.id;

        boton.addEventListener("click", () => {
          mostrarActividad(unidad, semana, actividad, boton);
        });

        item.appendChild(boton);
        lista.appendChild(item);
      });

      detSemana.appendChild(lista);
      detUnidad.appendChild(detSemana);
    });

    treeEl.appendChild(detUnidad);
  });
}

function marcarActivo(boton) {
  document.querySelectorAll(".tree__actividad.is-active")
    .forEach((b) => b.classList.remove("is-active"));
  document.querySelectorAll(".tree__inicio.is-active")
    .forEach((b) => b.classList.remove("is-active"));

  if (boton) boton.classList.add("is-active");
}

function sello(estado) {
  if (estado === "listo") {
    return `<span class="stamp stamp--listo">Completado</span>`;
  }
  return `<span class="stamp stamp--pendiente">Pendiente</span>`;
}

function numeroFicha(actividad) {
  const match = actividad.id.match(/u(\d)-s(\d)-a(\d)/);
  if (!match) return "";
  const [, u, s, a] = match;
  return `${u}.${s}.${a}`;
}

function mostrarActividad(unidad, semana, actividad, boton) {
  marcarActivo(boton);

  const esListo = actividad.estado === "listo";

  viewEl.innerHTML = `
    <div class="view__card accent-${unidad.color} ${esListo ? "view__card--sellado" : ""}">
      <span class="tape tape--left"></span>
      <span class="tape tape--right"></span>
      ${esListo ? `<span class="watermark">Archivado</span>` : ""}

      <p class="ficha">Ficha N.&deg; ${numeroFicha(actividad)}</p>
      <p class="crumb">${unidad.icono} ${unidad.titulo} &middot; ${unidad.tema} &middot; ${semana.titulo}</p>
      <div class="view__head">
        <h1 class="view__title">${actividad.titulo}</h1>
        ${sello(actividad.estado)}
      </div>

      <div class="ornament">&#10087; &#10087; &#10087;</div>

      <section class="view__block">
        <h2>Descripción</h2>
        <p>${actividad.descripcion}</p>
      </section>

      <section class="view__block">
        <h2>Evidencia</h2>
        ${
          actividad.evidenciaUrl
            ? `<a class="evidencia__link" href="${actividad.evidenciaUrl}" target="_blank" rel="noopener">Abrir evidencia &rarr;</a>`
            : `<p class="muted">Todavía no se ha archivado ninguna evidencia en data.js.</p>`
        }
      </section>
    </div>
  `;
}

function ilustracionFichero() {
  return `
  <svg class="hero__illustration" viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="18" width="196" height="256" rx="4" fill="var(--wood)" stroke="var(--ink)" stroke-width="2"/>
    ${[0, 1, 2, 3].map((i) => {
      const y = 34 + i * 60;
      const color = ["var(--red)", "var(--mustard)", "var(--olive)", "var(--petrol)"][i];
      return `
        <rect x="30" y="${y}" width="172" height="48" rx="2" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5"/>
        <rect x="30" y="${y}" width="10" height="48" fill="${color}"/>
        <text x="108" y="${y + 22}" text-anchor="middle" class="hero__label">UNIDAD ${i + 1}</text>
        <circle cx="108" cy="${y + 34}" r="5" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
      `;
    }).join("")}
    <path d="M8 284 h244" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
    <!-- Clip de papel decorativo -->
    <g transform="translate(196,10) rotate(18)">
      <path d="M0 0 a10 10 0 0 1 20 0 v26 a10 10 0 0 1 -20 0 v-18 a5 5 0 0 1 10 0 v14"
            fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
    </g>
  </svg>`;
}

function ilustracionTintero() {
  return `
  <svg class="deco__inkwell" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="72" rx="22" ry="8" fill="var(--ink)" opacity="0.08"/>
    <path d="M14 40 h32 l-4 30 a4 4 0 0 1 -4 4 h-16 a4 4 0 0 1 -4 -4 z" fill="var(--ink)"/>
    <rect x="10" y="30" width="40" height="12" rx="2" fill="var(--red)"/>
    <path d="M46 34 L86 6" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
    <path d="M86 6 l8 -4 -2 9 z" fill="var(--ink)"/>
    <path d="M52 52 C 62 46, 70 50, 78 44" stroke="var(--muted)" stroke-width="1.4" fill="none" stroke-dasharray="2 3"/>
  </svg>`;
}

function ilustracionLibros() {
  return `
  <svg class="deco__books" viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="46" width="100" height="12" rx="2" fill="var(--olive)" stroke="var(--ink)" stroke-width="1.5"/>
    <rect x="12" y="32" width="88" height="12" rx="2" fill="var(--mustard)" stroke="var(--ink)" stroke-width="1.5"/>
    <rect x="20" y="18" width="70" height="12" rx="2" fill="var(--petrol)" stroke="var(--ink)" stroke-width="1.5"/>
    <rect x="30" y="4" width="46" height="12" rx="2" fill="var(--red)" stroke="var(--ink)" stroke-width="1.5"/>
  </svg>`;
}

function manchaTinta() {
  return `
  <svg class="deco__blot" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 20 C140 20 170 55 165 95 C185 110 175 150 140 155 C130 180 90 185 70 165
             C35 170 15 135 30 105 C15 80 35 45 65 40 C70 20 85 20 100 20 Z"
          fill="var(--ink)"/>
  </svg>`;
}

function mostrarInicio() {
  marcarActivo(btnInicio);

  const tarjetasUnidades = PORTFOLIO.map((u) => `
    <div class="home__card accent-${u.color}">
      <span class="home__card-icono">${u.icono}</span>
      <h3>${u.titulo}</h3>
      <p class="home__card-tema">${u.tema}</p>
      <p>${u.semanas.length} semanas &middot; ${u.semanas.length * 2} actividades</p>
    </div>
  `).join("");

  viewEl.innerHTML = `
    <div class="hero">
      <div class="hero__text">
        ${manchaTinta()}
        <p class="crumb">Portafolio personal &middot; Archivo N.&deg; 1</p>
        <h1 class="view__title view__title--hero">Base de&nbsp;Datos II</h1>
        <p class="hero__sub">
          Arquitecturas, optimización y seguridad, archivadas por
          unidad, semana y actividad &mdash; a la manera de un viejo
          fichero de biblioteca.
        </p>
        <div class="home__grid">
          ${tarjetasUnidades}
        </div>
        <div class="hero__deco-row">
          ${ilustracionTintero()}
          ${ilustracionLibros()}
        </div>
        <p class="muted hero__hint">
          Use el menú de la izquierda para consultar el archivo, o
          pregúntele al Archivero (esquina inferior derecha).
        </p>
      </div>
      <div class="hero__art">
        ${ilustracionFichero()}
      </div>
    </div>
  `;
}

btnInicio.addEventListener("click", mostrarInicio);

construirMenu();
mostrarInicio();
