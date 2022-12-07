const REGEX_CODE_PRODUIT = /(([\d\w]){5}-){2,4}([\d\w]){5}/;
const listeProduits = {
    "Q1JBC-3ZPX8-TVHUH" : "Final Fantasy 1",
    "P3CJN-JNGJM-XYYT4" : "Contra",
    "2RCWA-XPRPX-GJHPR" : "The Legend of Zelda",
    "H4LS8-L1L3T-08D9X" : "Rygar",
    "KBZB7-PQYDY-D5TMZ-MUABS-JNGJM" : "Metroid",
    "VPTU1-9UZXA-X4ED4-F596J-XPRPX" : "Ninja Gaiden",
    "SUY17-21D57-5QYJU-UE6PN-HZ452" : "Kirby's Adventure",
    "AAAAA-AAAAA-AAAAA-AAAAA-AAAAA" : "Le jeu secret"
};
const erreurValidation = {
    "terme" : "Vous devez accepter les termes de l’Accord de souscription Vapeur pour finaliser la transaction.",
    "formatInvalide" : "Le code produit que vous avez saisie est invalide, il ne respecte pas le format requis.",
    "produitInexistant" : "Aucun produit n'est associé au code de produit saisie."
};

const zoneMessageErreur = document.querySelector('#message-erreur');
const boutonActiver = document.querySelector('.bouton-activation');
const inputCodeProduit = document.querySelector('#cle-activation');
const formulaireActivation = document.querySelector('#form-activation');
const checkboxDeclaration = document.querySelector('#declaration');
const labelTerme = document.querySelector('.label-declaration');

const inputNomProduit = document.querySelector('#nom-produit');


// Peut être ne pas leur donner ces fonctions déjà faite
function isProduitExiste(codeProduit) {
    return listeProduits[codeProduit.toString().toUpperCase()] ? true : false;
}

function nomProduit(codeProduit) {
    let nom = listeProduits[codeProduit.toString().toUpperCase()];
    return nom ? nom : "Produit inconnue";
}

function isFormatValide(codeProduit) {
    return REGEX_CODE_PRODUIT.test(codeProduit);
}

boutonActiver.addEventListener('click', (e) => e.target.classList.add('bouton-click'));
boutonActiver.addEventListener('transitionend', (e) =>  e.target.classList.remove('bouton-click'));
// ====================================================


formulaireActivation.addEventListener('submit', validationFormulaire);

function validationFormulaire(e) {

    e.preventDefault();

    // Réinitialisation du message d'erreur
    zoneMessageErreur.innerHTML = "";
    zoneMessageErreur.classList.add('hidden');

    let codeProduit = inputCodeProduit.value;
    let formatValide = isFormatValide(codeProduit);
    let produitExiste = isProduitExiste(codeProduit);
    let isDeclaration = checkboxDeclaration.checked;

    if(!formatValide) {
        zoneMessageErreur.innerHTML = erreurValidation['formatInvalide'];
        zoneMessageErreur.classList.remove('hidden');
    } else if(!produitExiste) {
        zoneMessageErreur.innerHTML = erreurValidation['produitInexistant'];
        zoneMessageErreur.classList.remove('hidden');
    } else if(!isDeclaration) {
        zoneMessageErreur.innerHTML = erreurValidation['terme'];
        zoneMessageErreur.classList.remove('hidden');
        labelTerme.classList.add('texte-invalide');
    }
    
    if(formatValide && produitExiste && isDeclaration) {
        formulaireActivation.submit();
    }
}  


