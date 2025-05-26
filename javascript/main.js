// Carica il contenuto del modal
document.addEventListener("DOMContentLoaded", function() {
    fetch('confronto-modal.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('compareModal-container').innerHTML = data;
        // Inizializza il modal
        initCompareModal();
      });
  });