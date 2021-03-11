'use strict';

const contextPath = "http://localhost:8080";
const output = document.getElementById("output");

function getEquations() {

    axios.get(contextPath + "/getAllEquations")
        .then(res => {

            output.innerHTML = "";


            const Equations = res.data;
            console.log(res.data);
            Equations.forEach(equation => {

                const newEquation = renderEquation(equation);
                console.log("New equation: ", newEquation);
                output.appendChild(newEquation);

            });


        }).catch(err => console.error(err));


}

function renderEquation(equation) {



    const newDiv = document.createElement("div");
    newDiv.className = "newDiv";


    const newEquation = document.createElement("div");
    console.log(equation.subject.toLowerCase());
    if (equation.subject.toLowerCase() == "physics") {
        newEquation.className = "card text-white bg-info mb-3";
    } else if (equation.subject.toLowerCase() == "maths") {
        newEquation.className = "card text-white bg-success mb-3";
    } else if (equation.subject.toLowerCase() == "chemistry") {
        newEquation.className = "card text-white bg-warning mb-3";
    } else {
        newEquation.className = "card bg-light mb-3";
    }
    newEquation.style = "max-width: 18rem;";
    newDiv.appendChild(newEquation);

    const equationHeader = document.createElement("h4");
    equationHeader.className = "card-header";
    equationHeader.innerText = equation.subject;
    newEquation.appendChild(equationHeader);

    const equationBody = document.createElement("div");
    equationBody.className = "card-body";
    newEquation.appendChild(equationBody);

    const equationTitle = document.createElement("h5");
    equationTitle.ClassName = "card-title";
    equationTitle.innerText = equation.equation;
    equationBody.appendChild(equationTitle);

    const equationText = document.createElement("p");
    equationText.className = "card-text";
    equationText.innerHTML = equation.equationName;
    equationText.innerHTML += "</br>";
    equationText.innerHTML += "Description: " + equation.description;
    equationBody.appendChild(equationText);

    const equationFooter = document.createElement("div");
    equationFooter.className = "card-footer"
    newEquation.appendChild(equationFooter);

    const deleteEquationButton = document.createElement("button");
    deleteEquationButton.className = "btn btn-primary";
    deleteEquationButton.innerText = "Delete";
    deleteEquationButton.addEventListener('click', function () {
        //deleteEquation(equation.id);
    });
    equationFooter.appendChild(deleteEquationButton);

    const updateEquationButton = document.createElement("button");
    updateEquationButton.className = "btn btn-secondary";
    updateEquationButton.innerText = "Update";
    updateEquationButton.addEventListener('click', function () {

    });
    equationFooter.appendChild(updateEquationButton);


    return newDiv;
}

getEquations();