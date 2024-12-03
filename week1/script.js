async function fetchdata() {
    let response = await fetch("https://fakestoreapi.com/products")
    let data = await response.json()
    data.forEach(product => {
        let referElement = document.getElementById("continer")
        referElement.innerHTML += `
                    <div class="card">
                    <img src=${product.image} alt="">
                    <h2>${product.title.slice(0,50)}</h2>
                    <p>${product.description.slice(0,50)}</p>
                    <div class="btns">
                        <button class="price">$${product.price}/-</button>
                        <button class="rating"><i class="fa-solid fa-star">${product.rating.rate}</i></button>
                    </div>
                    </div>
                    `
    });    
}
fetchdata()

async function fetchdata1() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();
        let content = '';    
        data.slice(0, 3).forEach(product => {
            content += `
                <div class="box">
                    <img src="${product.image}" alt="">
                    <h2>${product.title.slice(0, 10)}</h2>
                    <p>${product.description.slice(0, 20)}</p>
                    <div class="btns">
                        <button class="price">$${product.price}/-</button>
                        <button class="rating"><i class="fa-solid fa-star">${product.rating.rate}</i></button>
                    </div>
                </div>
            `;
        });
        document.getElementById("main").innerHTML = content;
    } catch (error) {
        console.error("Error fetching product data:", error);
        document.getElementById("container").innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}
fetchdata1()


function myfun(){
    let username=document.getElementById('username').value
    let password=document.getElementById('password').value 
    if (username=="admin" && password=="admin"){
        window.location="index.html"
    }
    else{
        document.getElementById('para').innerHTML="Invalid Credientials"
    }
}

function skip(){
    window.location="index.html"
}