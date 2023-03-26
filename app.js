import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "data/mushrooms.csv"
const trainingLabel = "class"  
const ignored = ["cap-shape","cap-surface","cap-color","bruises","odor","gill-color","population","habitat"]  

//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)   // gebruik deze data om te trainen
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    data.sort(() => (Math.random() - 0.5))
    
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    console.log(data)

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())


    // todo : maak een prediction met een sample uit de testdata
    // let mushroom = testData[0]
    // let mushroomPrediction = decisionTree.predict(mushroom)
    // console.log(mushroom)
    // console.log(mushroomPrediction)
    // console.log(`Which is edible : ${mushroomPrediction}`)

    // todo : bereken de accuracy met behulp van alle test data
    let amountCorrect = 0
    let totalAmount = testData.length
    let trueTrue = 0
    let trueFalse = 0
    let falseTrue = 0
    let falseFalse = 0
    
    for (let i = 0; i < testData.length; i++){
        let message = testAccuracy(testData[i], decisionTree)
        if(message === "goed voorspeld edible!"){
            trueTrue++
        }
        else if(message === "goed voorspeld poisoned!"){
            falseFalse++
        }
        else if(message === "fout voorspeld edible!"){
            falseTrue++
        }
        else if(message === "fout voorspeld poisoned!"){
            trueFalse++
        }
    }
    amountCorrect = trueTrue + falseFalse
    console.log(amountCorrect)
    console.log(totalAmount)
    let accuracy = amountCorrect / totalAmount
    // console.log(accuracy)

    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy

    confusionMatrix(amountCorrect, totalAmount, trueTrue, trueFalse, falseTrue, falseFalse)

    let json = decisionTree.stringify()
    console.log(json)
}

function testAccuracy(mushroom, decisionTree) {
    // kopie van passenger maken, zonder het "survived" label
    const mushroomsWithOutClass = { ...mushroom }
    delete mushroomsWithOutClass.class

    // prediction
    let prediction = decisionTree.predict(mushroomsWithOutClass)
    // console.log(prediction)
    // console.log(mushroom.class)
    // vergelijk de prediction met het echte label
    let message
    if(prediction == "e" && mushroom.class == "p") {
        message = "fout voorspeld edible!"
    }
    if(prediction == "e" && mushroom.class == "e") {
        message = "goed voorspeld edible!"
    }
    if(prediction == "p" && mushroom.class == "e") {
        message = "fout voorspeld poisoned!"
    }
    if(prediction == "p" && mushroom.class == "p") {
        message = "goed voorspeld poisoned!"
    }

    return message

}

function confusionMatrix(amountCorrect, totalAmount, trueTrue, trueFalse, falseTrue, falseFalse) {
    document.getElementById("totalCount").innerHTML = "total predicted mushrooms: " + totalAmount
    document.getElementById("amountCorrect").innerHTML = "total amount correct predicted mushrooms: " + amountCorrect

    document.getElementById("truetrue").innerHTML = trueTrue
    document.getElementById("truefalse").innerHTML = trueFalse
    document.getElementById("falsetrue").innerHTML = falseTrue
    document.getElementById("falsefalse").innerHTML = falseFalse

}


loadData()