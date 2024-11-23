/************Effet de chargement************/


/************Niveau de navigation dans la navbar************/
let observer = null;
let sectionContainer = document.querySelectorAll('div[data-section]');
let aproposSec1 = document.getElementById("apropos-sec1");
let aproposSec2 = document.getElementById("apropos-sec2");
let skillsContainer = document.getElementById("skills-container");
let progressBars = document.querySelectorAll(".progress-bar");
let timelineItem = document.querySelectorAll(".timeline-item");
let presentation=document.getElementById("presentation");
let texte="Je suis Pépin Nickerson GOUDOU, développeur web & mobile.";
let index=0;
let i=0;
let dir="aGauche";
let nav=document.getElementById("navBar");
let homeBtn=document.getElementById("home");
let menuIcon = document.querySelector("#menu");
let menuIconStatut = menuIcon.className;

/**
 * Fonction permettant de gérer l'animation des barres de progessions de skills
 */
function showProgress(){
    progressBars.forEach(progressBar => {
        let valueProgress = progressBar.dataset.progress;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${valueProgress}%`;
    });
}

/**
 * Fonction permettant de gérer l'effet de translation des éléments
 * @param {HTMLElement} element 
 * @param {string} translateType 
 * @param {number} value 
 */
const startTransform = function(element, translateType, value) {
    element.style.transform = `translate${translateType}(${value}%)`;
    element.style.opacity = 1;
}

/**
 * Fonction permettant de déclencher l'apparation par effet de translate des éléments
 * @param {HTMLElement} element 
 */
const SlideIn = function(element) {
    if(element?.getAttribute('id') == 'apropos')
    {
        startTransform(aproposSec1, 'Y', 0);
        startTransform(aproposSec2, 'Y', 0);
    }
    if(element?.classList.contains('timeline-item'))
    {
        startTransform(element, 'Y', 0);
    }
}

/**
 * Fonction permettant d'ajouter ou de supprimer la classe active aux nav items
 * @param {HTMLElement} element 
 */
const activate = function(element) {
    let linkAssociate = document.querySelector(`a[href="#${element.getAttribute('id')}"]`);
    if(element == skillsContainer)
    {
        showProgress();
    }
    SlideIn(element);
    if(linkAssociate == null)
    {
        return null;
    }
    linkAssociate.parentElement.parentElement.querySelectorAll('.active').forEach(
        (node) => {
            node.classList.remove('active');
        }
    );
    linkAssociate.classList.add('active');
}

/**
 * Fonction callback de l'intersectionObserver
 * @param {IntersectionObserverEntry[]} entries 
 * @param {IntersectionObserver} observer 
 */
const callback = function(entries, observer) {
    entries.forEach(
        (entry) => {
            if(entry.isIntersecting)
            {
                activate(entry.target);
            }
        }
    );
}

/**
 * Fonction pour associer ou supprimer un observateur sur les éléments HTML
 * @param {HTMLElement[]} elements 
 * @param {number} ratio 
 */
const observe = function(elements, ratio = .6) {
    if(observer != null)
    {
        elements.forEach(
            (element) => {
                observer.unobserve(element);
            }
        );
    }
    let y = window.innerHeight * ratio;
    observer = new IntersectionObserver(callback, {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    });
    
    elements.forEach(
        (element) => {
            observer.observe(element);
        }
    );
}

/**
 * Espionner les différentes sections
 */
if(sectionContainer.length != 0)
{
    observe(sectionContainer);
    if(window.innerWidth <= 570)
    {
        observe(sectionContainer, 0.2);
    }
}

/**
 * Espionner l'apparition des éléments du timeline
 */
if(timelineItem.length != 0)
{
    observe(timelineItem, .2);
}
/************Afficher/Masquer le bouton retour en haut de page et bar de navigation************/
window.onscroll=function(){scrollFuntion()};


function scrollFuntion(){
    if((document.body.scrollTop>400 || document.documentElement.scrollTop>400)){
            homeBtn.style.display="block";
    }
    else{
        homeBtn.style.display="none";
    }
}


window.onload=setTimeout(function(){afficherPresentation()},2000);

function afficherPresentation(){
    setTimeout(afficherPresentation,150);
    presentation.innerHTML=texte.substring(0,i);
    if(dir=="aGauche"){
        i+=1;
        if(i>texte.length+5){
            dir="aDroite"
        }
    }
    if(dir=="aDroite"){
        i-=1;
        if(i<-5){
            dir="aGauche";
        }
    }
}


/*************SUR MOBILE*************/

function hideShowMenu(){
    if(menuIcon.className == menuIconStatut){
        menuIcon.className = "fa-solid fa-xmark fa-2xl"
        nav.style.transform = "translateX(0%)";
        nav.style.opacity = 1;
    }
    else{
        menuIcon.className = "fa-solid fa-bars fa-2xl"
        nav.style.transform = "translateX(-100%)";
        nav.style.opacity = 0;
    }
}

menuIcon.addEventListener("click",function(){
    hideShowMenu();
})

/******CACHER LA NAV BARRE AU CLIC SUR L'ECRAN*******/

window.onclick=function(){
    let menuIconDisplayStatut = getComputedStyle(menuIcon).display
    let navBarStatut = getComputedStyle(nav).opacity
    if(menuIconDisplayStatut === "inline-block"){
        if(navBarStatut === "1"){
            menuIcon.className = "fa-solid fa-bars fa-2xl"
            nav.style.transform = "translateX(-100%)";
            nav.style.opacity = 0;
        }
    }
}
