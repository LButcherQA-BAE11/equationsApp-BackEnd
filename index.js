'use strict';

const contextPath = "http://localhost:8080";
const output = document.getElementById("output");
const modal = document.querySelector(".modalDiv-bg")
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
    equationText.innerHTML += equation.description;
    equationBody.appendChild(equationText);

    const equationFooter = document.createElement("div");
    equationFooter.className = "card-footer"
    newEquation.appendChild(equationFooter);

    const deleteEquationButton = document.createElement("button");
    deleteEquationButton.id = "deleteBtn"
    deleteEquationButton.className = "btn btn-primary";
    deleteEquationButton.innerText = "Delete";
    deleteEquationButton.addEventListener('click', function () {
        deleteEquation(equation.id);
    });
    equationFooter.appendChild(deleteEquationButton);


    const updateEquationButton = document.createElement("button");
    updateEquationButton.id = "updateBtn"
    updateEquationButton.className = "btn btn-secondary";
    updateEquationButton.innerText = "Update";
    updateEquationButton.addEventListener('click', function () {

        modal.classList.add('bg-active');
        if (equation.subject != 'null') {
            document.getElementById("modalEquationSubject").value = equation.subject;
        };

        if (equation.equation != 'null') {
            document.getElementById("modalEquation").value = equation.equation;
        }
        if (equation.equationName != 'null') {
            document.getElementById("modalEquationName").value = equation.equationName;
        }
        if (equation.description != 'null') {
            document.getElementById("modalEquationDesc").value = equation.description;
        }



        id = equation.id;
    });

    equationFooter.appendChild(updateEquationButton);

    const closeBtn = document.getElementById("modalCloseBtn");
    closeBtn.addEventListener('click', function () {

        modal.classList.remove('bg-active');
    });

    return newDiv;
}

function deleteEquation(id) {
    axios.delete(contextPath + "/delete/" + id)
        .then(() => getEquations())
        .catch(err => console.error(err));

}

document.getElementById("equationForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        equationName: this.equationName.value,
        equation: this.equation.value,
        description: this.description.value,
        subject: this.subject.value
    };

    axios.post(contextPath + "/createEquation", data)
        .then(() => {
            this.reset();
            this.equationName.focus();
            getEquations();
        }
        )
        .catch(err => console.error(err))

});




document.getElementById("modalEquationForm").addEventListener('submit', function (event) {
    event.preventDefault();


    const data = {
        equationName: this.modalEquationName.value,
        equation: this.modalEquation.value,
        description: this.modalDescription.value,
        subject: this.modalSubject.value
    };

    localStorage.getItem("equationid")

    axios.put(contextPath + "/update/" + id, data)
        .then(() => {
            this.reset();
            modal.classList.remove('bg-active');
            getEquations();
        })
        .catch(err => console.error(err))

});


window.onscroll = function () { stickyHeaderFunc() };


var header = document.getElementById("myHeader");

var sticky = header.offsetTop;

function stickyHeaderFunc() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}




getEquations();