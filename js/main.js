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
let currentNumber = "0", // Almacena número actual
  previousNumber = null, // Almacena número anterior
  operator = null, // Almacena operador seleccionado
  waitForSecondOperator = false;

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

// Función que actualiza la variable del DOM $DISPLAY
const updateDisplay = (currentNumber) => {
  $DISPLAY.textContent = currentNumber;
};

// Delegación de Eventos
$CALCULADORA.addEventListener("click", (e) => {
  //Variables que almacenan selectores validos que les aplico el evento "click"
  const NUMBERS = e.target.matches(".number"),
    OPERATIONS = e.target.matches(".operation"),
    // DECIMAL_POINT = e.target.matches(".decimal"),
    EQUAL = e.target.matches(".equal"),
    CLEAR = e.target.matches(".clear"),
    DELETE = e.target.matches(".delete");

  console.log(currentNumber);

  if (NUMBERS) {
    const value = e.target.dataset.value; // Variable que obtiene el valor del dataAttribute
    if (waitForSecondOperator) {
      currentNumber = value;
      console.log(currentNumber);
      waitForSecondOperator = false;
    } else if (currentNumber === "0" && value !== ".") {
      currentNumber = value; // Reemplaza el "0" inicial si no es un punto
      console.log(currentNumber);
    } else {
      currentNumber += value; // Concatena varios valores
      console.log(currentNumber);
    }
    updateDisplay(currentNumber);
  }

  if (OPERATIONS) {
    if (
      previousNumber !== null &&
      operator !== null &&
      !waitForSecondOperator
    ) {
      // * Si ya hay un cálculo pendiente, resuélvelo primero
      currentNumber = calculate(currentNumber, operator, previousNumber); // Llama a tu función de cálculo aquí y actualiza currentNumber con el resultado
      updateDisplay(currentNumber);
    }
    previousNumber = currentNumber; // El número actual se convierte en el anterior
    operator = e.target.dataset.operator; // Guarda el nuevo operador
    waitForSecondOperator = true; // Prepara para el siguiente número
    // No actualices la pantalla aquí con el operador, la pantalla sigue mostrando previousNumber hasta que se ingrese el siguiente número
  }
});
