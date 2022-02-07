document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    (function getProducts() {
        let title,
            description,
            image,
            price,
            id,
            rate,
            votes,
            html = '';
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    id = data[i].id;
                    title = data[i].title;
                    description = data[i].description;
                    image = data[i].image;
                    price = data[i].price;
                    rate = data[i].rating.rate;
                    votes = data[i].rating.count;
                    html += `
                    <div id="${id}" class="product">
                        <img src="${image}" />
                        <div class="product-content">
                            <div class="product-heading">
                                <h1>${title}</h1>
                            </div>
                            <p>${description}</p>
                            <div class="wrapper">
                                <div class="price">
                                    <h1><span>Price: </span>${price} $</h1>
                                </div>
                                <div class="rating">
                                    <h2>Product Rating</h2>
                                    <span class="rate">3.9</span>
                                    <span class="votes">120 votes</span>
                                </div>
                            </div>
                            <div class="add-to-cart">
                                <input type="number" value="1" />
                                <button class="add">Add to cart</button>
                            </div>
                        </div>
                    </div>
                    `;
                }
                main.innerHTML = html;
            });
    })();
});
