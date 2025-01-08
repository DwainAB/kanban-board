console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  const closeBtn = document.getElementsByClassName("close-btn")[0];
  let dataId = 5; // Initialisation de l'ID de départ


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

  //feature pour l'ajoute

  cardForm.onsubmit = function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const priority = document.getElementById("priority").value;
    const columnToDo = document.querySelector('.column[data-status="todo"]');

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', dataId);
    card.setAttribute('data-priority', priority);


    card.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <button class="delete-card">Supprimer</button>
    `;

    columnToDo.appendChild(card);

    // Evénement pour supprimer la carte
    card.querySelector('.delete-card').addEventListener('click', function () {
      deleteCard(card);
    });


    dataId = dataId + 1;

    cardModal.style.display = "none";
    cardForm.reset();

    saveCards();
    loadCards()
  }



  //feature pour supprimer
  function deleteCard(cardElement) {
    const cardId = cardElement.getAttribute('data-id');

    cardElement.remove();

    // Mise à jour du localStorage
    let cardsData = JSON.parse(localStorage.getItem('kanbanCards')) || [];
    cardsData = cardsData.filter(card => card.DataId !== cardId);
    localStorage.setItem('kanbanCards', JSON.stringify(cardsData));

    console.log("Card supprimée :", cardId);

  }



  //feature pour le filtre

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

  //feature pour la priorité

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


  //Feature pour le localStorage

function saveCards() {
  const columns = document.querySelectorAll(".column");
  console.log(columns[0]);

  let cardsData = [];

  columns.forEach(column => {
    const cards = column.querySelectorAll('.card');
    cards.forEach(card => {
      if (card.hasAttribute('data-id')) {
        cardsData.push({
          title: card.querySelector('h3').textContent,
          content: card.querySelector('p').textContent,
          priority: card.getAttribute('data-priority'),
          DataId: card.getAttribute('data-id'),
          status: column.getAttribute('data-status')

        });
      }
    });
  });
  console.log("Saving cards:", cardsData);
  localStorage.setItem('kanbanCards', JSON.stringify(cardsData));
}

// Affiche les cartes

function loadCards() {
  const cardsData = JSON.parse(localStorage.getItem('kanbanCards')) || [];

  const dynamicCards = Array.from(document.querySelectorAll('.card[data-id]')).filter(card => {
    return parseInt(card.getAttribute('data-id')) > 4;
  });
  
  dynamicCards.forEach(card => card.remove());

  cardsData.forEach(data => {
    if (parseInt(data.DataId) > 4) {
      const column = document.querySelector(`.column[data-status="${data.status}"]`);
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-priority', data.priority);
      card.setAttribute('data-id', data.DataId);

      card.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <button class="delete-card">Supprimer</button>
      `;

      card.querySelector('.delete-card').addEventListener('click', function () {
        deleteCard(card);
      });

      column.appendChild(card);
    }
  });


  // Configuration du drag & drop
  document.querySelectorAll(".card").forEach((card) => {
    card.setAttribute("draggable", true);
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.dataset.id);
      e.target.classList.add("dragging");
    });
    card.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
  });

  document.querySelectorAll(".column").forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      column.classList.add("over");
    });
    column.addEventListener("dragleave", () => {
      column.classList.remove("over");
    });
    column.addEventListener("drop", (e) => {
      e.preventDefault();
      column.classList.remove("over");
      const cardId = e.dataTransfer.getData("text/plain");
      const card = document.querySelector(`.card[data-id='${cardId}']`);
      if (card) {
        column.append(card);
        saveCards(); 
      }
    });
  });
}

loadCards();





});

