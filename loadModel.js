import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    console.log(model)
    let decisionTree = new DecisionTree(model)

    // test om te zien of het werkt

    let prediction = decisionTree.predict(mushroom)
    console.log("predicted " + prediction)

    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())

}

loadSavedModel()