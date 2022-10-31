// Sélection de tous les items par défaut
let listeItems = document.querySelectorAll('.item');
// Lie l'événement clique d'un item à la fonction supprimeItem
listeItems.forEach(item => {
    item.addEventListener('click', supprimeItem)
});

let boutonAjouteItem = document.querySelector('.ajoute-item');
boutonAjouteItem.addEventListener('click', ajouteItem);

let listeBoutonsChoix = document.querySelectorAll('.liste-bouton-choix .bouton-choix');
listeBoutonsChoix.forEach( bouton => {
    bouton.addEventListener('click', modifierJustify);
})

let maDiv = document.querySelector(".madiv");

function supprimeItem(e) {
    // e.target représente l'élément qui a lancé l'événement
    e.target.remove();
}

function ajouteItem() {
    
    let lastItem = maDiv.querySelector("div:last-child");
    let newItem = document.createElement("div");

    newItem.innerHTML = parseInt(lastItem.innerHTML) + 1;
    newItem.classList.add("item");
    newItem.addEventListener('click', supprimeItem);
    maDiv.append(newItem);
}

function modifierJustify(e){
    let valeurJustify = e.target.getAttribute('data-choix');
    let ligneCode = document.querySelector(".ligne-justify-content");
    maDiv.style.justifyContent = valeurJustify;
    ligneCode.innerHTML = "justify-content: " + valeurJustify;

    listeBoutonsChoix.forEach( bouton => bouton.classList.remove('bouton-select'));
    e.target.classList.add('bouton-select');
}