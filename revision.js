const contextPath = "http://localhost:8080";
const output = document.getElementById("output");

let id;

function getEquations() {

    axios.get(contextPath + "/getAllEquations")
        .then(res => {

            output.innerHTML = "";


            const Equations = res.data;

            Equations.forEach(equation => {

                const newEquation = renderEquation(equation);
                output.appendChild(newEquation);

            });


        }).catch(err => console.error(err));


}

function renderEquation(equation) {



    const newDiv = document.createElement("div");
    newDiv.className = "newDiv";


    const newEquation = document.createElement("div");
    if (equation.subject.toLowerCase() == "physics") {
        newEquation.className = "card text-white bg-primary mb-3";
    } else if (equation.subject.toLowerCase() == "maths") {
        newEquation.className = "card text-white bg-success mb-3";
    } else if (equation.subject.toLowerCase() == "chemistry") {
        newEquation.className = "card text-white bg-warning mb-3";
    } else {
        newEquation.className = "card bg-light mb-3";
    }
    newEquation.style = "max-width: 18rem;"
    newDiv.appendChild(newEquation);

    const equationHeader = document.createElement("h4");
    equationHeader.id = "equationSubject" + equation.id;
    equationHeader.className = "card-header";
    equationHeader.innerText = equation.subject;
    newEquation.appendChild(equationHeader);

    const equationBody = document.createElement("div");
    equationBody.className = "card-body";
    newEquation.appendChild(equationBody);

    const equationTitle = document.createElement("h5");
    equationTitle.id = "equationFormula" + equation.id;
    equationTitle.ClassName = "card-title";
    equationTitle.innerText = equation.equation;
    equationBody.appendChild(equationTitle);

    const equationText = document.createElement("p");
    equationText.id = "equationNameDesc" + equation.id;;
    equationText.className = "card-text";
    equationText.innerHTML = equation.equationName;
    equationText.innerHTML += "</br>";
    equationText.innerHTML += equation.description;
    equationBody.appendChild(equationText);

    const equationFooter = document.createElement("div");
    equationFooter.className = "card-footer"
    newEquation.appendChild(equationFooter);

    const hideEquationButton = document.createElement("button");
    hideEquationButton.id = "hideBtn" + equation.id;
    hideEquationButton.className = "btn btn-primary";
    hideEquationButton.innerText = "Hide";
    hideEquationButton.style = "background-color: crimson; border-color: crimson"
    hideEquationButton.addEventListener('click', function () {
        hideEquation(equation.id);
    });
    equationFooter.appendChild(hideEquationButton);


    return newDiv;
}

function hideEquation(id) {
    console.log(id);
    document.getElementById("equationNameDesc" + id).style.display = "none";
    document.getElementById("equationFormula" + id).style.display = "none";
    document.getElementById("equationSubject" + id).style.display = "none";


}


getEquations();