const inputPassword = document.querySelector('#password');
const inputPasswordConfirmation = document.querySelector('#confirm-password');
const formulairePassword = document.querySelector('#form-password');
const msgValidationLongueur = document.querySelector('.validation-longueur');
const msgValidationMajuscule = document.querySelector('.validation-majuscule');
const msgValidationCaractere = document.querySelector('.validation-caractere');
const iconesReveal = document.querySelectorAll('.icone-reveal');
let passwordValide = false;

inputPassword.addEventListener('input', validePassword);
formulairePassword.addEventListener('submit', valideFormulaire);
iconesReveal.forEach( iconeReveal => iconeReveal.addEventListener('click', afficheMotDePasse));

/**
 * Affiche ou masque le mot de passe
 * @param {object} e L'objet event associé à l'événement qui a lancé la fonction
 */
function afficheMotDePasse(e) {
    let icone = e.target;
    let inputPassword = icone.closest('div').querySelector('input');
    // Modifie l'icone
    icone.classList.toggle('fa-eye');
    icone.classList.toggle('fa-eye-slash');
    // Modifie le type du input
    let nouveauType = inputPassword.getAttribute('type') == "text" ? "password" : "text";

    inputPassword.setAttribute('type', nouveauType);
}

/**
 * Valide si un texte contient au moins un caractère spécial
 * @param {string} value Le texte à valider
 * @returns 
 */
function contientCaractereSpecial(value) {
    const caractereSpecial_regex = /[!@#$%^&*(),.?":{}|<>]/;
    return caractereSpecial_regex.test(value);
}

/**
 * Valide si un texte contient une majuscule et une minuscule
 * @param {string} valeur Le texte à valider
 * @returns true si le texte contient une majuscule et une minuscule
 */
function contientMajusculeMinuscule(valeur) {
    /*
     * On aurait très bien pu utilisé un regex ici aussi pour valider la majuscule
     * et la minuscule : 
     * 
     * const majMin_regex = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
     * return majMin_regex.test(valeur);
     * 
     * Je vous montre ici une autre façon de faire en utilisant le fait qu'un string est
     * un tableau de lettre.
     */

    let contientMajuscule = false;
    let contientMinuscule = false;

    for (let i = 0; i < valeur.length; i++) {
        const lettre = valeur[i];
        if(lettre.toLowerCase() === lettre) {
            contientMinuscule = true;
        }

        if(lettre.toUpperCase() === lettre) {
            contientMajuscule = true;
        }   
    }

    return contientMinuscule && contientMajuscule;
}

/**
 * Modifie le style d'un element html selon que le mot de passe est valide ou non
 * @param {element} element L'élément html où le message est affiché 
 * @param {boolean} valide Indique si le mot de passe est valide
 */
function messageValidation(element, valide) {
    const icone = element.querySelector('i');
    if(valide) {
        element.classList.remove('invalide');
        element.classList.add('valide');
        icone.classList.remove('fa-ban');
        icone.classList.add('fa-check');
    } else {
        element.classList.remove('valide');
        element.classList.add('invalide');
        icone.classList.remove('fa-check');
        icone.classList.add('fa-ban');
    }
}

/**
 * Affiche un indicateur de couleur selon la force du mot de passe sous le input du mot de passe
 * @param {int} valeurForce Valeur de 0 à 4 indiquant la force du mot de passe
 * @param {str} password Le mot de passe
 */
function afficheForcePassword(valeurForce, password) {
    const listePasswordUnite = document.querySelectorAll('.password-meter-unit');

    // Supprime tout les classes qui détermine la couleur
    listePasswordUnite.forEach( unite => unite.classList.remove('bas', 'moyen', 'haut'));

    if(password) {
        // Détermine la classe à utiliser selon la force du password
        let classeForce = 'bas';
        if(valeurForce == 2) {
            classeForce = "moyen";
        } else if(valeurForce > 2) {
            classeForce = "haut";
        }


        for (let index = 0; index < listePasswordUnite.length; index++) {
            const unite = listePasswordUnite[index];
            if(index <= valeurForce) {
                unite.classList.add(classeForce);
            }          
        }    
    }
}

/**
 * Valide que le mot de passe saisie répond aux critères
 * @param {object} e L'objet event associé à l'événement qui a lancé la fonction
 */
function validePassword(e) {
    const password = e.target.value;
    const resultatForce = zxcvbn(password);
    
    let validationLongueur = password.length >= 8;
    let validationMajuscule = contientMajusculeMinuscule(password);
    let validationCaractere = contientCaractereSpecial(password);

    afficheForcePassword(resultatForce.score, password);

    messageValidation(msgValidationLongueur,validationLongueur);
    messageValidation(msgValidationMajuscule, validationMajuscule);
    messageValidation(msgValidationCaractere, validationCaractere);

    passwordValide = (resultatForce.score > 2)
        && validationLongueur
        && validationMajuscule
        && validationCaractere; 

    console.log(passwordValide);
}

/**
 * Validation du formulaire avant l'envoi
 * @param {object} e L'objet event associé à l'événement qui a lancé la fonction 
 */
function valideFormulaire(e) {
    // On annule l'envoi du formulaire
    e.preventDefault();

    let passwordConfirm = inputPassword.value === inputPasswordConfirmation.value;

    if(!passwordConfirm) {
        document.querySelector('.message-erreur').classList.remove('hidden');
    }
    console.log(passwordConfirm);
    if(passwordValide && passwordConfirm) {
        formulairePassword.submit();
    }
}