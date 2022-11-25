/**
 * Point 2 - Validation du numéro de DA
 */
const inputNoDA = document.getElementById('numero_da');
inputNoDA.addEventListener('input', () => {
    const daIconeErreur = document.getElementById('da_icone_erreur');
    const daIconeSucces = document.getElementById('da_icone_succes');
    let daEstValide = ValidationNumeroDa(inputNoDA.value);

    if (daEstValide) {
        daIconeErreur.classList.add('hidden');
        daIconeSucces.classList.remove('hidden');
    } else {
        daIconeErreur.classList.remove('hidden');
        daIconeSucces.classList.add('hidden');
    }

});

function ValidationNumeroDa(da) {
    let daValide = true;
    let message = "";
    
    // Le DA contient uniquement des chiffres
    let estSeulementChiffre = /^\d+$/.test(da);
    // Le DA est composé de 7 caractère
    let contientSeptCaractere = da.length == 7;
    // Le DA début par 1 ou 2
    let daDebut = da.charAt(0) == "1" || da.charAt(0) == "2";

    // Affichage du message d'erreur
    if(!estSeulementChiffre) { message += "Le numéro de DA n'est pas uniquement composé de chiffres. <br>" };
    if(!contientSeptCaractere) { message += "Le numéro de DA doit contenir exactement 7 caractères <br>" };
    if(!daDebut) { message += "Le numéro de DA doit débuter par 1 ou 2" };

    document.getElementById('message_numero_da').innerHTML = message;

    daValide = estSeulementChiffre && contientSeptCaractere && daDebut;

    return daValide;
}


/**
 * Point 3 - Modification de l'icone selon la note estimée
 */
const sliderNote = document.getElementById('note_estime');
sliderNote.addEventListener('input', () => {
    const titreNote = document.getElementById('titre_note_estime');
    let note = sliderNote.value;

    titreNote.textContent = 'Ma note estimée = ' + note + '%';
    ModifierIconeNote(note);
});

function ModifierIconeNote(note) {
    const iconeNote = document.getElementById('icone_note');
    iconeNote.setAttribute("class", "");

    switch(true) {
        case (note < 20):
            iconeNote.setAttribute("class", "far fa-sad-cry");
            break;
        case (note < 40):
            iconeNote.setAttribute("class", "far fa-sad-tear");
            break;
        case (note < 60):
            iconeNote.setAttribute("class", "far fa-frown");
            break;
        case (note < 80):
            iconeNote.setAttribute("class", "far fa-smile");
            break;
        case (note <= 100):
            iconeNote.setAttribute("class", "far fa-grin-squint-tears");
            break;
    }
}


/**
 * Point 4 - Validation du formulaire avant l'envoi
 */
const formulaireExamen = document.getElementById('formulaire_examen');
formulaireExamen.addEventListener('submit', FormulaireEstValide);
function FormulaireEstValide(e)
{
    e.preventDefault();

    const declaration = document.getElementById('declaration');
    const inputNumeroDa = document.getElementById('numero_da');
    const messageErreur = document.getElementById('message_declaration');

    let declarationEstCoche = declaration.checked;
    let daEstValide = ValidationNumeroDa(inputNumeroDa.value);

    messageErreur.innerHTML = declarationEstCoche ? '' : 'Vous devez accepter la déclaration.';

    if (declarationEstCoche && daEstValide) {
        formulaireExamen.submit();
    } 
}


/**
 * Point 5 - Modification de l'image d'arrière-plan
 */
const boutonChangerImageFond = document.getElementById('bouton_changer_image_fond');
boutonChangerImageFond.addEventListener('click', ModifierImageFond);

function ModifierImageFond() {
    const conteneurPrincipale = document.getElementById('conteneur_principale');
    const listeImages = [
        'images/background01.jpg',
        'images/background02.jpg',
        'images/background03.jpg',
        'images/background04.jpg',
        'images/background05.jpg'
    ];
    let nombreAleatoire = ObtenirNombreAleatoire(0, listeImages.length - 1);
    console.log(nombreAleatoire);

    conteneurPrincipale.style.backgroundImage = `url(${listeImages[nombreAleatoire]})`;
}

function ObtenirNombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}