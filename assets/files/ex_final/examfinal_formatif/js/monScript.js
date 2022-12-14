// Utilisez ce script pour vos propre script

const listeBoutonsChoix = document.querySelectorAll('.bouton_choix');

const boutonTriche = document.getElementById('triche');
boutonTriche.addEventListener('click', CliquerTriche);
function CliquerTriche() {
    // Recherche pour chaque bouton choix de réponse celui qui 
    // a la classe bonne_reponse et change la couleur de fond pour orange
    listeBoutonsChoix.forEach( bouton => {
        if (bouton.classList.contains('bonne_reponse')) {
            bouton.style.backgroundColor = 'orange';
        }
    })
}

// Pour chaque bouton réponse, lance la fonction ValiderReponse sur un clique
listeBoutonsChoix.forEach(bouton => bouton.addEventListener('click', ValiderReponse));

function ValiderReponse(e) {
    // Récupère la bonne réponse selon la classe bonne-reponse d'un des boutons
    const bonneReponseId = document.querySelector('.bonne_reponse').id;
    // Teste si le id du bouton bonne réponse correspond au id du bouton qui a été cliqué
    const estBonneReponse = e.target.id === bonneReponseId;
    // Récupère le texte de la bonne réponse pour pouvoir l'afficher plus tard
    const texteBonneReponse = document.getElementById(bonneReponseId);

    // Masque la section choix de réponse
    document.getElementById('choix_reponse').classList.add('hidden');
    // Affiche la section réponse
    document.getElementById('validation_reponse').classList.remove('hidden');
    // Masque le bouton triche
    document.getElementById('triche').classList.add('hidden');

    // Affiche si c'est une bonne réponse ou non selon la variable estBonneRéponse
    document.getElementById('titre_validation_reponse').innerText = estBonneReponse ? 'Bonne Réponse' : "Mauvaise Réponse";
    // Affiche la bonne réponse si nécessaire
    document.getElementById('texte_validation_reponse').innerText = estBonneReponse ? '' : 'La bonne réponse était ' + texteBonneReponse.innerText;

}