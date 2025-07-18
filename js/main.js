/* 
clearScreen();

deleteLastDigit();

addNumber(digit);

selectOperator(op);

calculate();

updateScreen(); */

// Variables que almacenan elementos del DOM
const $DISPLAY = document.querySelector(".display"),
  $CALCULADORA = document.querySelector(".container-keys");

// Variables globales de estado
let currentNumber = null, // Almacena número actual
  previousNumber = null, // Almacena número anterior
  operator = null, // Almacena operador seleccionado
  result = null, // Resultado de la operación
  waitForSecondOperator = false;
//resetScreen = false, // Un booleano que te indicará si la pantalla debe limpiarse antes de mostrar el siguiente número (útil después de un operador o de calcular un resultado).

// Función que actualiza la variable del DOM $DISPLAY
const updateDisplay = (currentNumber) => {
  $DISPLAY.textContent = currentNumber;
};

// Delegación de Eventos
$CALCULADORA.addEventListener("click", (e) => {
  //Variables que almacenan selectores validos que les aplico el evento "click"
  const NUMBERS = e.target.matches(".number"),
    OPERATIONS = e.target.matches(".operation"),
    DECIMAL_POINT = e.target.matches(".decimal"),
    EQUAL = e.target.matches(".equal"),
    CLEAR = e.target.matches(".clear"),
    DELETE = e.target.matches(".delete");

  console.log(currentNumber);

  // * Programar lógica manejo de eventos

  if (NUMBERS && !waitForSecondOperator) {
    currentNumber = e.target.dataset.value;
    waitForSecondOperator = false;
    console.log(currentNumber);
    updateDisplay(currentNumber);
  }
});

/* 
// ? Implementar posteriormente
  // Lógica de la operación
  const calculate = (numberOne, operator, numberTwo) => {
    switch (operator) {
      case "+":
// Los parámetros que traen los números en formato String, los vamos a convertir a Numbers.
        break;
      case "-":
        break;
      case "*":
        break;
      case "/":
        break;
    }
  };

  calculate(currentNumber, operator, previousNumber);
 */
