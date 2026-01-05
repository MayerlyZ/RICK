
CORRECCION EN NOMBRES DE ENCARPETACION

en la ruta src/app/home)
Se corrigio el nombre de la carpeta home) por home


COMPONENTES COMPARTIDOS
Se encontraron dos carpetas nombradas igual "Components", se fusionan 
Cuando se hace esto en el archivo Card, se actualiza la ruta 



CREACION DE CARPETAS-ARCHIVOS

types: Se creo una carpeta dentro de src para el manejo de tipos y asi poderlos reutilizar 

hooks/useCharacters.ts: se creo la carpeta con el archivo buscando encapsular la logica de negocio que hay dentro de src/app/page.tsx para que desde page.tsx solo se consuma el hook

CharacterModal.tsx: Se creo este archivo con el fin de que cuando se le diera click a una card de un personaje se me abriera un modal mostrandome informacion del personaje (detalles)

types/components.ts: se crea con el objetivo de centralizar los tipos ed las props que usan varios componentes para asi evitar la duplicacion 

CARPETA STYLES
Alli pusimos los estilos que se manejan globalmente, se cambio el como se muestran los personajes, 

dentro de componentes se crearon las carpetas card, filters header y sidebar para mejor manejo 

MODIFICACIONES
Se reemplazo el uso de 
 types/styled-components 
por modulos de css, mejor mantenibilidad 


LOGICA MODIFICADA

services/api.ts: Se modifico la logica buscando mejorar los datos que me responde la peticion, ademas para el correcto manejo de errores

src/app/page.tsx: Se separo la logica de negocio con UI, en este archivo solo lo renderizamos y consumimos el hook

src/app/dashboard/àge.tsx: se separaron las interfaces y solo las importamos esto se hace en varios archivos como sidebar

filterPanel.tsx:

CAMBIO: Filtrado (FiltersPanel)

- Se integró `FiltersPanel` en la página principal (`src/app/page.tsx`). Añadí los estados `search` y `status` y conecté las funciones `onSearchChange` y `onStatusChange` desde la página hacia el componente de filtros.
- Se implementó el filtrado en cliente mediante `useMemo`, calculando `filteredCharacters` a partir de `characters`, `search` y `status`. El filtro de texto es case-insensitive y el valor `status === 'all'` no aplica filtro por estado.
- Para evitar el error de React sobre el orden de hooks (`Rendered more hooks than during the previous render`) coloqué la llamada a `useMemo` antes de los retornos tempranos (`if (loading)`, `if (error)`, etc.), garantizando que los hooks se llamen en el mismo orden en cada render.




```