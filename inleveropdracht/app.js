import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA

const csvFile = "data/diabetes.csv"
const trainingLabel = "Label"
const ignored = ["Pregnant","Age","Label","Pedigree","Bp","Skin"]
const display = document.getElementById("display")
const one = document.getElementById("1")
const two = document.getElementById("2")
const three = document.getElementById("3")
const four = document.getElementById("4")
let noDiabetes = 0;
let yesDiabetes = 1;
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

    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel,
        maxTreeDepth: 4,
    })

    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())

    let amountCorrect= 0;
    let predictedDiabetesWasDiabetes= 0;
    let predictedHealthyWasHealthy= 0;
    let predictedDiabetesWasHealthy= 0;
    let predictedHealthyWasDiabetes= 0;
    for(let row of testData) {
        let prediction = decisionTree.predict(row)
        if (prediction == row.Label) {
            amountCorrect++
        }
        if (prediction == 1 && row.Label == 1){
        predictedDiabetesWasDiabetes++
        }
        if (prediction == 0 && row.Label == 0){
            predictedHealthyWasHealthy++
        }
        if (prediction == 1 && row.Label == 0){
            predictedDiabetesWasHealthy++
        }
        if (prediction == 0 && row.Label == 1){
            predictedHealthyWasDiabetes++
        }
    }
    let accuracy = amountCorrect / testData.length
    console.log(accuracy)
    display.innerText= `Accuracy: ${accuracy}`;

    one.innerText = `${predictedDiabetesWasDiabetes}`;
    two.innerText = `${predictedHealthyWasHealthy}`;
    three.innerText = `${predictedDiabetesWasHealthy}`;
    four.innerText = `${predictedHealthyWasDiabetes}`;

    let json = decisionTree.stringify()
    console.log(json)
}



loadData()