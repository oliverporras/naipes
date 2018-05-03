var palos 	= new Array("Copas", "Bastos", "Oros", "Espadas");
var valores = new Array("As","2", "3", "4", "5", "6", "7", "Sota", "Caballo", "Rey"); 
var arrJugadores = new Array();
var baraja 	= new Array(40);

var manoJugador1 = new Array();
var manoJugador2 = new Array();
var manoJugador3 = new Array();
var manoJugador4 = new Array();
var manoJugador5 = new Array();
var manoJugador6 = new Array();
var manoJugador7 = new Array();
var manoJugador8 = new Array();
var manoJugador9 = new Array();
var manoJugador10 = new Array();

var valoresJugador1 = new Array(10); 
var valoresJugador2 = new Array(10); 
var valoresJugador3 = new Array(10); 
var valoresJugador4 = new Array(10); 
var valoresJugador5 = new Array(10); 
var valoresJugador6 = new Array(10); 
var valoresJugador7 = new Array(10); 
var valoresJugador8 = new Array(10); 
var valoresJugador9 = new Array(10); 
var valoresJugador10 = new Array(10); 

var NumCartasParaGanar = 3;

var c=0;

//utilizaremos esta variable: 0=Sin ganador; 1=Jugador1 gana; 2=Jugador2 gana
var Ganador = 0;

//esta variable la utilizaremos para guardar la posición del array donde está la jugada que ha ganado
var ValorCartaGanador = 0;

var UltimoJugador = 1;

function NuevoJugador(){
	if ( document.getElementById("NombreJugador").value != ""){
		if( arrJugadores.length<10 ){
			var ul = document.getElementById("Jugadores");
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(document.getElementById("NombreJugador").value));
			ul.appendChild(li);

			arrJugadores.push(document.getElementById("NombreJugador").value);

			document.getElementById("tag_body").innerHTML =	document.getElementById("tag_body").innerHTML + '<fieldset>Jugador "'+document.getElementById("NombreJugador").value+'"<ul id="ManoJugador'+arrJugadores.length+'"></ul></fieldset>';

			document.getElementById("NombreJugador").value = "";
		}
		else {
			alert('¿10 jugadores no son suficientes?');
		}
	}
}

function LeerJugadores(){
	var jugadores = document.getElementById("Jugadores").children;	
	//alert ( jugadores.length );
	for ( i=0; i<jugadores.length; i++){
		alert( jugadores[i].innerText );
	}
	//alert(arrJugadores.length);
}


function BarajaNueva() {

	/*
	var manoJugador1 = new Array();
	var manoJugador2 = new Array();
	*/

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
	MezclarBaraja();
}

/*Esta función es el constructor de cartas*/
function CrearCarta(valor, palo) {
  this.valor = valor;
  this.palo = palo;
}


function MezclarBaraja(){
	for ( i=0; i<baraja.length; i++){
		posicion = Math.floor((Math.random() * baraja.length-1));
		//console.log(baraja[posicion].valor);
		var CartaMano = baraja[posicion];
		baraja[posicion] = baraja[i];
		baraja[i] = CartaMano;
	}
	console.log(baraja);
}

function CogerCarta( jugador ){
	if ( Ganador==0 && baraja.length>0 ){
		if( 1==2 ) {
			posicion = Math.floor((Math.random() * baraja.length));
			var CartaMano = baraja[posicion];
			baraja.splice( posicion, 1 );
		}
		if(1==1){
			var CartaMano = baraja.pop();
			document.getElementById("naipe").src = 'images/'+CartaMano.valor.toLowerCase()+'_'+CartaMano.palo.toLowerCase()+'.png';
		}
		
		//console.log(baraja.length);

		eval('manoJugador'+jugador).push ( CartaMano );

		var txt = CartaMano.valor + ' de ' + CartaMano.palo;
		var img = '<img src="images/'+CartaMano.valor.toLowerCase()+'_'+CartaMano.palo.toLowerCase()+'.png" class="miniCarta" />';
		function_li( jugador, txt, img );
		console.log("Baraja: " + baraja.length);
		console.log(baraja);
		/*
		console.log("Mano Jugador 1: " + manoJugador1.length);
		console.log(manoJugador1);
		console.log("Mano Jugador 2: " + manoJugador2.length);
		console.log(manoJugador2);
		*/
	}
	else{
		if ( Ganador>0 ) {
			console.log("Juego terminado");
		} 
		if ( baraja.length==0 ) {
			console.log("Se acabaron las cartas");
		} 
	}
	ChequearManos();
}

function ChequearManos(){
	for( var i=0; i<10; i++){
		for ( j=1; j<=arrJugadores.length; j++){
			eval('valoresJugador'+j)[i] = 0;
		}
	}

	for ( j=1; j<=arrJugadores.length; j++){
		//console.log( manoJugador1.length );
		for( var i=0; i<eval('manoJugador'+j).length; i++){
			for ( var v=0; v<valores.length; v++){
				if( eval('manoJugador'+j)[i].valor == valores[v] ){
					eval('valoresJugador'+j)[v] = eval('valoresJugador'+j)[v] + 1;
				}
				if( eval('valoresJugador'+j)[v] >= NumCartasParaGanar ){
					Ganador = j;
					ValorCartaGanador = v;
				}
			}
		}
	}
	for ( j=1; j<=arrJugadores.length; j++){
		console.log( eval('valoresJugador'+j) );
	}

	if ( Ganador >0 ){
		document.getElementById("ganador").innerHTML = "Ganador ¡"+arrJugadores[Ganador-1] + "!";
		document.getElementById("cartaganadora").innerHTML = "Carta: "+valores[ValorCartaGanador];
		console.log("Ganador jugador "+Ganador);
		console.log("Han aparecido "+NumCartasParaGanar+" "+valores[ValorCartaGanador] +"!");
	}
}

function RepartirCarta(){

	if ( arrJugadores.length > 0){
		CogerCarta( UltimoJugador );
		UltimoJugador=UltimoJugador+1;
		if (UltimoJugador > arrJugadores.length){
			UltimoJugador = 1;
		}
	}
	else{
		alert('No hay nadie jugando');
	}
}

function function_li( jugador, txtCarta, imgCarta ) {
  var ul = document.getElementById("ManoJugador"+jugador);
  var li = document.createElement("li");
  //document.getElementById("naipe").src = 'images/'+CartaMano.valor.toLowerCase()+'_'+CartaMano.palo.toLowerCase()+'.png';
  //li.innerHTML = imgCarta + '<p>'+txtCarta+'</p>';
  li.innerHTML = imgCarta;
  //li.className = 'miniCarta';
  li.appendChild(document.createTextNode(''));
  ul.appendChild(li);
}