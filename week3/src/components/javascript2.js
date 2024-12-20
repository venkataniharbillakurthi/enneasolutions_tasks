async function fetchdata1() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();
        let content = '';
        let mainElement = document.getElementById("main"); 
        if (!mainElement) {
            console.error("Element with id 'main' not found");
            return;
        }
        data.slice(0, 3).forEach(product => {
            content += `
                <div class="box">
                    <img src="${product.image}" alt=""/>
                    <h2>${product.title.slice(0, 20)}</h2>
                    <p>${product.description.slice(0, 20)}</p>
                    <div class="btns">
                        <button class="price">$${product.price}/-</button>
                        <button class="rating"><i class="fa-solid fa-star">${product.rating.rate}</i></button>
                    </div>
                </div>
            `;
        });
        mainElement.innerHTML = content;
    } catch (error) {
        console.error("Error fetching product data:", error);
        let containerElement = document.getElementById("container"); 
        if (containerElement) {
            containerElement.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        }
    }
}

    fetchdata1();