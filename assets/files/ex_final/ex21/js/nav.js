const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const iconeTheme = document.getElementById('icone-theme');
const lienTheme = document.getElementById('lien-theme');
const checkboxLocaleStorage = document.getElementById('checkbox_localeStorage');
const checkboxSessionStorage = document.getElementById('checkbox_sessionStorage');
let themeActif = iconeTheme.getAttribute("data-theme");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));
iconeTheme.addEventListener("click", () => basculerTheme(true));
checkboxLocaleStorage.addEventListener("click", enregistrerStockage);
checkboxSessionStorage.addEventListener("click", enregistrerStockage);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

function basculerTheme(enregistrerTheme = false) {
    if (themeActif === "defaut_theme") {
        iconeTheme.setAttribute("class", "fas fa-toggle-on");
        iconeTheme.setAttribute("data-theme", "rainbow_theme");
        lienTheme.href = "css/rainbow_theme.css";
        themeActif = "rainbow_theme";
    } else {
        iconeTheme.setAttribute("class", "fas fa-toggle-off");
        iconeTheme.setAttribute("data-theme", "defaut_theme");
        lienTheme.href = "css/defaut_theme.css";
        themeActif = "defaut_theme";
    }

    if (enregistrerTheme) {
        enregistrerStockage();
    }

}

function enregistrerStockage() {
console.log(checkboxLocaleStorage);
    localStorage.setItem("checkboxLocaleStorage", checkboxLocaleStorage.checked);
    localStorage.setItem("checkboxSessionStorage", checkboxSessionStorage.checked);

    if (checkboxLocaleStorage.checked) {
        localStorage.setItem("theme", themeActif);
    } else {
        localStorage.removeItem("theme");
    }
    
    if (checkboxSessionStorage.checked) {
        sessionStorage.setItem("theme", themeActif);
    } else {
        sessionStorage.removeItem("theme");
    }


}

function chargerTheme() {

    if (localStorage.getItem("theme") !== null) {
        themeActif = localStorage.getItem("theme");
    } else if (sessionStorage.getItem("theme") !== null) {
        themeActif = sessionStorage.getItem("theme");
    } else {
        themeActif = iconeTheme.getAttribute("data-theme");
    }
    console.log(themeActif);
    if (themeActif === "defaut_theme") {
        iconeTheme.setAttribute("class", "fas fa-toggle-off");
        iconeTheme.setAttribute("data-theme", "defaut_theme");
        lienTheme.href = "css/defaut_theme.css";
    } else {
        iconeTheme.setAttribute("class", "fas fa-toggle-on");
        iconeTheme.setAttribute("data-theme", "rainbow_theme");
        lienTheme.href = "css/rainbow_theme.css";
    }

    if (localStorage.getItem("checkboxSessionStorage") !== null) {
        console.log(localStorage.getItem("checkboxSessionStorage"));
        checkboxSessionStorage.checked = localStorage.getItem("checkboxSessionStorage") === 'true';
    } else {
        checkboxSessionStorage.checked = false;
    }

    if (localStorage.getItem("checkboxLocaleStorage") !== null) {
        checkboxLocaleStorage.checked = localStorage.getItem("checkboxLocaleStorage") === 'true';
    } else {
        checkboxLocaleStorage.checked = false;
    }
}

chargerTheme();