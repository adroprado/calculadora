// ===========================================
// Variables que almacenan elementos del DOM
// ===========================================
const $DISPLAY = document.querySelector(".display"),
  $CALCULADORA = document.querySelector(".container-keys");

// ===========================================
// Variables globales de estado
// ===========================================
let currentNumber = "0", // Almacena número actual
  previousNumber = null, // Almacena número anterior
  operator = null, // Almacena operador seleccionado
  waitForSecondOperator = false; // Bandera booleana que indica si la calculadora está esperando que el usuario ingrese el segundo operando de una operación. `true` significa que el siguiente número debe reemplazar `currentNumber`,`false` significa que debe concatenar

// ===========================================
// Función de lógica de operación
// ===========================================
const calculate = (previousNumber, operator, currentNumber) => {
  let numberOne = parseFloat(previousNumber),
    numberTwo = parseFloat(currentNumber),
    result;

  const DECIMAL_LIMIT = 6;

  switch (operator) {
    case "+":
      result = numberOne + numberTwo;
      break;

    case "-":
      result = numberOne - numberTwo;

      break;
    case "*":
      result = numberOne * numberTwo;
      break;

    case "/":
      if (numberTwo === 0) {
        // Mensaje de "error", si el usuario realiza división entre cero.
        return ($DISPLAY.textContent = "Error ");
      } else {
        // De lo contrario que realicé la operación, mostrando un máximo de 6 decimales

        result = numberOne / numberTwo;
      }
      break;
    default:
      // En caso de un operador no reconocido, no se realiza ninguna acción
      // o se devuelve el segundo número, dependiendo del comportamiento deseado.
      // Para esta calculadora, el flujo de eventos asegura un operador válido.
      return currentNumber; // Retorna el número actual sin cambios si el operador no es reconocido
  }

  // --- Lógica para truncar decimales ---
  // Si el resultado es un número de punto flotante y tiene más de DECIMAL_LIMIT decimales,
  // se trunca sin redondear.
  if (result !== Math.trunc(result)) {
    // Comprueba si el número es decimal
    const factor = Math.pow(10, DECIMAL_LIMIT);
    result = Math.trunc(result * factor) / factor;
  }

  return result.toString(); // Devuelve el resultado como una cadena para que el display lo muestre.
};

// ===========================================
// Función que actualiza la variable del DOM
// ===========================================
const updateDisplay = (currentNumber) => {
  // Actualizael contenido de la pantalla de la calculadora
  $DISPLAY.textContent = currentNumber;
};

updateDisplay(currentNumber); // Muestra el valor de 0 en pantalla desde un inicio

// ===========================================
// Función que maneja las entradas de Click y Teclado
// ===========================================
const handleInput = (value, type) => {
  // Validando el valor del type, si, coincide con la clase que presionamos
  // --- Lógica para Botones Numéricos (0-9, .) ---
  if (type === "number") {
    // Previene la adición de múltiples puntos decimales en el mismo número.
    if (value === "." && currentNumber.includes(".")) {
      return; // Sale de la función si ya hay un punto
    }

    // Si `waitForSecondOperator` es true (después de un operador o un '='),
    // el nuevo número reemplaza el `currentNumber`.
    if (waitForSecondOperator) {
      currentNumber = value;
      waitForSecondOperator = false; // Reseteamos a su valor inicial
    } else if (currentNumber === "0" && value !== ".") {
      // Si `currentNumber` es "0" (estado inicial) y el dígito no es un punto,
      // reemplaza el "0" para evitar números como "07".
      currentNumber = value;
    } else {
      // Para cualquier otro dígito, se concatena al `currentNumber`.
      currentNumber += value; // Concatena varios valores
    }
    updateDisplay(currentNumber); // Actualizamos la pantalla con el número construido
  }

  // --- Lógica para Botones de Operación (+, -, *, /) ---
  if (type === "operation") {
    // Si ya existe un `previousNumber` y un `operator` (y ya se ingresó el segundo número),
    // significa que el usuario quiere encadenar operaciones. Se calcula el resultado intermedio.

    if (
      previousNumber !== null &&
      operator !== null &&
      !waitForSecondOperator
    ) {
      currentNumber = calculate(previousNumber, operator, currentNumber);
      updateDisplay(currentNumber); // Muestra el resultado intermedio
    }

    previousNumber = currentNumber; // El resultado actual se convierte en el `previousNumber` para la siguiente operación.
    operator = value; // Almacena el nuevo operador seleccionado.
    waitForSecondOperator = true; // Activa la bandera para esperar el segundo operando.
    // La pantalla sigue mostrando `previousNumber` (o el resultado intermedio) hasta que se ingrese el siguiente número.
  }

  // --- Lógica para el Botón Igual (=) ---
  if (type === "equal") {
    // Solo realiza el cálculo si hay un `previousNumber` y un `operator` definidos.
    if (previousNumber && operator) {
      currentNumber = calculate(previousNumber, operator, currentNumber); // Realiza el cálculo final.
      previousNumber = null; // Reiniciamos para nueva operación
      operator = null; // Reiniciamos el operador
      waitForSecondOperator = true; //Prepara para que el siguiente número inicie un nuevo calculo
      updateDisplay(currentNumber); // Muestra ek resultado final
    }
  }

  // --- Lógica para el Botón Limpiar (C) ---
  if (type === "clear") {
    currentNumber = "0"; // Reiniciamosel número actual a 0
    previousNumber = null; // Elimina el número anterior
    operator = null; // Elimina el operador
    waitForSecondOperator = false; // Reinicia la bandera
    updateDisplay(currentNumber); //Actualiza la pantalla
  }

  // --- Lógica para el Botón Borrar (&#8678; <=) ---
  if (type === "delete") {
    // Si el número actual tiene más de un dígito, elimina el último carácter
    if (currentNumber.length > 1) {
      currentNumber = currentNumber.slice(0, -1);
    } else {
      // Si el número tiene un solo dígito o ya está vacío, lo establece en "0".
      // Esta condición manejará ambos casos: si queda 1 dígito y lo borras, o si ya estaba vacío
      currentNumber = "0";
    }

    updateDisplay(currentNumber); // Actualiza la pantalla con el número modificado
  }
};

// ===========================================
// Delegación de Eventos + Evento "click" (Interacción del Usuario)
// ===========================================
$CALCULADORA.addEventListener("click", (e) => {
  // Variables que identifica el tipo de botón clickeado usando sus clases. Esto ayuda a dirigir el flujo de la lógica.
  const NUMBERS = e.target.matches(".number"),
    OPERATIONS = e.target.matches(".operation"),
    EQUAL = e.target.matches(".equal"),
    CLEAR = e.target.matches(".clear"),
    DELETE = e.target.matches(".delete");

  // --- Validación y Llamado a la función "handleInput", pasandole el valor y el típo de valor que es, gracias a la clase ---
  if (NUMBERS) handleInput(e.target.dataset.value, "number");
  if (OPERATIONS) handleInput(e.target.dataset.operator, "operation");
  if (EQUAL) handleInput(e.target.dataset.action, "equal");
  if (CLEAR) handleInput(e.target.dataset.action, "clear");
  if (DELETE) handleInput(e.target.dataset.action, "delete");
});

// ===========================================
// Delegación de Eventos + Evento "keyup" (Interacción del Usuario)
// ===========================================
document.addEventListener("keyup", (e) => {
  if (/[0-9]/.test(e.key) || e.key === ".") handleInput(e.key, "number");
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    handleInput(e.key, "operation");
  if (e.key === "Enter") handleInput(e.key, "equal");
  if (e.key === "Escape") handleInput(e.key, "clear");
  if (e.key === "Backspace") handleInput(e.key, "delete");
});

/*
Encadenamiento de Operaciones vs Igual "="

Pense que mi código tenía un Bug de programación. Ya que al realizar una operación y presionar cualquier operaador, este me daba el resultado, siendo quien debe de presentar el resultado debe ser el signo de "=". Esto se debe que programé mi código para que pueda realizar más de una operación, antes de que presiones el "=".

Si deseo que solamente el "=" sea el único que me pueda dar el resultado, tendría que reestringir el "Encadenamiento de Operaciones", ya que no puedes tener un encadenamiento y que solo sea el "=" quien presente el resultado.
 */
