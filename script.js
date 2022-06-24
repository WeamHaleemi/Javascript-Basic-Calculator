function calculate(operand1, operand2, operation) {
  let computation;
  if (operand2 == 0 && operation == "÷") {
    alert("Cannot devide over zero");
    numbers.splice(0, numbers.length);
    operators.splice(0, operators.length);
    return;
  }
  switch (operation) {
    case "+":
      computation = operand1 + operand2;
      break;
    case "-":
      computation = operand1 - operand2;
      break;
    case "*":
      computation = operand1 * operand2;
      break;
    case "÷":
      computation = operand1 / operand2;
      break;
    default:
      return;
  }
  if(computation !=undefined) return parseFloat(computation.toFixed(3));
}

let numberHandler = (event) => {
  let str;
  //inside if we wont parse cz its a dot
  if (event.target.innerHTML == ".") {
    str = ".";
    currentnum += str;
  }
  //here we parse because it is a number
  else {
    let number = parseFloat(event.target.innerHTML);
    str = "" + number;
    currentnum += str;
  }
  console.log(currentnum);
  display.innerHTML += str;
};
let operationHandler = (event) => {
  let operation = event.target.innerHTML;
  if (currentnum != "") {
    numbers.push(parseFloat(currentnum));
  }
  operators.push(operation);
  currentnum = "";
  display.innerHTML += operation + " ";
};

let equalHandler = () => {
  if (currentnum != "") {
    numbers.push(parseFloat(currentnum));
    console.log(parseFloat(currentnum));
  }
  if (numbers.length == 1) {
    display.innerHTML = numbers[0].toFixed(3) + "";
    currentnum = "";
    return;
  }
  currentnum = "";
  let answer;
  for (; numbers[0] != undefined; ) {
    let operand1 = numbers[0];
    let operand2 = numbers[1];
    if (operand2 == undefined || operand1 == undefined) break;
    let operation = operators[0];
    answer = calculate(operand1, operand2, operation);
    if (answer != undefined) {
      numbers.splice(0, 2);
      numbers.unshift(answer);
      operators.shift();
    }
  }
  if (answer != undefined) {
    display.innerHTML = answer + " ";
  }
  numbers.splice(0, numbers.length);
  operators.splice(0, operators.length);
  numbers.push(answer);
  currentnum = "";

  console.log(numbers);
  console.log(operators);
};
let currentnum = "";
//defining number stack and operator stack
const numbers = [];
const operators = [];
//getting DOM
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const display = document.querySelector(".display");
console.log(display);
const clear = document.querySelector("[data-clear]");
const equal = document.querySelector("[data-equal]");

numberButtons.forEach((number) =>
  number.addEventListener("click", numberHandler.bind(number.innerText))
);
operationButtons.forEach((operation) =>
  operation.addEventListener(
    "click",
    operationHandler.bind(operation.innerText)
  )
);

equal.addEventListener("click", equalHandler);
clear.addEventListener("click", () => {
  currentnum = "";
  numbers.splice(0, numbers.length);
  operators.splice(0, operators.length);
  display.innerHTML = "";
  console.log(numbers);
  console.log(operators);
});
