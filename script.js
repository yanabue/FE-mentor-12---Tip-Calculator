// Checks the bill + people input boxes if empty or not, returns true if empty
function inputboxEmpty(parentID) {
  const parentDiv = document.getElementById(parentID);
  const inputbox = parentDiv.querySelector("input");
  if (inputbox.value == "") {
    return true;
  }
}

// Makes sure only one tip value is selected at all times (last selected one) + returns the selected value
let tipPercent;
const tipButtonsDiv = document.querySelector(".tip-buttons");
tipButtonsDiv.addEventListener("click", setupTipSelection.bind(null));

function setupTipSelection(e) {
  if (e.target.tagName === "BUTTON") {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
    } else if (tipButtonsDiv.querySelector(".selected")) {
      tipButtonsDiv.querySelector(".selected").classList.remove("selected");
      e.target.classList.add("selected");
    } else {
      e.target.classList.add("selected");
    }
    tipPercent = e.target.innerText;
  } else if (e.target.tagName === "INPUT") {
    tipPercent = e.target.value;
    if (tipButtonsDiv.querySelector(".selected")) {
      tipButtonsDiv.querySelector(".selected").classList.remove("selected");
    }
    e.target.addEventListener("input", () => {
      tipPercent = e.target.value;
    });
    e.target.classList.add("selected");
  }

  return tipPercent;
}

// Gets the tip percent set by setupTipSelection() and checks if it has any value, returns true if empty
function tipInputEmpty() {
  //   (tipPercent);
  if (typeof tipPercent === "undefined" || tipPercent === "") {
    // ("tip undefined");
    return true;
  }
}

// Takes in any input value (from all 3 sections) and sterilizes the input before performing any tests and calculations
function formatInputNumber(inputValue) {
  let formattedNumber;

  if (inputValue.includes("-") || inputValue.includes("+")) {
    formattedNumber = "-";
    return formattedNumber; // Dashes/Plus signs are invalid and will be defined as error
  } else {
    if (inputValue.includes("%")) {
      // If user selected from tip buttons and not custom tip
      formattedNumber = inputValue.split("%").join("");
      formattedNumber = parseInt(inputValue);
    } else if (inputValue.includes(".")) {
      formattedNumber = parseFloat(inputValue);
    } else {
      formattedNumber = parseInt(inputValue);
    }
  }
  // Every kind of input will be turned into number value for next steps
  return formattedNumber;
}

// Sets up styling of DOM elements for invalid input
function setInputBoxError(parentID, errorMessage) {
  const parentE = document.getElementById(parentID);
  const label = parentE.querySelector("label");
  const inputBox = parentE.querySelector("input");

  inputBox.style.border = "1px solid red";
  const newErrorP = document.createElement("p");
  newErrorP.innerText = `${errorMessage}`;
  if (!label.parentElement.querySelector("p")) {
    label.after(newErrorP);
  }
}

// Clears any error styling if current input is valid
function clearError(parentID) {
  const parentE = document.getElementById(parentID);
  const label = parentE.querySelector("label");
  const inputBox = parentE.querySelector("input");

  inputBox.style.border = "0px";
  const p = label.parentElement.querySelector("p");
  if (p) {
    label.parentElement.removeChild(p);
  }
}

// Root function to test if any field is empty
function checkEmptyFields() {
  let isEmpty = true;

  if (inputboxEmpty("bill-input")) {
    setInputBoxError("bill-input", "Cant be empty");
    isEmpty = false;
  } else {
    clearError("bill-input");
  }

  if (inputboxEmpty("people-number-input")) {
    setInputBoxError("people-number-input", "Cant be empty");
    isEmpty = false;
  } else {
    clearError("people-number-input");
  }

  if (tipInputEmpty()) {
    setInputBoxError("tip-selection", "Cant be empty");
    isEmpty = false;
  } else {
    clearError("tip-selection");
  }

  return isEmpty;
}

// Checks if bill/people input values are invalid
function inputInvalid(parentID) {
  const parentDiv = document.getElementById(parentID);
  const inputbox = parentDiv.querySelector("input");
  let formattedNumber = formatInputNumber(inputbox.value);
  if (
    inputbox.value <= 0 || // Cant be negative
    isNaN(formattedNumber) ||
    (parentID === "people-number-input" && // People number can't be a float
      !Number.isInteger(formattedNumber) &&
      Number.isFinite(formattedNumber))
  ) {
    return true;
  } else {
    return false;
  }
}

// Checks if the formatted tipPercent is valid
function tipInvalid() {
  let formattedTip = formatInputNumber(tipPercent);
  if (formattedTip <= 0 || isNaN(formattedTip)) {
    return true;
  }
}

// Root function for validation of all field inputs
function validateFields() {
  let isValid = true;

  if (inputInvalid("bill-input")) {
    setInputBoxError("bill-input", "Invalid bill");
    isValid = false;
  } else {
    clearError("bill-input");
  }

  if (inputInvalid("people-number-input")) {
    setInputBoxError("people-number-input", "Invaid number of people");
    isValid = false;
  } else {
    clearError("people-number-input");
  }

  if (tipInvalid()) {
    setInputBoxError("tip-selection", "invalid tip");
    isValid = false;
  } else {
    clearError("tip-selection");
  }

  return isValid;
}

// Event listener function for calling all functions (validation -> calculation)
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkEmptyFields();
    validateFields();
    if (checkEmptyFields() !== false && validateFields() !== false) {
      calculateResult();
      updateResultinDOM();
      reset();
    }
  }
});

const billInputbox = document.getElementById("bill-inputbox");
const peopleInputbox = document.getElementById("people-inputbox");

// Calculates the desired results based on formatted numbers
function calculateResult() {
  let tipPercentFormatted = formatInputNumber(tipPercent);
  let billNumber = formatInputNumber(billInputbox.value);
  let peopleNumber = formatInputNumber(peopleInputbox.value);

  let tipAmountResult = (
    (billNumber * (tipPercentFormatted / 100)) /
    peopleNumber
  ).toFixed(2);
  tipAmountResult;
  let totalResult = (
    (billNumber + billNumber * (tipPercentFormatted / 100)) /
    peopleNumber
  ).toFixed(2);
  totalResult;
  return [tipAmountResult, totalResult];
}

const tipResultElement = document.getElementById("tip-variable-number");
const totalResultElement = document.getElementById("total-variable-number");

// Calls both calculation function and animation function
function updateResultinDOM() {
  animateValue(tipResultElement, calculateResult()[0]);
  animateValue(totalResultElement, calculateResult()[1]);
}

// Animates the counter going up after calculating the results
async function animateValue(DOMElement, targetValue) {
  const speed = 200;
  let value = 0;
  const increment = targetValue / speed;
  while (value < targetValue) {
    value += increment;
    DOMElement.innerText = value.toFixed(2);
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  DOMElement.innerText = targetValue;
}

const resetButton = document.getElementById("reset-button");
const customTip = document.getElementById("custom-inputbox");

// Resets all values and DOM elements to start position
function reset() {
  resetButton.classList.add("calculated");
  resetButton.classList.remove("reset-button");

  resetButton.addEventListener("click", () => {
    tipResultElement.innerText = "0.00";
    totalResultElement.innerText = "0.00";
    billInputbox.value = "";
    peopleInputbox.value = "";
    if (tipButtonsDiv.querySelector(".selected")) {
      tipButtonsDiv.querySelector(".selected").classList.remove("selected");
    }
    customTip.value = "";
    tipPercent = null;
    resetButton.classList.remove("calculated");
    resetButton.classList.add("reset-button");
  });
}
