import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

const mushroomClass = document.getElementById("mushroomClass");
const mushroomClassButton = document.getElementById("mushroomClassButton");
const userInput = document.getElementById("userInput");


mushroomClassButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = mushroomClass.value || "please enter E or P";
  loadSavedModel(value)
})

function loadSavedModel(value) {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model, value))
}

function modelLoaded(model, value) {
    console.log(model)
    const decisionTree = new DecisionTree(model)

    // test om te zien of het werkt
    const mushroom = { class: value}
    const prediction = decisionTree.predict(mushroom)
    console.log("predicted " + prediction)

    if(value !== undefined){
        userInput.innerText = `Your personal prediction was: ${value}, And the computer prediction is: ${prediction}`;
    }


    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())



}

loadSavedModel()