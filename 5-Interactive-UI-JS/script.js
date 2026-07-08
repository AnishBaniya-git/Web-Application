const taskList = [
  {
    id: 1,
    title: "To do home-work",
    deadline: "09/01/2026",
    description:
      "Finish the math and science assignments due at the end of the week.",
    status: 0,
  },
  {
    id: 2,
    title: "Buy groceries",
    deadline: "09/03/2026",
    description:
      "Milk, eggs, bread, and vegetables for the week. Don't forget coffee.",
    status: 0,
  },
  {
    id: 3,
    title: "Clean the garage",
    deadline: "08/20/2026",
    description:
      "Sort through boxes, donate what isn't needed, and sweep the floor.",
    status: 1,
  },
  {
    id: 4,
    title: "Renew car insurance",
    deadline: "08/15/2026",
    description:
      "Old policy quote was too expensive, so this got cancelled and skipped.",
    status: 2,
  },
];

/**
 * Returns the CSS classes and badge text associated with a given
 * task status number (0 = In Progress, 1 = Completed, 2 = Deleted).
 */
function getStatusInfo(status) {
  switch (status) {
    case 0:
      return {
        statusClass: "status-inprogress",
        badgeClass: "badge-inprogress",
        badgeText: "In Progress",
      };
    case 1:
      return {
        statusClass: "status-completed",
        badgeClass: "badge-completed",
        badgeText: "Completed",
      };
    case 2:
      return {
        statusClass: "status-deleted",
        badgeClass: "badge-deleted",
        badgeText: "Deleted",
      };
  }
}

/**
 * Builds the footer button HTML for a task card based on its status.
 * In-progress tasks get both buttons, completed tasks only get Delete,
 * and deleted tasks get no buttons at all.
 */
function buildTaskButtonsHTML(id, status) {
  if (status === 0) {
    return `
      <button class="btn btn-primary" data-id="${id}" onclick="markAsCompleteEventHandler(event);">Mark As Completed</button>
      <button class="btn btn-secondary" data-id="${id}" onclick="deleteEventHandler(event);">Delete</button>
    `;
  }

  if (status === 1) {
    return `
      <button class="btn btn-secondary" data-id="${id}" onclick="deleteEventHandler(event);">Delete</button>
    `;
  }

  return "";
}

/**
 * Counts tasks by status and writes the totals into the summary cards.
 */
function renderSummary() {
  let inProgressCount = 0;
  let completedCount = 0;
  let deletedCount = 0;

  taskList.forEach((task) => {
    if (task.status === 0) inProgressCount++;
    else if (task.status === 1) completedCount++;
    else if (task.status === 2) deletedCount++;
  });

  document.getElementById("inprogress-count").textContent = inProgressCount;
  document.getElementById("completed-count").textContent = completedCount;
  document.getElementById("deleted-count").textContent = deletedCount;
}

/**
 * Renders the task list, optionally filtered by status.
 * filterValue of -1 (the default) shows every task.
 */
function renderTaskList(filterValue = -1) {
  const taskListEl = document.querySelector(".task-list");
  taskListEl.innerHTML = "";

  taskList.forEach((task) => {
    if (filterValue !== -1 && task.status !== filterValue) {
      return;
    }

    const { statusClass, badgeClass, badgeText } = getStatusInfo(
      task.status,
    );
    const buttonsHTML = buildTaskButtonsHTML(task.id, task.status);

    const cardHTML = `
      <article class="task-card ${statusClass}">
        <header>
          <h3 class="task-title">${task.title}</h3>
        </header>
        <span class="text-muted text-sm">${task.deadline}</span>
        <div>
          <span class="status-badge ${badgeClass}">${badgeText}</span>
        </div>
        <p>${task.description}</p>
        <footer class="text-right">
          ${buttonsHTML}
        </footer>
      </article>
    `;

    const li = document.createElement("li");
    li.innerHTML = cardHTML;
    taskListEl.appendChild(li);
  });
}

/**
 * Marks the clicked task as completed (status 1) and re-renders the page.
 */
function markAsCompleteEventHandler(e) {
  e.stopPropagation();
  const id = parseInt(e.target.dataset.id);
  const index = taskList.findIndex((task) => task.id === id);
  if (index === -1) return;

  taskList[index].status = 1;
  renderSummary();
  renderTaskList();
}

/**
 * Marks the clicked task as deleted (status 2) and re-renders the page.
 */
function deleteEventHandler(e) {
  e.stopPropagation();
  const id = parseInt(e.target.dataset.id);
  const index = taskList.findIndex((task) => task.id === id);
  if (index === -1) return;

  taskList[index].status = 2;
  renderSummary();
  renderTaskList();
}

/**
 * Wires up the sidebar filter buttons: clicking one re-renders the task
 * list filtered to that status and updates the "selected" visual state.
 */
function setupSidebarButtons() {
  const buttons = document.querySelectorAll(".sidebar-menu button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = parseInt(btn.dataset.filter);
      renderTaskList(filterValue);

      const currentlySelected = document.querySelector(
        ".sidebar-menu .selected",
      );
      if (currentlySelected) {
        currentlySelected.classList.remove("selected");
      }
      btn.parentElement.classList.add("selected");
    });
  });
}

/**
 * Toggles visibility of the Add Task modal and its overlay.
 */
function toggleModal() {
  document.getElementById("add-task-modal").classList.toggle("hidden");
  document.getElementById("add-task-overlay").classList.toggle("hidden");
}

/**
 * Wires up the buttons that open and close the Add Task modal.
 */
function setupModalEvents() {
  document.getElementById("add-task-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleModal();
  });

  document
    .getElementById("close-modal-btn")
    .addEventListener("click", () => toggleModal());

  document
    .getElementById("cancel-add-task-btn")
    .addEventListener("click", () => toggleModal());
}

/**
 * Wires up the Add Task form so submitting it creates a new in-progress
 * task, resets the form, re-renders the page, and closes the modal.
 */
function setupFormSubmission() {
  const addTaskForm = document.getElementById("add-task-form");

  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const newTask = {
      id: 1 + Math.max(...taskList.map((x) => x.id)),
      status: 0,
      ...values,
    };

    taskList.unshift(newTask);

    addTaskForm.reset();
    renderTaskList();
    renderSummary();
    toggleModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  renderTaskList();
  setupSidebarButtons();
  setupModalEvents();
  setupFormSubmission();
});