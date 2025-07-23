// Variables que almacenan elementos del DOM
const $DISPLAY = document.querySelector(".display"),
  $CALCULADORA = document.querySelector(".container-keys");

// Variables globales de estado
let currentNumber = "0", // Almacena número actual
  previousNumber = null, // Almacena número anterior
  operator = null, // Almacena operador seleccionado
  waitForSecondOperator = false;

// Función que realiza la operación
const calculate = (previousNumber, operator, currentNumber) => {
  let numberOne = parseFloat(previousNumber),
    numberTwo = parseFloat(currentNumber);

  switch (operator) {
    case "+":
      return numberOne + numberTwo;

    case "-":
      return numberOne - numberTwo;

    case "*":
      return numberOne * numberTwo;

    case "/":
      return numberOne / numberTwo;
  }
};

// Función que actualiza la variable del DOM $DISPLAY
const updateDisplay = (currentNumber) => {
  $DISPLAY.textContent = currentNumber;
};

updateDisplay(currentNumber); // Muestra el 0 en pantalla desde un inicio

// Delegación de Eventos
$CALCULADORA.addEventListener("click", (e) => {
  //Variables que almacenan selectores validos que les aplico el evento "click"
  const NUMBERS = e.target.matches(".number"),
    OPERATIONS = e.target.matches(".operation"),
    EQUAL = e.target.matches(".equal"),
    CLEAR = e.target.matches(".clear"),
    DELETE = e.target.matches(".delete");

  if (NUMBERS) {
    const value = e.target.dataset.value; // Variable que obtiene el valor del dataAttribute

    // Validación - Manipulación de un solo punto
    if (value === "." && currentNumber.includes(".")) {
      return; // Si es un punto y ya existe uno, sal de la función
    }

    if (waitForSecondOperator) {
      currentNumber = value;
      waitForSecondOperator = false;
    } else if (currentNumber === "0" && value !== ".") {
      currentNumber = value; // Reemplaza el "0" inicial si no es un punto
    } else {
      currentNumber += value; // Concatena varios valores
    }
    updateDisplay(currentNumber);
  }

  if (OPERATIONS) {
    if (
      previousNumber !== null &&
      operator !== null &&
      !waitForSecondOperator
    ) {
      currentNumber = calculate(previousNumber, operator, currentNumber); // Llama a tu función de cálculo aquí y actualiza currentNumber con el resultado
      updateDisplay(currentNumber);
    }

    previousNumber = currentNumber; // El número actual se convierte en el anterior
    operator = e.target.dataset.operator; // Guarda el nuevo operador
    waitForSecondOperator = true; // Prepara para el siguiente número
    // No actualices la pantalla aquí con el operador, la pantalla sigue mostrando previousNumber hasta que se ingrese el siguiente número
  }

  // * Programar lógica de EQUAL "="
  /* if (EQUAL) {
    if (previousNumber && operator) {
      currentNumber = calculate();
      previousNumber = null;
      operator = null;
      waitForSecondOperator = true;
    }
  } */

  // Limpia (reinicia) los valores a su estado inicial
  if (CLEAR) {
    currentNumber = "0";
    previousNumber = null;
    operator = null;
    waitForSecondOperator = false;
    updateDisplay(currentNumber);
  }

  // * Programar lógica de DELETE "<="
  // if(DELETE){}
});
