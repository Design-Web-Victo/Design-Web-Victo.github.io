// Ce script gère l'affichage des questions, vous ne devez pas rien
// y modifier. Utilisez le fichier monScript.js pour vos propre ajout.

const questions = [
    {
        "numero" : "1",
        "categorie":"Mythologie",
        "description":"Mi-homme mi-chèvre, je suis le dieu/déesse grec la nature, protecteur des bergers et des troupeaux.",
        "choix1" : "Demeter",
        "choix2" : "Pan",
        "choix3" : "Hermès",
        "choix4" : "Persephone",
        "bonneReponse" : "2",
    },
    {
        "numero" : "2",
        "categorie":"Jeux vidéo",
        "description":"Dans Final Fantasy 1, lequel de ces personnages n'est pas un des 4 démons du chaos?",
        "choix1" : "Kraken",
        "choix2" : "Malyris",
        "choix3" : "Tiamat",
        "choix4" : "Bahamut",
        "bonneReponse" : "4",
    },
]

/**
 * Génère un nombre entier aléatoirement
 * @param {int} min La valeur minimum du nombre généré
 * @param {int} max La valeur maximum du nombre généré
 * @returns Un nombre entier
 */
 function ObtenirNombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function AfficherQuestionAleatoire() {
    let indexQuestion = ObtenirNombreAleatoire(0,questions.length -1);
    let question = questions[indexQuestion];

    const numeroQuestion = document.getElementById('numero_question');
    const titreCategorie = document.getElementById('titre_categorie');
    const descriptionQuestion = document.getElementById('description_question');
    const choixReponse = document.getElementById('choix_reponse');
    const choix1 = document.getElementById('choix1');
    const choix2 = document.getElementById('choix2');
    const choix3 = document.getElementById('choix3');
    const choix4 = document.getElementById('choix4');

    numeroQuestion.innerText = '#' + question.numero;
    titreCategorie.innerText = question.categorie;
    descriptionQuestion.innerText = question.description;
    choixReponse.setAttribute('data-bonne-reponse', question.bonneReponse);
    choix1.innerText = question.choix1;
    choix2.innerText = question.choix2;
    choix3.innerText = question.choix3;
    choix4.innerText = question.choix4;

    document.querySelectorAll('.bouton_choix').forEach(bouton => {
        if (bouton.id == ('choix' + question.bonneReponse)) {
            bouton.classList.add('bonne_reponse');
        } else {
            bouton.classList.remove('bonne_reponse');
        }
    })
}

AfficherQuestionAleatoire();