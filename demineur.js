class Case {
    constructor(x, y) {
	this.posX = x;
	this.posy = y;
	this.isMine = false;
	this.number = 0;
	this.hidden = true;
    }

}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function chrono(){
	let k=document.getElementById("temps").value;
	const myButton = document.getElementById("fin_game");
	let arret=0;
	myButton.addEventListener("click",() =>{arret=1;})
	
	while(arret==!1) {
	await sleep(1000);
	if (arret==!1){
	document.getElementById("temps").value=document.getElementById("temps").value*1+1;
	
}
}
}
async function reset(){
	
	document.getElementById("temps").value=0;

}




let grille = [];
let hauteur = 7;
let largeur = 7;

function creerGrille(haut, larg) {
    grille.length = haut;
    for (var i=0;i<haut;i++) {
	grille[i] = Array(larg);
	for (var j=0;j<larg;j++){
	    grille[i][j] = new Case(j, i);
	}
    }
    
}

// Fonction pour créer un cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Fonction pour lire un cookie
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}


function cookie(){
	const popup = document.getElementById('popup');
	const close_popup_button = document.getElementById('accept-button');
	const keep_popup_button = document.getElementById('refuse-button');
	// Fonction pour afficher la pop-up
	popup.classList.add('show');

	keep_popup_button.addEventListener('click', () => {
		keep_popup_button.style.display = 'none';
	});
	
	// Fonction pour fermer la pop-up
	close_popup_button.addEventListener('click', () => {
		setCookie('cookiesAccepted', 'true', 1); // Stocke l'acceptation pendant 1 jour
		popup.classList.remove('show');
	});
	
}

const cookieAccepted = getCookie('cookiesAccepted');

if (!cookieAccepted){
	cookie();
}


function selectImage(idCase) {
    const coords = idCase.split("_") ;
    const x = parseInt(coords[0]) ;
    const y = parseInt(coords[0]) ;
}

function changeImage(mouseEvent) {
    if (!(mouseEvent.target.classList.contains("buttonFlagged"))) {
	mouseEvent.target.style.background="url('case_mine.png')" ;
	mouseEvent.target.classList.add("buttonRevealed") ;
    }
}


function changeImageFlag(rightClick) {
    
    rightClick.preventDefault() ;
    if (rightClick.target.classList.contains("buttonRevealed")) {
	return 0 ;
    } else if (rightClick.target.classList.contains("buttonFlagged")) {
	rightClick.target.style.background="url('case_vide.png')" ;
	rightClick.target.classList.remove("buttonFlagged") ;
    } else {
	rightClick.target.style.background="url('case_flag.png')" ;
	rightClick.target.classList.add("buttonFlagged") ;
    }
}

function grilleButtons(haut, larg) {
    const divGrille = document.getElementById("grille") ;
    for (var i=0;i<haut;i++) {
	for (var j=0;j<larg;j++){
	    var newCase = document.createElement("BUTTON") ;
	    newCase.style.gridrow=i.toString() ;
	    newCase.classList.add("button_case") ;
	    newCase.id = i.toString() + "_" + j.toString() ;
	    newCase.style.background="url('case_vide.png')" ;
	    newCase.addEventListener("click", changeImage);
	    newCase.addEventListener("contextmenu", changeImageFlag);
	    divGrille.appendChild(newCase) ;
	    
	}
    }    
    
}
