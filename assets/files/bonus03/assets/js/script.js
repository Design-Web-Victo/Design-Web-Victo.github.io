// Déclaration des variables globales
const montantMinimum = 1.35; // Sert à valider que le montant donnée est supérieur au minimum
const inputAutreMontant = document.querySelector('#montant-manuel');
const divMontantAutre = document.querySelector('.montant-autre');
const boutonsFiltre = document.querySelectorAll('.btn-filtre');
const boutonsMontant = document.querySelectorAll('.mnt');
const inputMontantReel = document.querySelector('#montant-reel');

// Pour chaque bouton filtre, associe l'événement click à la fonction BoutonFiltreClique
boutonsFiltre.forEach( bouton => bouton.addEventListener('click', BoutonFiltreClique));
/**
 * Modification de l'affichage lors d'un clique sur un bouton filtre
 * @param {object} e L'objet événement généré automatiquement par le addEventListener
 */
function BoutonFiltreClique(e) {
    // On récupère la valeur de l'attribut data-montant du bouton filtre
    let montant = e.target.getAttribute('data-montant');
    // On se sert de cette valeur pour aller chercher le bouton montant qui à la même valeur
    const boutonMontant = document.querySelector(`.mnt[data-montant='${montant}']`);

    SelectBouton(e.target, boutonMontant);
    ChangerLot(e.target);
    ModifierMontantReel(montant);
}

// Pour chaque bouton montant, associe l'événement click à la fonction BoutonMontantClique
boutonsMontant.forEach( bouton => bouton.addEventListener('click', BoutonMontantClique));
/**
 * Modification de l'affichage lors d'un clique sur un bouton montant
 * @param {*} e L'objet événement généré automatiquement par le addEventListener
 */
function BoutonMontantClique(e) {
    // On récupère la valeur de l'attribut data-montant du bouton filtre
    let montant = e.target.getAttribute('data-montant');
    // On se sert de cette valeur pour aller chercher le bouton montant qui à la même valeur
    let boutonFiltre = document.querySelector(`.btn-filtre[data-montant='${montant}']`);

    SelectBouton(boutonFiltre, e.target);
    ChangerLot(boutonFiltre);
    ModifierMontantReel(montant);
}

/**
 * On affiche la sélection des bons boutons
 * @param {HTMLElement} boutonFiltre Le bouton filtre à être sélectionné
 * @param {HTMLElement} boutonMontant Le bouton montant à être sélectionné
 */
function SelectBouton(boutonFiltre, boutonMontant) {
    // Enlève la classe btn-filtre-selected à tous les boutons filtres. Cette classe effectuait le style de la sélection
    boutonsFiltre.forEach( bouton => bouton.classList.remove('btn-filtre-selected'));
    // Ajoute la classe btn-filtre-selected au bon bouton filtre
    boutonFiltre.classList.add('btn-filtre-selected');

    // Enlève la classe mnt-select à tous les boutons filtres. Cette classe effectuait le style de la sélection
    boutonsMontant.forEach( bouton => bouton.classList.remove('mnt-select'));
    // Ajoute la classe mnt-select au bon bouton filtre
    boutonMontant.classList.add('mnt-select');

    // Enlève la sélection au input montant autre
    divMontantAutre.classList.remove('montant-autre-selected');
    // Vide la valeur du input montant autre
    inputAutreMontant.value = "";
}

/**
 * Affiche la liste de livres correspondant au lot sélectionné
 * @param {HTMLElement} boutonFiltre Le bouton filtre sélectionné qui indiquera le lot à choisir
 */
function ChangerLot(boutonFiltre) {
    // Détermine le code du lot selon le bouton filtre sélectionné
    selectLot = boutonFiltre.getAttribute('data-lot');
    // Sélectionne la liste de tous les blocs livres
    const images = document.querySelectorAll(".livre");
    images.forEach( image => {
        // Récupère le code du lot du livre
        let blocLot = image.getAttribute('data-lot');
        // Si le lot du livre est inférieur au lot sélectionné, affiche le bloc du livre
        if(blocLot <= selectLot){
            image.classList.remove('hidden');
        } else {
            image.classList.add('hidden');
        }
    })

    // Changer le texte du titre en insérant les bonnes valeurs dans les éléments correspondants
    document.querySelector('#montant-lot').innerHTML = boutonFiltre.getAttribute('data-montant').replace(".",",");
    document.querySelector('#nb-lot').innerHTML = boutonFiltre.getAttribute('data-nb');
}

// Quand on sélectionne le input autre montant, on applique un style de sélection
inputAutreMontant.addEventListener('focus', () => {
    divMontantAutre.classList.add('montant-autre-selected');
});

// L'événement est déclenché quand on "sort" du input autre montant
inputAutreMontant.addEventListener('blur', () => {
    let montant = inputAutreMontant.value;
    // On valide que le montant saisie est supérieur au montant minimum
    if (montant >= montantMinimum) {
        // Enleve la sélection des boutons montants et filtres
        boutonsFiltre.forEach( bouton => bouton.classList.remove('btn-filtre-selected'));
        boutonsMontant.forEach( bouton => bouton.classList.remove('mnt-select'));
        // On calcul le lot selon le montant saisie
        let codeLot = calculLot(montant);
        // Sélectionne le bouton filtre associé au lot calculé
        let boutonFiltre = document.querySelector(`.btn-filtre[data-lot='${codeLot}']`);
        boutonFiltre.classList.add('btn-filtre-selected');

        ChangerLot(boutonFiltre); // Modification de l'affichage des livres
        ModifierMontantReel(montant); // Modification de la valeur du input masqué montant-reel

    } else {
        inputAutreMontant.value = "";
        divMontantAutre.classList.remove('montant-autre-selected');
    }
});

/**
 * Calcul le lot selon le montant donné
 * @param {float} montant 
 * @returns int Le code du lot
 */
function calculLot(montant) {
    let codeLot = 0;

    if(montant >= 24.37) {
        codeLot = 3;
    } else if (montant >= 13.54) {
        codeLot = 2;
    } else if (montant >= 1.35) {
        codeLot = 1;
    }

    return codeLot;
}

/**
 * Modifie la valeur du input masqué montant-reel
 * @param {float} montant Le montant à enregistrer
 */
function ModifierMontantReel(montant) {
    inputMontantReel.value = montant;
}