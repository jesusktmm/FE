# USO_IA.md

## Herramienta de IA utilizada

ChatGPT (OpenAI)

## Uso de IA en el desarrollo

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para mejorar la arquitectura del código, aplicar buenas prácticas de seguridad y refactorizar funciones JavaScript.

## Prompts utilizados

### Prompt 1

Ayúdame a diseñar una aplicación web en HTML5, CSS3 y JavaScript Vanilla para gestionar tareas y monitorear camiones en una bodega.

### Prompt 2

Ayúdame a organizar arreglos de objetos para almacenar tareas y camiones.

### Prompt 3

Muéstrame buenas prácticas para prevenir XSS al manipular el DOM con JavaScript.

### Prompt 4

Refactoriza el código JavaScript en funciones reutilizables y modulares.

## Mejoras aplicadas gracias a IA

### Seguridad

Se implementó:

* Sanitización de inputs
* Prevención de XSS
* Uso de `textContent` en lugar de `innerHTML`

### Refactorización

Se modularizó el código usando funciones reutilizables:

* sanitizeInput()
* addTask()
* renderTasks()
* addTruck()
* moveTruck()
* deleteTruck()
* updateDashboard()

### Organización de datos

Se utilizó:

* Arreglos para almacenar tareas y camiones
* Objetos para representar cada tarea y cada camión
* localStorage para persistencia de datos

## Beneficios del uso de IA

El uso de IA permitió:

* Mejorar la estructura del código
* Reducir duplicación de lógica
* Detectar posibles vulnerabilidades
* Mejorar la interfaz y experiencia de usuario
