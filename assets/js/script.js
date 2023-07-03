// Sample product data
const products = [
    { id: 4, name: 'Apple iPhone 12 Mini', category: 'Mobile', price: 91000, image: 'https://www.gizmochina.com/wp-content/uploads/2020/10/Apple-iPhone-12-Mini-500x500.jpg' },
    { id: 5, name: 'Apple iPhone SE 2020', category: 'Mobile', price: 42000, image: 'https://www.gizmochina.com/wp-content/uploads/2020/04/Apple-iPhone-SE-2020-500x500.jpg' },
    { id: 6, name: 'Apple iPhone 11 Pro Max', category: 'Mobile', price: 121000, image: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-Pro-Max-500x500.jpg' },
    { id: 7, name: 'Apple iPhone 11 Pro', category: 'Mobile', price: 111000, image: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-Pro-500x500.jpg' },
    { id: 8, name: 'Apple iPhone 11', category: 'Mobile', price: 101000, image: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-500x500.jpg' },
    { id: 12, name: 'Samsung S20 Ultra', category: 'Mobile', price: 91000, image: 'https://www.gizmochina.com/wp-content/uploads/2020/02/Samsung-Galaxy-S20-Ultra-500x500.jpg' },
    { id: 13, name: 'Samsung S20 Plus', category: 'Mobile', price: 81000, image: 'https://www.gizmochina.com/wp-content/uploads/2020/02/Samsung-Galaxy-S20-Plus-500x500.jpg' },
    { id: 14, name: 'Samsung S20', category: 'Mobile', price: 71000, image: 'https://www.gizmochina.com/wp-content/uploads/2020/02/Samsung-Galaxy-S20-500x500.jpg' },

];

const productListElement = document.getElementById('product-list');
const cartTotalElement = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');


let cartItems = [];

const createTableRow = (item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${item.price * item.quantity}</td>
    `;
    return tr;
}


const renderShoppingCart = () => {
    const cartItemsTable = document.getElementById('cart-items-table-body');
    cartItemsTable.innerHTML = '';
    cartItems.forEach((item) => {
        cartItemsTable.appendChild(createTableRow(item));
    }
    );
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotalElement.textContent = `$${totalPrice}`;
    
}

const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    renderShoppingCart();
}

const clearCart = () => {
    cartItems = [];
    renderShoppingCart();
}


const renderProductList = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product) => {
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'card', 'p-3', 'text-center');
        div.innerHTML = `
            <img class="mx-auto d-block" height="150" width="150" src="${product.image}" />
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <button class="btn btn-primary">Add to Cart</button>
        `;
        const addToCartButton = div.querySelector('button');
        addToCartButton.addEventListener('click', () => addToCart(product));
        productList.appendChild(div);
    });
}

renderProductList();

// Add event listener to the clear cart button
clearCartButton.addEventListener('click', clearCart);
