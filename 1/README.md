# Portafolio personal moderno

## Estructura
- `index.html` — página principal.
- `css/style.css` — diseño responsive, modo oscuro/claro y componentes.
- `js/data.js` — aquí se encuentran las 4 unidades, 16 semanas y 32 actividades.
- `js/main.js` — navegación, búsqueda, filtros, progreso y ventanas de tareas.
- `js/chatbot.js` — asistente local del portafolio.
- `assets/` — coloca aquí tus imágenes, PDFs o recursos si deseas versionarlos con Git.

## Cómo poner tus tareas
Cada semana tiene 2 actividades. Abre `js/data.js` y cambia `activities` y `details`.
Después puedes añadir el enlace a GitHub, Google Drive u otro recurso dentro de la ventana de cada actividad.

## GitHub Pages
1. Crea un repositorio, por ejemplo `mi-portafolio`.
2. Sube todos los archivos manteniendo las carpetas.
3. En GitHub entra a Settings → Pages.
4. Selecciona Deploy from a branch, rama `main` y carpeta `/root`.
5. Guarda y espera a que GitHub Pages publique la web.

## Consejo
Para evidencias pesadas, es mejor guardar el código en el repositorio y usar enlaces para PDFs o videos grandes. No subas contraseñas, claves API ni datos privados.
