var palos 	= new Array("Copas", "Bastos", "Oros", "Espadas");
var valores = new Array("As","2", "3", "4", "5", "6", "7", "Sota", "Caballo", "Rey"); 
var jugadores = new Array();
var baraja 	= new Array(40);
var manoJugador1 = new Array();
var manoJugador2 = new Array();

var valoresJugador1 = new Array(10); 
var valoresJugador2 = new Array(10); 

var c=0;

//utilizaremos esta variable: 0=Sin ganador; 1=Jugador1 gana; 2=Jugador2 gana
var Ganador = 0;

//esta variable la utilizaremos para guardar la posición del array donde está la jugada que ha ganado
var ValorCartaGanador = 0;

var UltimoJugador = 0;

function BarajaNueva() {

	var manoJugador1 = new Array();
	var manoJugador2 = new Array();

	/*
	for( var i=0; i<10; i++){
		valoresJugador1[i] = 0;
		valoresJugador2[i] = 0;
	}
	*/

	var p=0;
	var v=0;
	/*primer for: un bucle para toda la baraja de cartas (40)*/
	for( var c=0; c<40; c++){
		/* Ahora vamos a controlar 'v' para los valores del As al Rey, cuando llegue a la posición 10 lo reseteamos a 0 */
		if( v == 10 ) { 
			v=0; 
		}

		/* Aquí controlamos el índice del array de los palos 'p', 
		cuando el contador 'c' llegue a 10 (habremos completado el primer palo) pasamos al siguiente palo*/ 
		if(c == 10) { 
			p=1; 
		}
		if(c == 20) { 
			p=2; 
		}
		if(c == 30) { 
			p=3; 
		}

		var opt = 3;
		//Opción 1:
		if(opt==1){
			var Carta = new Object();
			Carta.valor = valores[v];
			Carta.palo = palos[p];
			baraja[c] = Carta;
		}

		//Opción 2:
		if(opt==2){
			/*Para hacerlo bonito vamos a utilizar un OBJETO, que luego podremos hacer referencia a sus propiedades
			- Objeto llamado Carta, que tendrá 2 propiedades: valor y palo
			Y para hacerlo más elegante aún, vamos a rellenar esa Carta utilizando la función CrearCarta(valor,palo)*/ 
			var Carta = new CrearCarta(valores[v], palos[p]);
			/*Cuando ya tenemos el objeto Carta creado, con un valor y palo asignados a sus propiedades, lo guardamos en el array baraja*/
			baraja[c] = Carta;
			//console.log(Carta);
		}

		//Opción 3:
		if(opt==3){
			baraja[c] = new CrearCarta(valores[v], palos[p]);
		}

		//No hay que olvidarse de mover 'v' para que la función siga recorriendo los valores del 1 al 10 (posiciones 0 - 9 del array)
		v++;		
	}
	console.log(baraja);
	Ganador = 0;
}

/*Esta función es el constructor de cartas*/
function CrearCarta(valor, palo) {
  this.valor = valor;
  this.palo = palo;
}


function MezclarBaraja(){
	for ( i=0; i<baraja.length; i++){
		posicion = Math.floor((Math.random() * baraja.length));
		//console.log(baraja[posicion].valor);
		var CartaMano = baraja[posicion];
		baraja[posicion] = baraja[i];
		baraja[i] = CartaMano;
	}
	console.log(baraja);
}

function CogerCarta( jugador ){
	if ( Ganador==0 ){
		if( 1==2 ) {
			posicion = Math.floor((Math.random() * baraja.length));
			var CartaMano = baraja[posicion];
			baraja.splice( posicion, 1 );
		}
		if(1==1){
			var CartaMano = baraja.pop();
		}
		
		//console.log(baraja.length);

		if ( jugador == 1) {
			manoJugador1.push ( CartaMano );
		}
		if ( jugador == 2) {
			manoJugador2.push ( CartaMano );
		}
		var txt = CartaMano.valor + ' de ' + CartaMano.palo;
		function_li( jugador, txt );
		console.log("Baraja: " + baraja.length);
		console.log(baraja);
		console.log("Mano Jugador 1: " + manoJugador1.length);
		console.log(manoJugador1);
		console.log("Mano Jugador 2: " + manoJugador2.length);
		console.log(manoJugador2);
	}
	else{
		console.log("Juego terminado");
	}
	ChequearManos();
}

function ChequearManos(){

	for( var i=0; i<10; i++){
		valoresJugador1[i] = 0;
		valoresJugador2[i] = 0;
	}

	//console.log( manoJugador1.length );
	for( var i=0; i<manoJugador1.length; i++){
		for ( var v=0; v<valores.length; v++){
			if( manoJugador1[i].valor == valores[v] ){
				valoresJugador1[v] = valoresJugador1[v] + 1;
			}
			if( valoresJugador1[v] >= 4 ){
				Ganador = 1;
				ValorCartaGanador = v;
			}
		}
	}
	for( var i=0; i<manoJugador2.length; i++){
		for ( var v=0; v<valores.length; v++){
			if( manoJugador2[i].valor == valores[v] ){
				valoresJugador2[v] = valoresJugador2[v] + 1;
			}
			if( valoresJugador2[v] >= 4 ){
				Ganador = 2;
				ValorCartaGanador = v;
			}
		}
	}
	console.log( valoresJugador1 );
	console.log( valoresJugador2 );
	//console.log(valoresJugador1);
	if ( Ganador >0 ){
		console.log("Ganador jugador "+Ganador);
		console.log("Han aparecido todos los "+valores[ValorCartaGanador]);
	}
}

function RepartirCarta(){
	if ( UltimoJugador == 0 ){
		CogerCarta(1);		
		UltimoJugador = 1;
	}
	else {
		CogerCarta(2);		
		UltimoJugador = 0;
	}
}

function function_li( jugador, txtCarta ) {
  var ul = document.getElementById("ManoJugador"+jugador);
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(txtCarta));
  ul.appendChild(li);
}