class Case {
    constructor(x, y) {
	this.posX = x;
	this.posy = y;
	this.isMine = false;
	this.number = 0;
	this.hidden = true;
    }

    get imageName() {
	return this.getImageName();
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

function Cookies() {
	var accept = confirm("Tu veux des cookies ?");
	if (accept === true) {
	alert("Bon jeu!");
	} else {
	Cookies();
	}
	}
//Cookies();


function creerGrille(haut, larg) {
    grille.length = haut;
    let i = 0;
    let j = 0;
    while (i < haut) {
	grille[i] = Array(larg);
	j = 0;
	while (j<larg) {
	    grille[i][j] = new Case(j, i);
	    j = j + 1 ;
	}
	i = i + 1;
    }
    
}


function cookie(){
	const popup = document.getElementById('popup');
	const closePopupButton = document.getElementById('accept-button');
	
	// Fonction pour afficher la pop-up
	
	popup.classList.add('show');
	
	
	// Fonction pour fermer la pop-up
	closePopupButton.addEventListener('click', () => {
		setCookie('cookiesAccepted', 'true', 1); // Stocke l'acceptation pendant 1 jour
		popup.classList.remove('show');
	});
	
}

const cookieAccepted = getCookie('cookiesAccepted');

if (!cookieAccepted){
	cookie();
}
