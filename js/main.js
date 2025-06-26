// Planteamiento 1
/* const $DISPLAY = document.querySelector(".display"),
  $NUMBERS = document.querySelectorAll(".number"),
  $OPERATIONS = document.querySelectorAll(".operation"),
  $DECIMAL_POINT = document.getElementById("decimal-point"),
  $EQUAL = document.getElementById("equal"),
  $CLEAR = document.getElementById("clear"),
  $DELETE = document.getElementById("delete");

console.log(
  $DISPLAY,
  $NUMBERS,
  $OPERATIONS,
  $DECIMAL_POINT,
  $EQUAL,
  $CLEAR,
  $DELETE
  ); */

// Planteamiento 2
function Calculadora(
  display,
  numbers,
  operations,
  decimalPoint,
  equal,
  clear,
  del
) {
  /*   const $DISPLAY = document.querySelector(display),
    $NUMBERS = document.querySelectorAll(numbers),
    $OPERATIONS = document.querySelectorAll(operations),
    $DECIMAL_POINT = document.getElementById(decimalPoint),
    $EQUAL = document.getElementById(equal),
    $CLEAR = document.getElementById(clear),
    $DELETE = document.getElementById(del); */

  document.addEventListener("click", (e) => {
    //Realiza operación
    if (e.target.matches(numbers)) {
      console.log(e);
      console.log(e.type);
      console.log(e.target);
      console.log(e.value);
    }

    //Limpiar display
    if (e.target.matches(clear)) {
      console.log("Limpiar display");
    }

    //Eliminar dígitos del display
    if (e.target.matches(del)) {
      console.log("Eliminar dígitos");
    }
  });
}

document.addEventListener(
  "DOMContentLoaded",
  Calculadora(
    ".display",
    ".number",
    ".operation",
    "#decimal-point",
    "#equal",
    "#clear",
    "#delete"
  )
);
