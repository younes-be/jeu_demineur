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
<<<<<<< HEAD
function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function chrono(){
	let k=document.getElementById("temps").value;
	const myButton = document.getElementById("fin_game");
	let arret=0;

	while(arret==!1) {
	
	await sleep(1000);
	document.getElementById("temps").value=document.getElementById("temps").value*1+1;
	myButton.addEventListener("click",() =>{arret=1;})
}
}
async function reset(){
	await sleep(500);
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
Cookies();
=======

let grille = [];

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

>>>>>>> c1749f127de61663f2681184e2809c5310ee00a5
