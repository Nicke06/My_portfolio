/************Effet de chargement************/

/************Afficher/Masquer le bouton retour en haut de page et bar de navigation************/
window.onscroll=function(){scrollFuntion()};

var nav=document.getElementById("navBar");
var homeBtn=document.getElementById("home");
var screenWidth = window.screen.width;

function cacherNavBar(){
    nav.style.top="-100px";
    nav.style.transition="top 2s";
}

var aproposSec1 = document.getElementById("apropos-sec1");
var aproposSec2 = document.getElementById("apropos-sec2");
var timelineDiv1 = document.getElementById("timeline-div1")
var timelineDiv2 = document.getElementById("timeline-div2")
var timelineDiv3 = document.getElementById("timeline-div3")

//Fonction pour gérer l'apparition des éléments
function SlideIn(objet, coef){
    const {scrollTop, clientHeight} = document.documentElement;

    const DistanceToTop = objet.getBoundingClientRect().top;
    
    if(scrollTop > (scrollTop + DistanceToTop).toFixed() - (clientHeight * coef)){
        objet.style.transform = "translateY(0%)";
        objet.style.opacity = 1;
    }
}

function scrollFuntion(){
    if((document.body.scrollTop>400 || document.documentElement.scrollTop>400)){
            homeBtn.style.display="block";
    }
    else{
        homeBtn.style.display="none";
    }
    //Afficher la photo de la partie à propos
    SlideIn(aproposSec1, 1.5);
    SlideIn(aproposSec2, 1.5);
    SlideIn(timelineDiv1, 0.80);
    SlideIn(timelineDiv2, 0.80);
    SlideIn(timelineDiv3, 0.80);
}


window.onload=setTimeout(function(){afficherPresentation()},2000);

var presentation=document.getElementById("presentation");
var texte="Je suis <span>Pépin Nickerson GOUDOU</span>, développeur web & mobile.";
var index=0;
var i=0;
var dir="aGauche";

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

/************Effet de chargement bar de progression************/
var skillsContainer = document.getElementById("skills-container");
var progressBars = document.querySelectorAll(".progress-bar");

function showProgress(){
    progressBars.forEach(progressBar => {
        var valueProgress = progressBar.dataset.progress;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${valueProgress}%`;
    });
}

window.addEventListener("scroll", function(){
    var sectionPos = skillsContainer.getBoundingClientRect().top;
    var screenPos = window.innerHeight / 2;
    if(sectionPos < screenPos){
        showProgress();
    }
});

/*************SUR MOBILE*************/
var menuIcon = document.querySelector("#menu");
var menuIconStatut = menuIcon.className

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
    var menuIconDisplayStatut = getComputedStyle(menuIcon).display
    var navBarStatut = getComputedStyle(nav).opacity
    if(menuIconDisplayStatut === "inline-block"){
        if(navBarStatut === "1"){
            menuIcon.className = "fa-solid fa-bars fa-2xl"
            nav.style.transform = "translateX(-100%)";
            nav.style.opacity = 0;
        }
    }
}