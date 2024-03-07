// check if all input parts have input
// if not - show error
// if theres input check vif input valid
// if not - show another error
// once input is ok calculate the results according to input
// allow reset button to reset program

// all work on input
// except validation that works on 'sumbitting' (enterkey listener)

function inputboxEmpty(parentID) {
  const parentDiv = document.getElementById(parentID);
  const inputbox = parentDiv.querySelector("input");
  if (inputbox.value == "") {
    return true;
  }
}

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
    // (tipPercent)
    e.target.classList.add("selected");
  }

  return tipPercent;
}

function tipInputEmpty() {
  //   (tipPercent);
  if (typeof tipPercent === "undefined" || tipPercent === "") {
    // ("tip undefined");
    return true;
  } else {
    // ("tip defined");
  }
}

function formatInputNumber(inputValue) {
  let formattedNumber;

  if (inputValue.includes("-") || inputValue.includes("+")) {
    formattedNumber = "-";
    return formattedNumber;
  } else {
    if (inputValue.includes("%")) {
      formattedNumber = inputValue.split("%").join("");
      formattedNumber = parseInt(inputValue);
    } else if (inputValue.includes(".")) {
      formattedNumber = parseFloat(inputValue);
    } else {
      formattedNumber = parseInt(inputValue);
    }
  }

  return formattedNumber;
}

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

function checkEmptyFields() {
  let isValid = true;

  if (inputboxEmpty("bill-input")) {
    setInputBoxError("bill-input", "Cant be empty");
    isValid = false;
  } else {
    clearError("bill-input");
  }

  if (inputboxEmpty("people-number-input")) {
    setInputBoxError("people-number-input", "Cant be empty");
    isValid = false;
  } else {
    clearError("people-number-input");
  }

  if (tipInputEmpty()) {
    setInputBoxError("tip-selection", "Cant be empty");
    isValid = false;
  } else {
    clearError("tip-selection");
  }

  return isValid;
}

function inputInvalid(parentID) {
  const parentDiv = document.getElementById(parentID);
  const inputbox = parentDiv.querySelector("input");
  let formattedNumber = formatInputNumber(inputbox.value);
  //   if (parentID === 'people-number-input'){

  //       (Number.isInteger(formattedNumber))
  //   }
  if (
    inputbox.value <= 0 ||
    isNaN(formattedNumber) ||
    (parentID === "people-number-input" &&
      !Number.isInteger(formattedNumber) &&
      Number.isFinite(formattedNumber))
  ) {
    return true;
  } else {
    return false;
  }
}

function tipInvalid() {
  let formattedTip = formatInputNumber(tipPercent);
  if (formattedTip <= 0 || isNaN(formattedTip)) {
    return true;
  }
}

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

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkEmptyFields();
    validateFields();
    if (checkEmptyFields() !== false && validateFields() !== false) {
      calculateResult();
      (calculateResult());
      updateResultinDOM();
      reset();
    } else {
      ("error");
    }
  }
});

const billInputbox = document.getElementById("bill-inputbox");
const peopleInputbox = document.getElementById("people-inputbox");

function calculateResult() {
  ("calulating result");
  let tipPercentFormatted = formatInputNumber(tipPercent);
  let billNumber = formatInputNumber(billInputbox.value);
  let peopleNumber = formatInputNumber(peopleInputbox.value);

  let tipAmountResult = (
    (billNumber * (tipPercentFormatted / 100)) /
    peopleNumber
  ).toFixed(2);
  (tipAmountResult);
  let totalResult = (
    (billNumber + billNumber * (tipPercentFormatted / 100)) /
    peopleNumber
  ).toFixed(2);
  (totalResult);
  return [tipAmountResult, totalResult];
}

const tipResultElement = document.getElementById("tip-variable-number");
const totalResultElement = document.getElementById("total-variable-number");

function updateResultinDOM() {
animateValue(calculateResult()[0])
  totalResultElement.innerText = calculateResult()[1];
}

const resetButton = document.getElementById("reset-button");
const customTip = document.getElementById("custom-inputbox");

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


async function animateValue(targetValue) {
    let value = 0;

    let i = 1;
    while ((targetValue / i) > 10) {
        value = Math.random() * targetValue * i;
        tipResultElement.innerText = value.toFixed(2);
        tipResultElement.innerText = targetValue.fixed(2);
        i *= 10;
        await new Promise(resolve => setTimeout(resolve, 10000000000000));
    }
}