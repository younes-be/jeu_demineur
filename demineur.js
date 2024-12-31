class Case_grille {
    constructor(x, y) {
	this.posX = x;
	this.posy = y;
	this.isMine = false;
	this.number = 0;
	this.hidden = true;
    }

}



let grille = [];
let hauteur = 7;
let largeur = 7;
let number_mines = 10 ;





function creerGrille(haut, larg,mine_nb) {
    
    grille.length = haut;
    for (var i=0;i<haut;i++) {
	grille[i] = Array(larg);
	for (var j=0;j<larg;j++){
	    grille[i][j] = 0;
	}
    }
    

    for (var k=0;k<mine_nb;k++) {
	
	let new_x = Math.floor(Math.random() * larg) ;
	let new_y = Math.floor(Math.random() * haut) ;
	
	while (grille[new_y][new_x] == 9) {
	    let new_x = Math.floor(Math.random() * larg) ;
	    let new_y = Math.floor(Math.random() * haut) ;
	}
	
	grille[new_y][new_x] = 9 ;
	for (var m=Math.max(0,new_y-1);m<Math.min(haut,new_y+2);m++) {
	    for (var n=Math.max(0,new_x-1);n<Math.min(larg,new_x+2);n++){
		if (grille[m][n] != 9) {
		    grille[m][n]++;
		}
	    }
	} 
	
    }
}


//Fonction pour créer un cookie.
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
// Fonction pour lire un cookie
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
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
    const y = parseInt(coords[1]) ;
    return("url('case_" + grille[x][y].toString() + ".png')'") ;
}

function changeImage(mouseEvent) {
    if (!(mouseEvent.target.classList.contains("buttonFlagged"))) {
	mouseEvent.target.style.background= selectImage(this.id) ;
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
    
    const divJeu = document.getElementById("jeu") ;
    var divGrille = document.createElement("DIV") ;
    divGrille.id = "grille";
    divGrille.style.display = "grid";
    let taille = "50px " ;
    let taille_cols = taille.repeat(larg) ;
    let taille_rows = taille.repeat(haut) ;
    divGrille.style.gridTemplateColumns = taille_cols ;
    divGrille.style.gridTemplateRows = taille_rows ;
    divJeu.appendChild(divGrille) ;

    for (var i=0;i<haut;i++) {
	for (var j=0;j<larg;j++){
	    var newCase = document.createElement("BUTTON") ;
	    newCase.style.gridRow=i.toString() ;
	    newCase.style.gridColumn = j.toString() ;
	    newCase.classList.add("button_case") ;
	    newCase.id = i.toString() + "_" + j.toString() ;
	    newCase.style.background="url('case_vide.png')" ;
	    newCase.addEventListener("click", changeImage);
	    newCase.addEventListener("contextmenu", changeImageFlag);
	    divGrille.appendChild(newCase) ;
	    
	}
    }    
    
}

creerGrille(hauteur,largeur,number_mines) ;
grilleButtons(hauteur,largeur) ;
