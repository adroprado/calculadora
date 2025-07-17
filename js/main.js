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
  resetScreen = false; // Un booleano que te indicará si la pantalla debe limpiarse antes de mostrar el siguiente número (útil después de un operador o de calcular un resultado).

// Delegación de Eventos
$CALCULADORA.addEventListener("click", (e) => {
  //Variables que almacenan selectores validos que les aplico el evento "click"
  const NUMBERS = e.target.matches(".number"),
    OPERATIONS = e.target.matches(".operation"),
    DECIMAL_POINT = e.target.matches("#decimal-point"),
    EQUAL = e.target.matches("#equal"),
    CLEAR = e.target.matches("#clear"),
    DELETE = e.target.matches("#delete");

  // ! Corroborar las siguientes líneas de código.
  // Pasando el valor de la etiqueta HTML button(number) como valor a la variable "currentNumber"
  if (NUMBERS) {
    currentNumber = e.target.textContent;
    console.log(currentNumber, typeof currentNumber);
  }

  // Pasando el valor de la etiqueta HTML button(operation) como valor a la variable "operator"
  if (OPERATIONS) {
    operator = e.target.textContent;
    console.log(operator, typeof operator);
  }

  // Mostrando contenido en la variable del DOM $DISPLAY
  const updateDisplay = (currentNumber) => {
    $DISPLAY.textContent = currentNumber;
  };
  updateDisplay(currentNumber);

  // * Mostrar a la IA mi avnce del proyecto
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
