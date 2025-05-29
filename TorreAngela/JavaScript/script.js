
// FUNZIONE PER LA BARRA DI RICERCA

// logica della ricarca
function searchInPage() {

    // rimuove tutte le eventuali evidenziazioni precedenti
    removeHighlights();

    // recupera il valore inserito nell'input di ricerca
    const input = document.getElementById('searchInput');
    const searchTerm = input.value.trim(); // rimuove spazi iniziali e finali

    // se il campo è vuoto non fa nulla
    if (!searchTerm) return;

    // crea un'espressione regolare per cercare la parola
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    // scorre il contenuto della pagina e applica evidenziazione
    walkAndHighlight(document.body, regex);

    // trova la prima parola evidenziata e scrolla fino a quella posizione
    const firstMatch = document.querySelector('.highlighted-search-term');

    if(firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }); // per avere uno scorrimento fluido
    }

}

// Funzione ricorsiva per cercare ed evidenziare le parole
function walkAndHighlight(node, regex) {

    if(node.nodeType === 3) { // nodo di testo
        const match = node.nodeValue.match(regex); // cerca corrispondenze

        if(match) {
            const span = document.createElement('span'); // crea un nuovo span
            // sostituisce il testo con la versione evidenziata usando il tag <mark>
            span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlighted-search-term">$1</mark>');
            // sostituisce il nodo originale con la versione evidenziata
            node.parentNode.replaceChild(span, node);
        } 
    } else if (
        node.nodeType === 1 && // nodo elemento
        node.childNodes && // deve avere figli
        !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.tagName) // esclude questi tag per evitare problemi
    ) {
        // scorre tutti i figli 
        for (let i = 0; i < node.childNodes.length; ++i) {
            walkAndHighlight(node.childNodes[i], regex);
        }
    }

}

// Funzione per rimuovere tutte le evidenziature precedenti
function removeHighlights() {
    
    // seleziona tutti gli elementi <mark> con classe evidenziata
    document.querySelectorAll('mark.highlighted-search-term').forEach(el => {

        const parent = el.parentNode;
        // sostituisce l'elemento evidenziato con testo semplice
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize(); // per unire i nodi di testo adiacenti

    });

}

// Per attivare la barra premendo anche il tasto enter
document.getElementById('searchInput').addEventListener('keypress', function (e) {

    if(e.key === 'Enter') {
        // Avvia la ricerca se l'utente preme invio
        searchInPage();
    }
    
}); 

// funzione per le parole inesistenti
function searchInPage() {

    // rimuove tutte le evidenziazioni precedenti dalla pagina
    removeHighlights();

    // recupera il valore inserito nell'input di ricerca
    const input = document.getElementById('searchInput');
    const searchTerm = input.value.trim(); // rimuove spazi iniziali e finali
    // prende l'elemento dove mostra il messaggio di stato
    const message = document.getElementById('searchMessage');

    // pulisce il contenuto del messaggio precedente
    message.textContent = ' ';

    // se il campo di ricerca è vuoto, mostra un messaggio e termina la funzione
    if(!searchTerm) {
        message.textContent = "Inserisci una parola da cercare"
        return;
    }

    // crea un'espressione regolare per cercare la parola nella pagina
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    // avvia la ricerca e l'evidenziazione delle corrispondenze nel corpo della pagina
    walkAndHighlight(document.body, regex);

    // seleziona tutti gli elementi evidenziati con la classe
    const matches = document.querySelectorAll('.highlighted-search-term');

    // se almeno una corrispondeza è stata trovata
    if(matches.length > 0) {
        // scorri la pagina in modo fluido
        matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // se non sono state trovate corrispondenze, mostra un messaggio
        message.textContent = `Nessun risultato per "${searchTerm}".`;
    }

}



// TIMELINE // 
// Controllo della timeline
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.timeline-item');

    function animateItems() {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if(rect.top < window.innerHeight * 0.85) {
                item.classList.add('timeline-animate');
            }
        });
    }

    window.addEventListener('scroll', animateItems);
    // chiamata del metodo. Si attiva al caricamento
    animateItems();

});



// ANIMAZIONI NELLA SEZIONE STORIA //
// Implementazione dell'animazione della parola storia

document.addEventListener("DOMContentLoaded", function() {
    const storiaTitle = document.querySelector('.storia-slide-in');

    function checkStoriaVisible() {
        const rect = storiaTitle.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.85 && rect.bottom >= 0) {
            storiaTitle.classList.add('visible');
            // una volta che è visibile stoppa il controllo
            window.removeEventListener('scroll', checkStoriaVisible);
        }
    }

    window.addEventListener('scroll', checkStoriaVisible);
    // chiamata della funzione, dove anche al caricamento, nel caso sia già visibile
    checkStoriaVisible();
});

// Implementazioni dell'animazione della bar nella sezione storia

document.addEventListener("DOMContentLoaded", function() {
    const barTitle = document.querySelector('.storia-bar');

    function checkStoriaVisible() {
        const rect = barTitle.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.85 && rect.bottom >= 0) {
            barTitle.classList.add('visible');
            window.removeEventListener('scroll', checkStoriaVisible);
        }
    }

    window.addEventListener('scroll', checkStoriaVisible);
    checkStoriaVisible();
})



// ANIMAZIONE DEL MODELLO 3D E DEL PARAGRAFO   
// quando tutto il contenuto della pagina è stato caricato 
document.addEventListener("DOMContentLoaded", function() {

    // crea un osservatore che controlla quando un elemento entra nel viewport 
    const osservatore = new IntersectionObserver((entries) => {

        // per ogni elemento osservato...
        entries.forEach(entry => {

            // se l'elemento è visibile per la percentuale definita
            if(entry.isIntersecting) {

                // aggiunge la classe visibile all'elemento visibile
                entry.target.classList.add('visible');

                // interrompe l'osservazione
                osservatore.unobserve(entry.target);
            }
        });

    }, {
        // l'elemento viene considerato visibile quando almeno il 20% è visibile nella viewport
        threshold: 0.2
    });

    // elementi da osservare 
    const elementiOsservati = [
        document.querySelector('.title-turrisAegidiAngeli-storia'),
        document.querySelector('.p-3d-turrisAegidiAngeli')
    ];

    elementiOsservati.forEach(elementi => {
        if(elementi) {
            osservatore.observe(elementi);
        }
    });

});



// ANIMAZIONE DELLE CARD (cosa vedere)
const osservatore = new IntersectionObserver((entries) => {
    
    entries.forEach(entry => {

        if(entry.isIntersecting) {
            entry.target.classList.add('card-visible');
            entry.target.classList.remove('card-hidden');
            osservatore.unobserve(entry.target);
        }
    }, {
        threshold: 0.2 // attiva quando il 20% dell'elemento è visibile
    });
});
document.querySelectorAll('.primaCard-cosavedere, .secondaCard-cosavedere, .terzaCard-cosavedere')
        .forEach(card => osservatore.observe(card));



// ANIMAZIONE DELLA MAPPA E TITOLO 
// attende che l'intera pagina html si sia caricata
document.addEventListener("DOMContentLoaded", function() {

    // seleziona il contenitore della mappa
    const mappaWrapper = document.querySelector('.mappa-wrapper');

    // crea un nuovo osservatore per monitorare la visibilità delll'elemento
    const osservatore = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            // se l'elemento è visibile almeno al 20%
            if(entry.isIntersecting) {
                // aggiunge la classe visibile
                mappaWrapper.classList.add('visible');

                // interrompe l'osservazione dopo la prima attivazione
                osservatore.unobserve(mappaWrapper);

            }
        });

    }, {
        // l'animazione parte quando almeno il 20% dell'elemento è visibile
        threshold: 0.2
    });

    // attiva l'osservazione sull'elemento richiesto
    osservatore.observe(mappaWrapper);

});



// PULSANTE BACK-TO-TOP 
// Implementazione del pulsante back-to-top

// seleziona il pulsante tramite il suo id
const backToTopButton = document.getElementById("back-to-top");

// evento che si attiva allo scroll della pagina
window.addEventListener("scroll", () => {
    // controlla se la pagina è stata scrollata più di 400px
    if(window.scrollY > 400) {
        // aggiunge la classe show per rendere visibile il pulsante
        backToTopButton.classList.add("show");
    } else {
        // nasconde il pulsante nascondendo la classe show
        backToTopButton.classList.remove("show");
    }
});
// evento che si attiva al click del pulsante
backToTopButton.addEventListener("click", function (e) {
    // comportamente predefinito del click
    e.preventDefault();
    // animazione 
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// FOOTER //
// Piccola animazione per quando appare il footer
// rileva quando l'utente è vicino alla fine della pagina
window.addEventListener('scroll', function() {
    // calcola la posizione attuale dello scroll rispetto alla fine della pagina
    let scrollPosizione = this.window.scrollY + this.window.innerHeight;
    // altezza totale
    let altezzaPagina = this.document.documentElement.scrollHeight;
    // distanza in pixel prima che il footer appaia
    let distanzaFooter = 0;


    // se l'utente ha raggiunto la fine mostra il footer
    if(scrollPosizione >= altezzaPagina - distanzaFooter) {
        this.document.querySelector('footer').classList.add('show-footer');
    } else {
        this.document.querySelector('footer').classList.remove('show-footer');
    }
});



// RESPONSIVE //





