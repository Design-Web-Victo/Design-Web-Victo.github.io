// Déclaration des variables et constantes
const formInscription = document.querySelector('#formulaire-inscription');
const choixRace = document.querySelector('#participant_race');
const dateActuelle = new Date();
const photosRace = {
    "alpine" : "images/race_alpine.jpg",
    "lamancha" : "images/race_lamancha.jpg",
    "nubienne" : "images/race_nubienne.jpg",
    "saanen" : "images/race_saanen.jpg",
    "toggenbourg" : "images/race_toggenbourg.jpg",
}

// Inscription des événements
formInscription.addEventListener('submit', validationFormulaire);
choixRace.addEventListener('change', (e) => {
    const photoRace = document.querySelector('#photo-race');
    photoRace.src = photosRace[e.target.value];
});


/**
 * Valide si un texte est vide.
 * @param {string} valeur Le texte à valider
 * @returns true si le texte est vide
 */
function estVide(valeur) {
    return valeur === '';
}

/**
 * Valide si une adresse courriel est valide.
 * @param {string} valeur L'adresse courriel à valider
 * @returns true si le courriel est valide
 */
function estCourriel(valeur) {
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex_email.test(valeur);
}

/**
 * Valide si la longueur d'un texte est inférieur à une longueur maximum.
 * @param {string} valeur Le texte à valider
 * @param {integer} longeurMaximum Le nombre de caractère à ne pas dépasser
 * @returns true si le nombre de caractère ne dépasse pas le maximum 
 */
function longueurValide(valeur, longeurMaximum) {
    return valeur.length <= longeurMaximum;
}

/**
 * Efface tous les messages d'erreurs
 */
function reinitialiseMessageErreur() {
    const listeMessages = document.querySelectorAll('.message-erreur');

    listeMessages.forEach( (message) => {
        message.classList.add('hidden');
        message.innerHTML = "";
    })
}

/**
 * Affiche un message d'erreur dans une balise span qui suit immédiatement un élément
 * @param {Element} input Le input de départ
 * @param {string} texteMessage Le message à afficher dans la balise span
 */
function afficherMessageErreur(input, texteMessage) {
    const messageErreur = input.closest('div').querySelector('.message-erreur');
    messageErreur.classList.remove("hidden");
    messageErreur.innerHTML = texteMessage;
}

/**
 * Valide différentes données du formulaire et empêche son envoi en cas d'échec
 * @param {object} e L'objet event associé à l'événement qui a lancé la fonction
 */
function validationFormulaire(e){
    // Annule l'envoi du formulaire
    e.preventDefault();
    
    // Efface tout les messages d'erreurs
    reinitialiseMessageErreur();

    let formulaireValide = true;

    // Liaison des inputs qui feront l'objet d'une validation
    const proprioNom = document.querySelector('#proprietaire_nom');
    const proprioPrenom = document.querySelector('#proprietaire_prenom');
    const proprioCourriel = document.querySelector('#proprietaire_courriel');
    const proprioAdresse = document.querySelector('#proprietaire_adresse');
    const proprioVille = document.querySelector('#proprietaire_ville');
    const participantNom = document.querySelector('#participant_nom');

    // Validation des données
    if(estVide(proprioNom.value)) {
        formulaireValide = false;
        const messageErreur = document.querySelector('#proprietaire_nom + .message-erreur');
        messageErreur.classList.remove("hidden");
        messageErreur.innerHTML = "Le champs ne doit pas être vide";
    }

    if(estVide(proprioPrenom.value)) {
        formulaireValide = false;
        const messageErreur = document.querySelector('#proprietaire_prenom + .message-erreur');
        messageErreur.classList.remove("hidden");
        messageErreur.innerHTML = "Le champs ne doit pas être vide";
    }

    if(!estCourriel(proprioCourriel.value)) {
        formulaireValide = false;
        /* Au lieu de toujours répéter le même code pour afficher le message d'erreur à
         * chaque validation, j'ai englobé ça dans une fonction que je pourrais utiliser
         * pour chacune.
         */
        afficherMessageErreur(proprioCourriel, "Veuillez entrer un courriel valide")
    }

    if(!longueurValide(proprioAdresse.value, 50)) {
        formulaireValide = false;
        const messageErreur = document.querySelector('#proprietaire_adresse + .message-erreur');
        messageErreur.classList.remove("hidden");
        messageErreur.innerHTML = "L'adresse ne doit pas dépasser 50 caractères";
    }

    if(!longueurValide(proprioVille.value, 30)) {
        formulaireValide = false;
        const messageErreur = document.querySelector('#proprietaire_ville + .message-erreur');
        messageErreur.classList.remove("hidden");
        messageErreur.innerHTML = "La ville ne doit pas dépasser 30 caractères";
    }

    if(estVide(participantNom.value)) {
        formulaireValide = false;
        const messageErreur = document.querySelector('#participant_nom + .message-erreur');
        messageErreur.classList.remove("hidden");
        messageErreur.innerHTML = "Le champs ne doit pas être vide";
    }


    if (formulaireValide) {
        formInscription.submit();
    } 

}

// Affiche l'année en cours dans le titre
document.getElementById('date-concours').innerHTML = dateActuelle.getFullYear();