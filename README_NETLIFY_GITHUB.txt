V7 Cloud - Configuración rápida

1) Sube esta carpeta a un repositorio GitHub.
2) En Netlify: Add new site > Import from Git > selecciona el repositorio.
3) Build command: dejar vacío. Publish directory: .
4) En Netlify > Site configuration > Environment variables: crea EDIT_PIN con el PIN que quieras.
5) Deploy.
6) En la web, introduce el PIN en "Modo edición". Presupuesto y checklist se guardan en Netlify Blobs y serán comunes para todos los dispositivos.

Nota: si haces drag-and-drop sin build/GitHub, la parte visual puede funcionar, pero las Functions/Blobs pueden no activarse correctamente. Recomendado: GitHub + Netlify.
