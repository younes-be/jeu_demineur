class Case {
    constructor(x, y) {
	this.posX = x;
	this.posy = y;
	this.isMine = false;
	this.number = 0;
    }

}
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