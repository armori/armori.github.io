const arrayPersonajes = [
    {
        nombre: "abra",
        rutaImagen: "img/abra.png"
    },
    {
        nombre: "bullbasaur",
        rutaImagen: "img/bullbasaur.png"
    },
    {
        nombre: "charmander",
        rutaImagen: "img/charmander.png"
    },
    {
        nombre: "dratini",
        rutaImagen: "img/dratini.png"
    },
    {
        nombre: "eevee",
        rutaImagen: "img/eevee.png"
    },
    {
        nombre: "jigglypuff",
        rutaImagen: "img/jigglypuff.png"
    },
    {
        nombre: "mankey",
        rutaImagen: "img/mankey.png"
    },
    {
        nombre: "meowth",
        rutaImagen: "img/meowth.png"
    },
    {
        nombre: "pidgey",
        rutaImagen: "img/pidgey.png"
    },
    {
        nombre: "pikachu-2",
        rutaImagen: "img/pikachu-2.png"
    },
    {
        nombre: "psyduck",
        rutaImagen: "img/psyduck.png"
    },
    {
        nombre: "squirtle",
        rutaImagen: "img/squirtle.png"
    } 
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const ganador = document.getElementById("ganador");

const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(()=> 0.5 - Math.random());

var contador = 0;
var primerSeleccionado = "";
var segundoSeleccionado = "";
var selPrevio = null;


rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

doblePersonajes.forEach(personaje => {
    const { nombre, rutaImagen } = personaje;
    tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.dataset.name = nombre;

    anverso = document.createElement("div");
    anverso.classList.add("anverso");

    reverso = document.createElement("div");
    reverso.classList.add("reverso");
    reverso.style.backgroundImage = `url(${rutaImagen})`;

    rejilla.appendChild(tarjeta);
    tarjeta.appendChild(anverso);
    tarjeta.appendChild(reverso);
});

rejilla.addEventListener("click", function(evento){
    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" || 
        seleccionado.parentNode === selPrevio ||
        seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    }

    if (contador < 2) {
        contador++;
        if (contador === 1) {
            primerSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
            selPrevio = seleccionado.parentNode;
        } else {
            segundoSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        }

        if (primerSeleccionado !== "" && segundoSeleccionado !== "") {
            if (primerSeleccionado === segundoSeleccionado) {
                setTimeout(eliminar, 1200);
                setTimeout(resetSelec, 1200);
                contEliminados();
            } else {
                setTimeout(resetSelec, 1200);
                selPrevio = null;
            }
        } 
        // selPrevio = seleccionado.parentNode;
    }
});

var eliminar = function () {
    var eliminados = document.querySelectorAll(".seleccionado");

    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado");
    });
}

var resetSelec = function () {
    primerSeleccionado = "";
    segundoSeleccionado = "";
    contador = 0;

    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(seleccionado => {
        seleccionado.classList.remove("seleccionado");
    });
}

var contEliminados = function () {
    var eliminados = document.querySelectorAll(".eliminado").length + 2;
    if (eliminados === 24) {
        ganador.classList.add("open");
    }
}


