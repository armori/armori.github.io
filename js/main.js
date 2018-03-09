const arrayPersonajes = [
    {
        nombre: "abra",
        rutaImagen: "img/memory-game-master/abra.png"
    },
    {
        nombre: "bulbasaur",
        rutaImagen: "img/memory-game-master/bullbasaur.png"
    },
    {
        nombre: "charmander",
        rutaImagen: "img/memory-game-master/charmander.png"
    },
    {
        nombre: "dratini",
        rutaImagen: "img/memory-game-master/dratini.png"
    },
    {
        nombre: "eevee",
        rutaImagen: "img/memory-game-master/eevee.png"
    },
    {
        nombre: "jigglypuff",
        rutaImagen: "img/memory-game-master/jigglypuff.png"
    },
    {
        nombre: "mankey",
        rutaImagen: "img/memory-game-master/mankey.png"
    },
    {
        nombre: "meowth",
        rutaImagen: "img/memory-game-master/meowth.png"
    },
    {
        nombre: "pidgey",
        rutaImagen: "img/memory-game-master/pidgey.png"
    },
    {
        nombre: "pikachu",
        rutaImagen: "img/memory-game-master/pikachu-2.png"
    },
    {
        nombre: "psyduck",
        rutaImagen: "img/memory-game-master/psyduck.png"
    },
    {
        nombre: "squirtle",
        rutaImagen: "img/memory-game-master/squirtle.png"
    }
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");

var ganador = document.getElementById("ganador");
var perdedor = document.getElementById("perdedor");

var haganado = false;
var fin = false;
var reiniciar = false;

var contador = 0;
var primerSeleccionado;
var segundoSeleccionado;
selPrevio = null;

//Para poder reiniciar el juego sin recargar, habría que meter la eliminación y generación
//del tablero en una función. doblePersonajes no sería una constante para poder cambiarla.

reset();

// var doblePersonajes = arrayPersonajes.concat(arrayPersonajes)
//     .sort(()=> 0.5 - Math.random());

// rejilla.setAttribute("class","rejilla");
// game.appendChild(rejilla);

// doblePersonajes.forEach(personaje => {
//     const {nombre, rutaImagen} = personaje;
//     tarjeta = document.createElement("div");
//     tarjeta.classList.add("tarjeta");
//     tarjeta.dataset.name = nombre;

//     anverso = document.createElement("div");
//     anverso.classList.add("anverso");

//     reverso = document.createElement("div");
//     reverso.classList.add("reverso");

//     reverso.style.backgroundImage = `url(${rutaImagen})`

//     rejilla.appendChild(tarjeta);
//     tarjeta.appendChild(anverso);
//     tarjeta.appendChild(reverso);
// });

rejilla.addEventListener("click",function(evento){
    var seleccionado = evento.target;

    console.log(seleccionado);

    if (seleccionado.nodeName === "SECTION" 
        // || seleccionado === selPrevio
        || seleccionado.parentNode.classList.contains("seleccionado")
        || seleccionado.parentNode.classList.contains("eliminado")){
        return;
    }

    // console.log(seleccionado.classList);

    if (contador < 2){
        contador++;
        // seleccionado.classList.add("seleccionado");
        if (contador === 1){
            primerSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
            
            //selPrevio = seleccionado.parentNode;
        }else{
            segundoSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
            // contador = 0;
        }

        if (primerSeleccionado !== "" && segundoSeleccionado !== ""){
            if (primerSeleccionado === segundoSeleccionado){
                setTimeout(eliminar, 1200);
                setTimeout(resetSelec, 1200);
                contEliminados();
            }else{
                setTimeout(resetSelec, 1200);
                
                //selPrevio = null;
            }
        }
        selPrevio = seleccionado;
    }

    // seleccionado.classList.add("seleccionado");
});

// function eliminar(){
var eliminar = function(){
    var eliminados = document.querySelectorAll(".seleccionado");
    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado");
    });
}

// function resetSelec(){
var resetSelec = function(){ 
    
    primerSeleccionado = "";
    segundoSeleccionado = "";
    contador = 0;

    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(seleccionado =>{
        seleccionado.classList.remove("seleccionado");
    });

};

var contEliminados = function(){
    var eliminados = document.querySelectorAll(".eliminado").length + 2;
    if (eliminados === 2){
        ganador.classList.add("open");
        haganado = true;
        fin = true;
    }
}

var segundos = 90;

function reloj() {
    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2);
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);

    document.getElementById("reloj").innerHTML = mm + ":" + ss;

    if (haganado == true){ return;}

    if (segundos > 0){
        var t = setTimeout(function(){
            reloj();
        },1000);
        segundos--;
        // console.log(haganado);
        
    } else {
        perdedor.classList.add("open");
        // document.getElementById("game-over").innerHTML = "GAME OVER!";
        segundos = 10;

        var eliminados = document.querySelectorAll(".tarjeta");
        eliminados.forEach(eliminado => {
            eliminado.classList.add("eliminado");
        });
        fin = true;
    }
}

reloj();

// while (rejilla.firstChild){
//     rejilla.removeChild(rejilla.firstChild);
// }

// A introducir todo el bloque de código de creación de los elementos tarjeta en una función
// El objetivo es poder limpiar la rejilla y reordenar los Pokémon para poder volver a jugar
// sin tener que actualizar la página.

// Para parar la música:
// musica.pause();
// currentTime = 0;

// var reset = function(){
function reset(){

    segundos = 90;

    reiniciar = true;

    if (fin == true){
        fin = false;
        haganado = false;
        reloj();
    }

    while (rejilla.firstChild){
        rejilla.removeChild(rejilla.firstChild);
    }
    
    var doblePersonajes = arrayPersonajes.concat(arrayPersonajes)
    .sort(()=> 0.5 - Math.random());

    rejilla.setAttribute("class","rejilla");
    game.appendChild(rejilla);

    doblePersonajes.forEach(personaje => {
        const {nombre, rutaImagen} = personaje;
        tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.name = nombre;

        anverso = document.createElement("div");
        anverso.classList.add("anverso");

        reverso = document.createElement("div");
        reverso.classList.add("reverso");

        reverso.style.backgroundImage = `url(${rutaImagen})`

        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
    });

    perdedor.classList.remove("open");
    ganador.classList.remove("open");

}

boton = document.getElementById("reloj");
boton.addEventListener("click",reset);
