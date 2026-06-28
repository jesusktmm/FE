// =====================================
// PERFIMET CARGOTRACK
// =====================================

// ---------- DOM ----------
const taskForm = document.getElementById("taskForm");
const truckForm = document.getElementById("truckForm");
const taskList = document.getElementById("taskList");

const ingresoContainer = document.getElementById("ingresoContainer");
const bodegaContainer = document.getElementById("bodegaContainer");
const rutaContainer = document.getElementById("rutaContainer");
const entregadoContainer = document.getElementById("entregadoContainer");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const trucksWarehouse = document.getElementById("trucksWarehouse");
const trucksRoute = document.getElementById("trucksRoute");

// ---------- DATA ----------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let trucks = JSON.parse(localStorage.getItem("trucks")) || [];

// =====================================
// UTILIDADES / SEGURIDAD
// =====================================
function sanitizeInput(value) {
    return value.replace(/[<>]/g, "").trim();
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePlate(plate) {
    const regex = /^[A-Z0-9-]{5,8}$/;
    return regex.test(plate);
}

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("trucks", JSON.stringify(trucks));
}

// =====================================
// TAREAS
// =====================================
function addTask(title, email, priority, date) {
    tasks.push({
        id: Date.now(),
        title,
        email,
        priority,
        date,
        completed: false
    });

    saveData();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });

    saveData();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveData();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task-card");

        if (task.completed) {
            card.classList.add("completed");
        }

        const title = document.createElement("h3");
        title.textContent = task.title;

        const email = document.createElement("p");
        email.textContent = "Responsable: " + task.email;

        const priority = document.createElement("p");
        priority.textContent = "Prioridad: " + task.priority;

        const date = document.createElement("p");
        date.textContent = "Fecha límite: " + task.date;

        const buttons = document.createElement("div");
        buttons.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Deshacer" : "Completar";
        completeBtn.classList.add("complete-btn");
        completeBtn.onclick = () => toggleTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTask(task.id);

        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);

        card.append(title, email, priority, date, buttons);
        taskList.appendChild(card);
    });

    updateDashboard();
}

// =====================================
// CAMIONES
// =====================================
function addTruck(patente, chofer, empresa, carga, horaIngreso) {
    trucks.push({
        id: Date.now(),
        patente,
        chofer,
        empresa,
        carga,
        horaIngreso,
        estado: "ingreso"
    });

    saveData();
    renderTrucks();
}

function moveTruck(id) {
    trucks = trucks.map(truck => {
        if (truck.id === id) {
            if (truck.estado === "ingreso") truck.estado = "bodega";
            else if (truck.estado === "bodega") truck.estado = "ruta";
            else if (truck.estado === "ruta") truck.estado = "entregado";
        }
        return truck;
    });

    saveData();
    renderTrucks();
}

function deleteTruck(id) {
    if (confirm("¿Desea eliminar este camión?")) {
        trucks = trucks.filter(truck => truck.id !== id);
        saveData();
        renderTrucks();
    }
}

function createTruckCard(truck) {
    const card = document.createElement("div");
    card.classList.add("truck-card");

    const patente = document.createElement("p");
    patente.textContent = "Patente: " + truck.patente;

    const chofer = document.createElement("p");
    chofer.textContent = "Chofer: " + truck.chofer;

    const empresa = document.createElement("p");
    empresa.textContent = "Empresa: " + truck.empresa;

    const carga = document.createElement("p");
    carga.textContent = "Carga: " + truck.carga;

    const hora = document.createElement("p");
    hora.textContent = "Ingreso: " + truck.horaIngreso;

    card.append(patente, chofer, empresa, carga, hora);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("truck-buttons");

    if (truck.estado !== "entregado") {
        const moveBtn = document.createElement("button");
        moveBtn.classList.add("move-btn");

        if (truck.estado === "ingreso") {
            moveBtn.textContent = "Enviar a Bodega";
        } else if (truck.estado === "bodega") {
            moveBtn.textContent = "Enviar a Ruta";
        } else {
            moveBtn.textContent = "Marcar Entregado";
        }

        moveBtn.onclick = () => moveTruck(truck.id);
        buttonGroup.appendChild(moveBtn);
    } else {
        const done = document.createElement("p");
        done.textContent = "Entrega finalizada ✓";
        card.appendChild(done);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar Camión";
    deleteBtn.classList.add("delete-truck-btn");
    deleteBtn.onclick = () => deleteTruck(truck.id);

    buttonGroup.appendChild(deleteBtn);
    card.appendChild(buttonGroup);

    return card;
}

function renderTrucks() {
    ingresoContainer.innerHTML = "";
    bodegaContainer.innerHTML = "";
    rutaContainer.innerHTML = "";
    entregadoContainer.innerHTML = "";

    trucks.forEach(truck => {
        const card = createTruckCard(truck);

        if (truck.estado === "ingreso") {
            ingresoContainer.appendChild(card);
        } else if (truck.estado === "bodega") {
            bodegaContainer.appendChild(card);
        } else if (truck.estado === "ruta") {
            rutaContainer.appendChild(card);
        } else {
            entregadoContainer.appendChild(card);
        }
    });

    updateDashboard();
}

// =====================================
// DASHBOARD
// =====================================
function updateDashboard() {
    totalTasks.textContent = tasks.length;
    pendingTasks.textContent = tasks.filter(t => !t.completed).length;
    trucksWarehouse.textContent = trucks.filter(t => t.estado === "bodega").length;
    trucksRoute.textContent = trucks.filter(t => t.estado === "ruta").length;
}

// =====================================
// EVENTOS
// =====================================
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = sanitizeInput(document.getElementById("taskTitle").value);
    const email = sanitizeInput(document.getElementById("taskEmail").value);
    const priority = document.getElementById("taskPriority").value;
    const date = document.getElementById("taskDate").value;

    if (title.length < 3) {
        alert("Título inválido.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Correo inválido.");
        return;
    }

    addTask(title, email, priority, date);
    taskForm.reset();
});

truckForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const patente = sanitizeInput(
        document.getElementById("patente").value.toUpperCase()
    );
    const chofer = sanitizeInput(document.getElementById("chofer").value);
    const empresa = document.getElementById("empresa").value;
    const carga = sanitizeInput(document.getElementById("carga").value);
    const horaIngreso = document.getElementById("horaIngreso").value;

    if (!validatePlate(patente)) {
        alert("Patente inválida.");
        return;
    }

    if (chofer.length < 3) {
        alert("Chofer inválido.");
        return;
    }

    addTruck(patente, chofer, empresa, carga, horaIngreso);
    truckForm.reset();
});

// INIT
renderTasks();
renderTrucks();