/*
  ====================================================================
  DATOS DEL PORTAFOLIO
  ====================================================================
  Edita este archivo para poner tu contenido real. La estructura es:

  UNIDAD 1..4
    └── SEMANA 1..4
          └── ACTIVIDAD 1..2

  Cada actividad tiene:
    - titulo        -> nombre corto que aparece en el menú
    - descripcion    -> texto explicando qué hiciste
    - estado         -> "pendiente" o "listo"
    - evidenciaUrl   -> enlace a tu evidencia (imagen, PDF, repo, etc.)
                        déjalo como "" si todavía no tienes nada

  Cada unidad tiene un "color" que la identifica en todo el sitio.
  Opciones disponibles: "purple", "pink", "teal", "orange".

  No necesitas tocar main.js ni style.css para actualizar tu contenido:
  basta con editar los textos de aquí abajo.
  ====================================================================
*/

const PORTFOLIO = [];

const UNIDADES_CONFIG = [
  { titulo: "Unidad 1", color: "purple", icono: "🏛️", tema: "Arquitecturas" },
  { titulo: "Unidad 2", color: "pink",   icono: "⚙️",  tema: "Optimización" },
  { titulo: "Unidad 3", color: "teal",   icono: "🔒", tema: "Seguridad" },
  { titulo: "Unidad 4", color: "orange", icono: "💾", tema: "Respaldo" }
];

for (let u = 1; u <= 4; u++) {
  const config = UNIDADES_CONFIG[u - 1];
  const unidad = {
    id: `u${u}`,
    titulo: config.titulo,
    color: config.color,
    icono: config.icono,
    tema: config.tema,
    semanas: []
  };

  for (let s = 1; s <= 4; s++) {
    const semana = {
      id: `u${u}-s${s}`,
      titulo: `Semana ${s}`,
      actividades: []
    };

    for (let a = 1; a <= 2; a++) {
      semana.actividades.push({
        id: `u${u}-s${s}-a${a}`,
        titulo: `Actividad ${a}`,
        descripcion: `Escribe aquí en qué consistió la Actividad ${a} de la Semana ${s}, Unidad ${u}: qué se pidió, qué hiciste y qué aprendiste.`,
        estado: "pendiente",   // cambia a "listo" cuando termines
        evidenciaUrl: ""        // pon aquí el enlace a tu evidencia
      });
    }

    unidad.semanas.push(semana);
  }

  PORTFOLIO.push(unidad);
}
