# Perfimet CargoTrack

## Descripción del proyecto

Perfimet CargoTrack es una aplicación web desarrollada con HTML5, CSS3 y JavaScript Vanilla para la gestión de tareas y monitoreo logístico de camiones dentro de una bodega.

El sistema permite controlar tareas operativas y hacer seguimiento del estado de camiones desde su ingreso hasta su despacho final.

---

## Problemática

En entornos logísticos, el control manual de tareas y despacho de camiones puede generar:

* Errores de registro
* Pérdida de trazabilidad
* Retrasos operacionales
* Dificultad para monitorear estados en tiempo real

Este proyecto busca digitalizar y optimizar dicho proceso.

---

## Funcionalidades

### Gestión de tareas

* Agregar tareas
* Visualizar tareas
* Marcar tareas como completadas
* Eliminar tareas

Cada tarea contiene:

* Título
* Prioridad
* Fecha límite

---

### Gestión logística de camiones

Registro de:

* Patente
* Chofer
* Empresa
* Carga
* Hora de ingreso

Empresas disponibles:

* Kemchi
* Unanue
* Externo

---

## Flujo logístico de estados

Cada camión se registra una sola vez y avanza por 4 estados:

1. Ingreso
2. En Bodega
3. En Ruta
4. Entregado

El cambio de estado se realiza dinámicamente mediante botones.

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript Vanilla
* Git / GitHub
* LocalStorage

---

## Seguridad implementada

Para mejorar la seguridad del sistema se implementó:

* Sanitización de inputs
* Prevención de XSS
* Uso de `createElement`
* Uso de `textContent`
* Evitar `innerHTML`

---

## Estructura de datos

Se utilizaron:

### Arreglo de tareas

```javascript
tasks[]
```

### Arreglo de camiones

```javascript
trucks[]
```

Cada elemento del arreglo se almacena como un objeto JavaScript.

---

## Autor

Jesús Hidalgo

---

## Institución

INACAP
Analista Programador

---

## Asignatura

Front end / Sumativa 2
