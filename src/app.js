/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here

  let mazo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let pintas = ["♠", "♥", "♣", "♦"];
  let cartasGeneradas = [];
  let cartasOrdenadas = [];
  const letraPorNumero = x =>
    x === 1 ? "A" : x === 11 ? "J" : x === 12 ? "Q" : x === 13 ? "K" : x;

  let cardContainer = document.getElementById("CardContainer");
  let orderCard = document.getElementById("orderCard");

  const crearCarta = (num, vira) => {
    let card = document.createElement("div");
    card.classList.add("card", "mt-3", "p-1", "text-center", "me-2");
    let arriba = document.createElement("p");
    arriba.setAttribute("class", "position-absolute top-0");
    arriba.style.color =
      pintas[vira] === "♥" || pintas[vira] === "♦" ? "red" : "black";
    arriba.textContent = pintas[vira];
    card.appendChild(arriba);
    let numero = document.createElement("p");
    numero.textContent = letraPorNumero(num);
    card.appendChild(numero);
    let abajo = document.createElement("p");
    abajo.setAttribute("class", "position-absolute bottom-0 end-0 mx-3 my-1");
    abajo.style.color =
      pintas[vira] === "♥" || pintas[vira] === "♦" ? "red" : "black";
    abajo.textContent = pintas[vira];
    card.appendChild(abajo);
    return card;
  };

  const generarCartas = num => {
    const div = document.createElement("div");
    div.setAttribute("class", "d-flex");
    for (let index = 0; index < num; index++) {
      let random = Math.floor(Math.random() * mazo.length);
      let roll = Math.floor(Math.random() * pintas.length);
      const carta = { num: random + 1, vira: roll };
      cartasGeneradas.push(carta);
      div.appendChild(crearCarta(random + 1, roll));
    }
    cardContainer.appendChild(div);
    console.log(cartasGeneradas);
  };

  const numeroCartas = document.getElementById("numerosGenerados");
  const btn = document.getElementById("generar");

  btn.addEventListener("click", function() {
    if (cartasGeneradas.length > 0) {
      while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
      while (orderCard.firstChild) {
        orderCard.removeChild(orderCard.firstChild);
      }
      cartasGeneradas = [];
      cartasOrdenadas = [];
    }
    generarCartas(numeroCartas.value);
    const formulario = document.getElementById("form");
    formulario.reset();
  });

  const bubbleSort = arr => {
    let wall = arr.length - 1; //iniciamos el wall o muro al final del array
    while (wall > 0) {
      let index = 0;
      while (index < wall) {
        //comparar las posiciones adyacentes, si la correcta es más grande, tenemos que intercambiar
        if (arr[index].num > arr[index + 1].num) {
          let aux = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = aux;
          cartasOrdenadas.push([...arr]);
        }
        index++;
      }
      wall--; //disminuir la pared para optimizar
    }
    console.log(cartasOrdenadas);
    return arr;
  };

  const mostrarCartasOrdenadas = () => {
    for (let i = 0; i < cartasOrdenadas.length; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "col-12 d-flex");
      for (let x = 0; x < cartasOrdenadas[i].length; x++) {
        div.appendChild(
          crearCarta(cartasOrdenadas[i][x].num, cartasOrdenadas[i][x].vira)
        );
      }
      orderCard.appendChild(div);
    }
  };

  const buttom = document.getElementById("ordenar");

  buttom.addEventListener("click", function() {
    if (cartasOrdenadas.length > 0) {
      while (orderCard.firstChild) {
        orderCard.removeChild(orderCard.firstChild);
      }
      const title = document.createElement("h5");
      title.textContent = "cartas ordenadas";
      orderCard.appendChild(title);
    }

    bubbleSort(cartasGeneradas);
    mostrarCartasOrdenadas();
    const formulario = document.getElementById("form");
    formulario.reset();
  });
};
