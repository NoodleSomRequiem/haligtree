
function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))

}
loadSavedModel()

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)
    let prediction = decisionTree.predict(diabetes)
    console.log("predicted " + prediction)
}






