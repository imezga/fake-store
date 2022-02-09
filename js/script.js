document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const cart = document.getElementById('cart');
    const cartIcon = document.getElementById('cart-icon');
    const cartClose = document.getElementById('cart-icon-close');
    const total = document.getElementById('total');
    const cartList = document.getElementById('cart-list');

    const cartItems = [];
    const pushedIds = [];

    // open cart
    cartIcon.addEventListener('click', () => {
        cartClose.style.display = '';
        cart.style.display = 'flex';
        cartIcon.style.display = 'none';
    });
    // close cart
    cartClose.addEventListener('click', () => {
        cart.style.display = 'none';
        cartIcon.style.display = 'block';
    });

    // get products from API
    function getProducts() {
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
                    <div  class="product">
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
                                    <span class="rate">${rate}</span>
                                    <span class="votes">${votes} votes</span>
                                </div>
                            </div>
                            <div class="add-to-cart">
                                <input class="input" type="number" value="1" />
                                <button id="${id}" class="add">Add to cart</button>
                            </div>
                        </div>
                    </div>
                    `;
                }
                main.innerHTML = html;
            });
    }
    getProducts();

    // get total
    function getTotal() {
        let sum = 0;
        for (let i = 0; i < cartItems.length; i++) {
            sum += cartItems[i].quantity * cartItems[i].price;
        }
        total.innerHTML = `${sum.toFixed(2)} $`;
    }

    // add items to cart
    function addItemsToCart() {
        getTotal();
        let html = '';
        for (let i = 0; i < cartItems.length; i++) {
            const title = cartItems[i].title;
            const price = cartItems[i].price;
            const id = cartItems[i].id;
            const quantity = cartItems[i].quantity;

            html += `
                <li class="cart-item">
                    <h3>${title}</h3>
                    <div class="item-info">
                        <p>Total: <span class="price">${(price * quantity).toFixed(2)} $</span></p>
                        <div class="quantity-wrapper">
                            <div>
                                Quantity:
                                <span class="quantity">${quantity}</span>
                            </div>
                            <button value="${id}" class="minus">-</button>
                            <button value="${id}" class="plus">+</button>
                        </div>
                    </div>
                </div>
            `;
        }
        cartList.innerHTML = html;
    }

    // add item to cartItems array
    function addItemToCartItems(id) {
        const input = document.getElementsByClassName('input');
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (pushedIds.indexOf(id) < 0) {
                        if (data[i].id == id) {
                            const title = data[i].title;
                            const price = data[i].price;
                            const item = {
                                id: id,
                                title: title,
                                price: price,
                                quantity: Number(input[i].value),
                            };
                            pushedIds.push(id);
                            cartItems.push(item);
                        }
                    } else if (cartItems[i] != undefined) {
                        cartItems[i].quantity += Number(input[i].value);
                    }
                }
                addItemsToCart();
            });
    }

    // check if add to cart button exist
    document.body.addEventListener('click', function (e) {
        if (e.target.className == 'add') {
            addItemToCartItems(e.target.id);
        } else if (e.target.className == 'minus' || e.target.className == 'plus') {
            let id = e.target.value;
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id == id) {
                    if (e.target.className == 'minus') {
                        if (cartItems[i].quantity == 1) {
                            cartItems.splice(i, 1);
                        } else {
                            cartItems[i].quantity -= 1;
                        }
                    } else {
                        cartItems[i].quantity += 1;
                    }
                    addItemsToCart();
                }
            }
        }
    });
});
