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
function setupTipSelection() {
    const tipButtonsDiv = document.querySelector(".tip-buttons");
    tipButtonsDiv.addEventListener("click", (e) => {
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
            if (tipButtonsDiv.querySelector(".selected")) {
                tipButtonsDiv.querySelector(".selected").classList.remove("selected");
            }
            e.target.addEventListener('input', () => {
                tipPercent = e.target.value;
            })
        }
    });
    return tipPercent;
}
setupTipSelection();

function tipInputEmpty() {
    const tipPercentInput = setupTipSelection();
    console.log(tipPercentInput)
    if (tipPercentInput === undefined) {
        console.log("tip undefined");
        return true;
    } else {
        console.log("tip defined");
    }
}

function setInputBoxError(parentID, errorMessage) {
    const parentE = document.getElementById(parentID);
    const label = parentE.querySelector("label");
    const inputBox = parentE.querySelector("input");
    
    inputBox.style.border = "1px solid red";
    const newErrorP = document.createElement("p");
    newErrorP.innerText = `${errorMessage}`;
    if (!label.parentElement.querySelector('p')){
        label.after(newErrorP);
    }
}

function clearError(parentID) {
    const parentE = document.getElementById(parentID);
    const label = parentE.querySelector("label");
    const inputBox = parentE.querySelector("input");
    
    inputBox.style.border = "0px";
    const p = label.parentElement.querySelector("p");
    if (p){
        console.log(p);
        label.parentElement.removeChild(p);
    }
}

// same
function validateBill() {}
function validateTip() {}
function validatePeople() {}

function calculateResult() {}
function updateResult() {}
function reset() {}



function checkEmptyFields() {
    if (inputboxEmpty("bill-input")) {
        setInputBoxError("bill-input", "Cant be empty");
    } else {
        clearError("bill-input");
    }
    
    if (inputboxEmpty("people-number-input")) {
        setInputBoxError("people-number-input", "Cant be empty");
    } else {
        clearError("people-number-input");
    }
    
    if (tipInputEmpty()) {
        setInputBoxError("tip-selection", "Cant be empty");
    } else {
        clearError("tip-selection");
    }
    // setupTipSelection();
}


window.addEventListener('keydown', (e) => {
    if (e.key === "Enter"){
        checkEmptyFields();
        setupTipSelection();

    }
})