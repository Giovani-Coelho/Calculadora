"use strict"

const display = document.querySelector("#display")
const number = document.querySelectorAll("[id*=tecla]")
const operadors = document.querySelectorAll("[id*=operador]")
// 
let newNumber = true
let operador = undefined
let previousNumber = undefined
// 
const existOperador = () => operador !== undefined
// 
const calculate = () => {
  if (existOperador()) {
    newNumber = true
    let currentNumber = parseFloat(display.textContent.replace(",", "."))
    let result
    switch (operador) {
      case "-":
        result = previousNumber - currentNumber
        break
      case "+":
        result = previousNumber + currentNumber
        break
      case "*":
        result = previousNumber * currentNumber
        break
      case "/":
        result = previousNumber / currentNumber
        break
    }
    updateDisplay(result)
  }
}

const selectOperador = (opera) => {
  if (!newNumber) {
    calculate()
    newNumber = true
    operador = opera.target.textContent
    previousNumber = parseFloat(display.textContent.replace(",", "."))
  }
}

const selectNumber = (event) => updateDisplay(event.target.textContent)

const updateDisplay = (event) => {
  if (newNumber) {
    display.textContent = event
    newNumber = false
  } else {
    display.textContent += event
  }
}

document.querySelector("#limparDisplay").addEventListener("click", () => {
  display.textContent = ""
  operador = undefined
})

document.querySelector("#backspace").addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1)
})

document.querySelector("#inverter").addEventListener("click", () => {
  display.textContent = display.textContent * -1
})

const existDecimal = () => display.textContent.indexOf(",") !== -1
const existContent = () => display.textContent.length > 0
const insertDecimal = () => {
  if (!existDecimal()) {
    if (existContent()) {
      updateDisplay(",")
    } else {
      updateDisplay("0,")
    }
  }
}

document.querySelector("#decimal").addEventListener("click", insertDecimal)

number.forEach((event) => event.addEventListener("click", selectNumber))
operadors.forEach((event) => event.addEventListener("click", selectOperador))
document.querySelector("#igual").addEventListener("click", () => {
  calculate()
   operador = undefined
})

