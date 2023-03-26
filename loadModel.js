import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

let mushroomClass = document.getElementById("mushroomClass");
let mushroomClassButton = document.getElementById("mushroomClassButton");
let userInput = document.getElementById("userInput");


mushroomClassButton.addEventListener("click", (e) => {
  e.preventDefault();
  let value = mushroomClass.value == "" ? "please enter E or P" : mushroomClass.value
  loadSavedModel(value)
})

function loadSavedModel(value) {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model, value))
}

function modelLoaded(model, value) {
    console.log(model)
    let decisionTree = new DecisionTree(model)

    // test om te zien of het werkt
    let mushroom = { class: value}
    let prediction = decisionTree.predict(mushroom)
    console.log("predicted " + prediction)

    if(value !== undefined){
        userInput.innerText = `Your personal prediction was: ${value}, And the computer prediction is: ${prediction}`;
    }


    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())



}

loadSavedModel()