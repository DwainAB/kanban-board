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
    cards.forEach(card => {
      const taskContent = card.querySelector("h3").textContent.toLowerCase(); 
      if (taskContent.includes(keyword)) {
        card.style.display = ""; 
      } else {
        card.style.display = "none"; 
      }
    });
  });

  sortByPriorityBtn.addEventListener("click", () => {
    // ...
  });
});
