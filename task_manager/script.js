var list = document.getElementById("list");
var input = document.getElementById("in");

function add() {
    var contextElement = document.getElementsByClassName("textContext");
    let isDuplicate = false;

    for (var element of contextElement) {
        if (element.innerHTML === input.value) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        alert("Task already exists! Please enter another task.");
        return;
    }

    var newlist = document.createElement("li");

    let textElement = document.createElement("p");
    textElement.className = "textContext";
    textElement.innerHTML = input.value;
    newlist.appendChild(textElement);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newlist.appendChild(span);

    list.append(newlist);
}

list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("five");
        save();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        save();
    }
}, false);

function save() {
    localStorage.setItem("data", list.innerHTML);
}

function show() {
    list.innerHTML = localStorage.getItem("data") || ""; // Handle empty localStorage case
}

show();

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (input.value.trim() === "") {
            alert("Please enter a valid task!");
            input.value = "";
            e.preventDefault();
        } else {
            add();
            input.value = "";
            save();
        }
    }
});
