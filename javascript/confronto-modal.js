// Funzione per inizializzare il modal
function initCompareModal() {
    // Ottieni riferimenti agli elementi del DOM
    const modal = document.getElementById("compareModal");
    const compareBtns = document.querySelectorAll(".btn-accent");
    const span = document.getElementsByClassName("close")[0];
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    
    // Aggiungi listener a tutti i pulsanti "Confronta"
    compareBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault(); // Previeni il comportamento predefinito del link
            modal.style.display = "block";
        });
    });
    
    // Quando l'utente clicca sul pulsante di chiusura, chiudi il modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // Quando l'utente clicca al di fuori del modal, chiudilo
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // Gestione delle schede (tabs)
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Rimuovi la classe active da tutti i pulsanti e contenuti
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            
            // Aggiungi la classe active al pulsante cliccato
            button.classList.add("active");
            
            // Mostra il contenuto corrispondente
            const tabId = button.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
        });
    });
}

// Esegui l'inizializzazione quando il documento è completamente caricato
document.addEventListener("DOMContentLoaded", initCompareModal);