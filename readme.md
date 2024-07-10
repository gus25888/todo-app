# Blackjack Vite

Pasos para ejecutar proyecto:

1. Clonar repositorio 

> git clone https://github.com/gus25888/js-vite-blackjack

2. Ejecutar 

> npm install

3. Ejecutar la aplicación usando 

> npm run dev

4. Abrir el proyecto en el navegador en la dirección: ``localhost:port``

## Despliegue en producción

1. Ejecutar el comando:

    > npm run build

2. Copiar la carpeta ``dist`` que se genera en el webserver correspondiente por ej. Netlify (https://app.netlify.com/login/email)


# Librería Vite

Es una librería que permite generar builds de proyectos a nivel de frontend, generando la minificación de los archivos JS, CSS y HTML y generando las copias correspondientes en un directorio llamado dist.

Además, se encarga de enlazar y mantener los archivos estáticos de la aplicación de modo que estén disponibles en una forma ordenada y jerárquica.

Para crear un nuevo proyecto, se debe usar el comando:

>npm create vite



A medida que se van haciendo cambios al proyecto, se puede levantar el mismo y ver los ajustes en "caliente", con el comando:

>npm run dev


Cuando ya se tiene la certeza de que los cambios serán desplegados a un ambiente productiovo, se debe generar una build que haga el proceso de adecuación y compresión de ellos. Los archivos son generados con el comando:

>npm run build


En el caso de querer desplegar el proyecto y para poder mantener un orden respecto a la ubicación de los archivos ubicados en los assets del proyecto, se debe definir un archivo de configuración de vite ``vite.config.js``. Este archivo permite indicar el nombre de la ruta de subdirectorios que tendrá el proyecto en su totalidad, lo cual Vite usará al usar el comando ``npm run build`` para determinar como desplegar las referencias de los archivos en el HTML.