var list = document.getElementById("list");
var input = document.getElementById("in");

function add() {
    var newlist = document.createElement("li");
    newlist.innerHTML = input.value;
    list.append(newlist);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newlist.appendChild(span);
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
    list.innerHTML = localStorage.getItem("data");
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
