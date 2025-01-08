console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  const closeBtn = document.getElementsByClassName("close-btn")[0];

  // Éventuellement, on écoute les événements
  addCardBtn.onclick = function () {
    cardModal.style.display = "block";
  };

  closeBtn.onclick = function () {
    cardModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === cardModal) {
      cardModal.style.display = "none";
    }
  };

  cardForm.onsubmit = function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const priority = document.getElementById("priority").value;
    const columnToDo = document.querySelector('.column[data-status="todo"]');

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-priority", priority);

    card.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    columnToDo.appendChild(card);

    cardModal.style.display = "none";

    cardForm.reset();
  };

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const taskContent = card.querySelector("h3").textContent.toLowerCase();
      if (taskContent.includes(keyword)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });

  sortByPriorityBtn.addEventListener("click", () => {
    const columns = document.querySelectorAll(".column");
    columns.forEach((column) => {
      const cards = Array.from(column.querySelectorAll(".card"));
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      cards.sort((a, b) => {
        const priorityA = a.getAttribute("data-priority");
        const priorityB = b.getAttribute("data-priority");
        return priorityOrder[priorityA] - priorityOrder[priorityB];
      });
      cards.forEach((card) => {
        column.appendChild(card);
      });
    });
  });
});
