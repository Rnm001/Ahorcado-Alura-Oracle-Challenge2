var palabras =['ALURA', 'AHORCADO', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT']
var tablero = document.getElementById('horca').getContext('2d');
var letras = [];
var palabraCorrecta = "";
var palabraSecreta = "";
var errores = 11;
var aciertos = 0;


function escojerPalabraSecreta(){
    var palabra = palabras[Math.floor(Math.random()*palabras.length)]
    palabraSecreta = palabra
    console.log(palabra)
    return palabraSecreta
}

function dibujarLineas(){
    tablero.LineWidth = 6
    tablero.LineCap = "round"
    tablero.LineJoin = "round"
    tablero.strokeStyle = "#0A3871"
    tablero.beginPath()
    var ancho=600/palabraSecreta.length
    for(let i = 0; i < palabraSecreta.length ; i++){
        tablero.moveTo(500+(ancho*i),640)
        tablero.lineTo(550+(ancho*i),640) 
    }
    tablero.stroke()
    tablero.closePath()
} 
dibujarLineas(escojerPalabraSecreta())

function escribirLetraCorrecta(index){
    tablero.font = 'bold 52px Arial';
    tablero.LineWidth=6
    tablero.LineCap="round"
    tablero.LineJoin="round"
    tablero.fillStyle= "#0A3871"
    var ancho=600/palabraSecreta.length
    tablero.fillText(palabraSecreta[index],505+(ancho*index),620)
}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = 'bold 40px Arial';
    tablero.LineWidth=6
    tablero.LineCap="round"
    tablero.LineJoin="round"
    tablero.fillStyle= "#0A3871"
    tablero.fillText(letra, 535+(40*(10-errorsLeft)), 710,40)
}

function verificarLetraClickeada(key){
    if (letras.length<1 || letras.indexOf(key)<0)
    {
        letras.push(key)
        return false
    }
    else{
        letras.push(key)
        return true
    }
    
}


//function countChars(palabraSecreta){
  //  var maxLength = letras;
  //  var strLength = palabraSecreta;
    
  //  if(strLength === maxLength){
  //      alert("Ganaste");
    
  //  }
//}


//contarletraClickeadas()
//function contarletraClickeadas(){
  //  if (letras.length === palabraSecreta.length)
  //  alert("Palabra Agregada");
  //  console.log(letras);
//}

function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letra) {
    if(palabraSecreta.indexOf(letra)<=0){
    errores-=1
    }
//aca agrego la funcion del ahorcado() es para que verifique que cuando resta los errores dibuje una linea
    Ahorcado()
  //  countChars()
}



document.onkeydown = (e) => {
    let letra=e.key.toUpperCase()
    if(!verificarLetraClickeada(e.key)){
        if(palabraSecreta.includes(letra)){
            console.log(letra) 
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for (let i=0;i<palabraSecreta.length;i++){
                if(palabraSecreta[i]===letra){
                    escribirLetraCorrecta(i)
                }
            }
        }
        else{
            if (!verificarLetraClickeada(e.key)) return
            adicionarLetraIncorrecta(letra)
            escribirLetraIncorrecta(letra,errores)
        }
    }
}
//funcion de mostrar el fondo que tapa el juego lo use para probar que funcionara
//function Mostrar(){
  //  document.getElementById("fondo-menu").style.display = "block";
//}
//funcion de oculta el fondo que tapa el juego, lo use para probar que funcionara
// function Ocultar(){
   // document.getElementById("fondo-menu").style.display = "none";
//}

//Aca es donde se hace la transicion de activar o desactivar el tablero, funciona moviendo el plano para adelante o para atras
function Comenzar(){
    document.getElementById("fondo-menu").style.zIndex = -1;
    document.getElementById("boton-start").style.display = "none";
    document.getElementById("boton-agregar").style.zIndex = -1;
    document.getElementById("h1ahorcado").style.zIndex = -1;
    document.getElementById("nuevaPalabra").style.zIndex = -1;
    
    //escucharLetras();
}
//Función para reiniciar el juego/pagina en este caso
function Restart(){
    location.reload()
}

// esta es la funcion del dibujo de la horca y el personaje (la idea era hacer imagenes en photoshop e ir habilitandolas a medida que vaya 
// marcando los errores, pero preferi hacer que el canvas dibujara al muñeco y la horca)
function Ahorcado() {

    console.log(errores)

    if(errores === 10){ // Base del dibujo
        tablero.beginPath() 
        tablero.moveTo(90, 640); 
        tablero.lineTo(260, 640);
        tablero.stroke();
        tablero.closePath();
    }
    
    if(errores === 9){ // Mastil
        tablero.beginPath()
        tablero.moveTo(115, 640); 
        tablero.lineTo(115, 460);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 8){ // Linea transversal de arriba
        tablero.beginPath()
        tablero.moveTo(113, 460);
        tablero.lineTo(190, 460);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 7){ //Soga
        tablero.beginPath() 
        tablero.moveTo(190, 460); 
        tablero.lineTo(190, 485);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 6){ //Cabeza (lo tome de un compañero porque no se me ocurria como)
        tablero.beginPath()
        tablero.beginPath(); 
        tablero.arc(190, 500, 18, 0, 2 * Math.PI, false);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 5){ // tronco
        tablero.beginPath()
        tablero.moveTo(190, 520); 
        tablero.lineTo(190, 580);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 4){ //brazo derecho
        tablero.beginPath()
        tablero.moveTo(190, 525); 
        tablero.lineTo(222, 540);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 3){ //Brazo izquierdo
        tablero.beginPath()
        tablero.moveTo(190, 525); 
        tablero.lineTo(158, 540);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 2){ //Pierna Derecha
        tablero.beginPath()
        tablero.moveTo(190, 580); 
        tablero.lineTo(165, 600);
        tablero.stroke();
        tablero.closePath();
    }
    if(errores === 1){ //Pierna Izquierda
        tablero.beginPath()
        tablero.moveTo(190, 580)
        tablero.lineTo(222, 600);
        tablero.stroke();
        tablero.closePath();
       // alert("Ahorcado!");
    }  
    if(errores === 1){ // Cartel de perder el juego
        document.getElementById("h1perdiste").style.zIndex = 2;
        document.getElementById("fondo-menu").style.zIndex = 2;
        document.getElementById("boton_reiniciar").style.zIndex = 2;
        
    }
}

function verificarpalabras(){                           //sentencia no terminada
    if (palabraSecreta === palabraCorrecta){
        cartelganador()       
    }
}

function cartelganador(){                               //sentencia no terminada
document.getElementById("h1ganaste").style.zIndex = 2;
}

function agregarpalabras(){                                                                 //funcion para agregar palabras y verifique si ya existen
    var nuevapalabra = null;
    nuevapalabra = document.getElementById("nuevaPalabra").value.toUpperCase();
  
        if (palabras.includes(nuevapalabra)||nuevapalabra === "") {
        alert("Palabra Repetida y Casillero Vacio");
        document.getElementById("nuevaPalabra").value = "";
        } else {
          palabras.push(nuevapalabra);
          alert("Palabra Agregada");
          document.getElementById("nuevaPalabra").value = "";
          console.log(palabras);
        }
      }
      

