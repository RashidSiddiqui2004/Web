
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let actualPlacement = parseInt(document.getElementById("actualPlacement").value);

    let predictedPlacement = Math.random() > 0.5 ? 1 : 0;

    let tp = parseInt(document.getElementById("tp").textContent);
    let tn = parseInt(document.getElementById("tn").textContent);
    let fp = parseInt(document.getElementById("fp").textContent);
    let fn = parseInt(document.getElementById("fn").textContent);

    if (actualPlacement === 1 && predictedPlacement === 1) {
        tp++;
    } else if (actualPlacement === 1 && predictedPlacement === 0) {
        fn++;
    } else if (actualPlacement === 0 && predictedPlacement === 1) {
        fp++;
    } else if (actualPlacement === 0 && predictedPlacement === 0) {
        tn++;
    }

    document.getElementById("tp").textContent = tp;
    document.getElementById("tn").textContent = tn;
    document.getElementById("fp").textContent = fp;
    document.getElementById("fn").textContent = fn;

    let precision = tp + fp === 0 ? 0 : (tp / (tp + fp)).toFixed(2);
    let recall = tp + fn === 0 ? 0 : (tp / (tp + fn)).toFixed(2);
    let f1score = (precision == 0 || recall == 0) ? 0 : ((2 * precision * recall) / (parseFloat(precision) + parseFloat(recall))).toFixed(2);
    let accuracy = ((tp + tn) / (tp + tn + fp + fn)).toFixed(2);

    document.getElementById("precision").textContent = precision;
    document.getElementById("recall").textContent = recall;
    document.getElementById("f1score").textContent = f1score;
    document.getElementById("accuracy").textContent = accuracy;
});
