# Portafolio personal — Base de Datos II

## Estructura de carpetas
```
portafolio-personal/
├── index.html        (página principal)
├── css/
│   └── style.css      (estilos)
├── js/
│   ├── data.js         (AQUÍ editas tu contenido: unidades, semanas, actividades)
│   ├── main.js          (lógica del menú, no necesitas tocarlo)
│   └── chatbot.js        (asistente flotante, responde por palabras clave)
└── README.md
```

## Acceso (login)
Antes de ver el portafolio se pide usuario y contraseña:
- Usuario: `david`
- Contraseña: `123`

Se configuran en `js/auth.js` (constantes `USUARIO_VALIDO` y `CLAVE_VALIDA`).
⚠️ Es solo una pantalla de presentación: al ser un sitio estático, cualquiera
que abra ese archivo puede ver la contraseña en el código. No la uses para
proteger información sensible real.

## El chatbot — "El Archivero"
Es un asistente simple hecho en JavaScript (no necesita internet ni API),
con personalidad de archivero de biblioteca antigua. Responde preguntas
sobre cómo navegar el portafolio buscando palabras clave en el mensaje
del usuario. Para agregar más respuestas, edita el arreglo `INTENCIONES`
en `js/chatbot.js`.

## Cómo abrirlo en VS Code
1. Descarga y descomprime la carpeta `portafolio-personal`.
2. Abre VS Code → `Archivo` → `Abrir carpeta...` → selecciona `portafolio-personal`.
3. Instala la extensión **Live Server** (si no la tienes).
4. Click derecho sobre `index.html` → **Open with Live Server**.

## Cómo agregar tu contenido
Todo tu contenido real (descripciones, evidencias, estado) se edita en
**`js/data.js`**. No necesitas tocar `main.js` ni `style.css`.

Por cada actividad puedes cambiar:
- `descripcion`: qué hiciste en esa actividad.
- `estado`: pon `"listo"` cuando la termines (cambia el color de la etiqueta).
- `evidenciaUrl`: enlace a tu evidencia (una imagen subida a internet, un
  repositorio de GitHub, un PDF, etc.). Si lo dejas vacío `""`, se muestra
  un aviso de que falta.

Si quieres renombrar las unidades (por ejemplo "Unidad 1: Arquitecturas"),
edita el arreglo `NOMBRES_UNIDADES` al inicio de `data.js`.

## Siguiente paso sugerido
Cuando quieras subir capturas o archivos como evidencia, puedes crear una
carpeta `assets/` dentro del proyecto, poner ahí tus imágenes y usar una
ruta relativa en `evidenciaUrl`, por ejemplo: `"assets/actividad1.png"`.
