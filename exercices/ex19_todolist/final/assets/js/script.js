// Liaison des éléments HTML
const inputSaisie = document.getElementById('saisie-tache');
const boutonAjout = document.querySelector('.icone-ajout');
const boutonPoubelle = document.querySelector('.icone-trash');
const listeAfaire = document.querySelector('.liste-afaire');
const listeFait = document.querySelector('.liste-fait');

// Déclaration des listeners
inputSaisie.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        ajouterTache();
    };
})
boutonAjout.addEventListener('click', ajouterTache);
boutonPoubelle.addEventListener('click', viderTacheFait)



function ajouterTache() {
    const texteTache = inputSaisie.value;

    if (texteTache) {
        // Crée une nouvelle tâche
        let nouvelleTache = document.createElement('li');
        nouvelleTache.innerHTML = texteTache;
        nouvelleTache.classList.add('tache');

        nouvelleTache.addEventListener('click', termineTache)

        // Ajoute la nouvelle tâche dans la liste à faire
        listeAfaire.append(nouvelleTache);

        // Vide la zone de saisie
        inputSaisie.value = "";
    }
}

function termineTache(e) {
    let tacheTermine = e.target;

    tacheTermine.classList.add('fait');
    tacheTermine.removeEventListener('click', viderTacheFait);
    listeFait.append(tacheTermine);
}

function viderTacheFait() {
    const tachesFait = listeFait.querySelectorAll('li');

    tachesFait.forEach( tache =>  { 
        tache.remove();
    });
}