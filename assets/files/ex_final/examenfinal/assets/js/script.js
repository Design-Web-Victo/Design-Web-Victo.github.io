// Déclaration des variables
let valeurDeSelect = 20; // Le d20 est sélectionné par défaut

const listeDes = document.querySelectorAll('.de');
const choixNbJet = document.querySelector('#choix-nombre-jet');
const texteTypeDe = document.querySelector('.texte-type-de');
const texteNbJet = document.querySelector('.texte-nombre-jet');
const boutonJet = document.querySelector('.bouton-jet');
const zoneResulat = document.querySelector('.resultats');

/**
 * Génère un nombre aléatoire entre deux bornes
 * @param {int} minimum La borne inférieur du nombre à générer
 * @param {int} maximum La borne supérieur du nombre à générer
 * @returns int Un nombre entier aléatoire entre la borne inférieur et supérieur
 */
 function nombreAleatoire(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; 
}

/**
 * Création d'un élément div avec comme texte le resultat passé en paramètre
 * @param {int} resultat Le résultat à afficher
 * @returns Un élément div que vous pourrez ajouter à la zone résultat
 */
 function creerElementResultat(resultat) {
    let elementResultat = document.createElement('div');
    // La classe de-resultat existe déjà dans le fichier style.css et met en forme le texte du résultat
    elementResultat.classList.add('de-resultat');
    elementResultat.innerHTML = resultat;

    return elementResultat;
}

// Pour chaque dé, branche la fonction selectionDe sur l'événement click
listeDes.forEach( (de) => {
    de.addEventListener('click', selectionDe);
})

// Modifie le texte du nombre de jet quand on change la valeur du input
choixNbJet.addEventListener('input', (e) => { 
    texteNbJet.innerHTML = e.target.value + "x";
});

// Quand on clique sur le bouton lancer, génére le nombre de jet selon la configuration
boutonJet.addEventListener('click', () => {
    zoneResulat.innerHTML = "";

    let nombreJet = choixNbJet.value;

    for (let i = 1; i <= nombreJet; i++) {
        let resultat = nombreAleatoire(1, valeurDeSelect);        
        zoneResulat.append(creerElementResultat(resultat));
    }
})


function selectionDe(e) {
    // Récupère la valeur du dé
    valeurDeSelect = parseInt(e.target.getAttribute('data-de'));
    // Change le texte dans la zone des options pour le type de dé sélectionné
    texteTypeDe.innerHTML = "d" + valeurDeSelect;
    // Enlève la classe sélection à tous les dés
    listeDes.forEach( (de) => de.classList.remove('selected'));
    // Applique la classe au dé cliqué qui va afficher qu'il est sélectionné
    e.target.classList.add('selected');
}