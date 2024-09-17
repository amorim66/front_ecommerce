// Função para inicializar o carrinho
function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    updateCartCount();
}

// Função para adicionar um item ao carrinho
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Função para remover um item do carrinho
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Função para exibir o carrinho
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let subtotal = 0;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="alert alert-info">Seu carrinho está vazio.</div>';
    } else {
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            cartItems.innerHTML += `
                <div class="card mb-3 cart-item">
                    <div class="row g-0">
                        <div class="col-md-2">
                            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                        </div>
                        <div class="col-md-10">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title">${item.name}</h5>
                                    <button onclick="removeFromCart(${item.id})" class="btn btn-sm btn-outline-danger">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                                <p class="card-text">R$ ${item.price.toFixed(2)}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="quantity-control">
                                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="btn btn-sm btn-outline-secondary">-</button>
                                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" class="form-control form-control-sm mx-2">
                                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="btn btn-sm btn-outline-secondary">+</button>
                                    </div>
                                    <strong>R$ ${itemTotal.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    const shipping = subtotal > 0 ? 10 : 0; // Frete fixo de R$ 10,00 se houver itens no carrinho
    const total = subtotal + shipping;
    
    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = `R$ ${shipping.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2)}`;
}

// Função para atualizar a quantidade de um item
function updateQuantity(id, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity));
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Inicializar o carrinho quando a página carregar
document.addEventListener('DOMContentLoaded', initCart);