# README

React challenge para MTC corp.

Consiste en una ToDo app donde seran agregados items pendientes o por hacer. Esta app fue creada con ReacJS.
Puedes descargar o clonar este repositorio. Una vez cargado necesitas iniciar el servidor (realizado con NodeJS, Express y GraphQL) desde la ruta de la carpeta principal, utilizando el comando: 

node server.js

Luego para iniciar la app desde la misma ruta con el comando:

npm start

La app consiste en una pantalla principal con opciones para filtrar los items por completados, incompletos y todos. Asi como tambien, tiene un boton para agregar una nueva tarea que abre una pantalla nueva, donde se pueden agregar datos como:
- Titulo.
- Fecha limite.
- Horario en el que estara activo el recordatorio.

Una vez cargados los nuevos datos y guardada la tarea, esta ventana se cerrara y volvera a la pantalla de inicio.

Cada tarea tiene la opcion de borrado y marcado como completo/incompleto.


## Imports

React Router:
npm i react-router-dom

GraphQL:
npm i graphql

Apollo:
npm i @apollo/client

Express:
npm i express-graphql express

uuid:
npm i uuid
