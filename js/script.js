document.addEventListener('DOMContentLoaded', function () {
    function getProducts() {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
});
