console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");

  // Éventuellement, on écoute les événements
  addCardBtn.addEventListener("click", () => {
    // ...
  });

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

  //test 
  //test

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



//Feature pour le localStorage

function saveCards() {
  const columns = document.querySelectorAll('.column');
  console.log(columns[0]);
  
  let cardsData = [];  
  
  columns.forEach(column => {
    const cards = column.querySelectorAll('.card');
    cards.forEach(card => {
      if (!card.hasAttribute('data-id')) {
        cardsData.push({
          title: card.querySelector('h3').textContent,
          content: card.querySelector('p').textContent,
          priority: card.getAttribute('data-priority'),
          status: column.getAttribute('data-status')
        });
      }
    });
  });
  
  localStorage.setItem('kanbanCards', JSON.stringify(cardsData));
}

function loadCards() {
  const cardsData = JSON.parse(localStorage.getItem('kanbanCards')) || [];
  
  const dynamicCards = document.querySelectorAll('.card:not([data-id])');
  dynamicCards.forEach(card => card.remove());
  
  cardsData.forEach(data => {
    const column = document.querySelector(`.column[data-status="${data.status}"]`);
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-priority', data.priority);
    
    card.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.content}</p>
    `;
    
    column.appendChild(card);
  });
}

loadCards();
