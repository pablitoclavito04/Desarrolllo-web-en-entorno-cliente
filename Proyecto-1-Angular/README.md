# Proyecto-1-Angular - Practica DOM Angular.

## 1. Descripción:
Esta práctica consiste en el desarrollo de una aplicación Angular que demuestra la manipulación del DOM mediante la detección
automática de navegadores y la modificación dinámica de elementos. El proyecto fue desarrollado utilizando Angular 20 con
componentes standalone, TypeScript, HTML5 y CSS3.


## 2. Objetivos:
Los objetivos principales de esta práctica son reconocer y acceder al modelo de objetos del documento (DOM), crear y modificar
elementos dinámicamente, asociar acciones a eventos del DOM, atender diferencias en navegadores mediante código condicional y
separar claramente contenido, aspecto y comportamiento en la aplicación.


## 3. Tecnologías utilizadas:
El proyecto utiliza Angular CLI 20.3.10, Node.js versión 24.11.0 y npm 11.6.1. La estructura del proyecto sigue el patrón
estándar de Angular con componentes standalone, donde el archivo app.ts contiene toda la lógica del componente, app.html define
la estructura visual y app.css proporciona los estilos.


## 4. Funcionalidades:
La funcionalidad principal de la aplicación incluye la detección automática del navegador del usuario mediante el análisis del
user agent. Dependiendo del navegador detectado, la aplicación cambia dinámicamente el color de fondo de un elemento div: azul
claro para Chrome, verde claro para Edge, coral claro para Firefox y amarillo claro para otros navegadores. Esta detección se
realiza en el método ngAfterViewInit del componente, garantizando que el DOM esté completamente cargado antes de realizar
modificaciones.

La aplicación también permite la manipulación dinámica de listas mediante un botón que añade nuevos elementos a un array
reactivo. Cada vez que el usuario hace clic en el botón "Añadir ítem", se agrega un nuevo elemento numerado secuencialmente a la
lista visible. Esta funcionalidad demuestra el uso de signals de Angular para el manejo reactivo del estado.

Además, la aplicación implementa un input de texto con actualización en tiempo real. Cuando el usuario escribe en el campo de
texto, el contenido se muestra instantáneamente debajo del input gracias al event binding y los signals reactivos. Esto demuestra
la capacidad de Angular para responder automáticamente a los eventos del usuario sin necesidad de manipulación manual del DOM.



## 5. Explicaciones técnicas:
El acceso directo al DOM se realiza mediante el decorador ViewChild, que obtiene una referencia al elemento HTML marcado con la
template reference variable #content. Esta referencia permite modificar directamente propiedades del elemento nativo, como el
color de fondo y el contenido de texto, demostrando la capacidad de Angular para trabajar con el DOM nativo cuando es necesario.

La aplicación utiliza el lifecycle hook ngAfterViewInit para garantizar que todas las modificaciones del DOM se realicen después
de que la vista haya sido completamente inicializada. Esto es crucial para evitar errores al intentar acceder a elementos que aún
no existen en el DOM.

El event binding se implementa mediante las directivas (click) para el botón y (input) para el campo de texto. Estos eventos se
conectan con métodos del componente que actualizan el estado de la aplicación de forma reactiva. La sintaxis de control flow
moderna de Angular (@for) se utiliza para iterar sobre el array de elementos y renderizar cada uno en la lista.

Los signals de Angular se emplean para el manejo del estado de la aplicación. El título, la lista de elementos y el texto del
input se definen como signals, lo que permite que Angular detecte automáticamente los cambios y actualice la vista de forma
eficiente. Los signals se acceden mediante la sintaxis de llamada a función, por ejemplo title(), y se actualizan mediante el
método set() o mediante manipulación del array en el caso de listas.



## 6. Separación de responsabilidades:
La separación de responsabilidades se mantiene estrictamente en el proyecto. El archivo app.ts contiene únicamente la lógica del
componente y la interacción con el DOM. El archivo app.html define la estructura y presentación del contenido mediante
interpolación, directivas y event binding. El archivo app.css proporciona todos los estilos visuales, incluyendo el diseño del
contenedor, botones, inputs y lista, con transiciones suaves y efectos hover.
 

## 7. Instrucciones de instalación:
Para ejecutar el proyecto localmente, primero se debe instalar Angular CLI globalmente mediante npm install -g @angular/cli.
Luego, dentro de la carpeta del proyecto, se ejecuta npm install para instalar todas las dependencias. Finalmente, el comando ng
serve inicia el servidor de desarrollo y la aplicación queda disponible en http://localhost:4200. El servidor incluye hot reload,
por lo que cualquier cambio en el código se refleja automáticamente en el navegador.


## 8. Conclusión:
La práctica demuestra conceptos fundamentales del desarrollo web moderno con Angular, incluyendo el acceso y manipulación del
DOM, el manejo de eventos del usuario, la detección de características del navegador, la programación reactiva con signals y la
separación clara entre la lógica de negocio, la presentación y los estilos. Estos conceptos son esenciales para el desarrollo de
aplicaciones web modernas y escalables.
