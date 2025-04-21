import menuArray from '/data.js'

const menuItems = document.getElementById('menu-items')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const copyright = document.getElementById('copyright')
const itemsInCart = {}

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddCart(parseInt(e.target.dataset.add))
        calculateCartTotal(e.target.dataset.add)
    } else if (e.target.dataset.minus) {
        handleMinus(e.target.dataset.minus)
    }else if (e.target.dataset.plus) {
        handlePlus(e.target.dataset.plus)
    }
})

function renderMenuItems() {
    menuItems.innerHTML = menuArray.map(({ name, ingredients, id, price, emoji }) => {
        return `
        <div class="menu-item">
            <div class="menu-item-img">${emoji}</div>
            <div class="menu-item-inner">
                <h2 class="item-name">${name}</h2>
                <p class="ingredients">${ingredients.join(', ')}</p>
                <p class="price">${price}€</p>
            </div>
            <button class="add-menu-item" data-add="${id}">
                <i class="fa-solid fa-plus" data-add="${id}"></i>
            </button>
        </div>
        <hr class="separator">`
    }).join('')
}

renderMenuItems()

function handleAddCart(itemId) {
    cartItems.parentElement.classList.remove('hidden')
    itemsInCart[itemId] = (itemsInCart[itemId] || 0) + 1
    renderCart()
}

function handleMinus(itemId) {
    if (itemsInCart[itemId] > 0) {
        itemsInCart[itemId]--
    }
    if (itemsInCart[itemId] === 0) {
        document.getElementById(itemId).remove()
        delete itemsInCart[itemId]
    }
    if (Object.keys(itemsInCart).length === 0) {
        cartItems.parentElement.classList.add('hidden')
    }
    renderCart()
}

function handlePlus(itemId) {
    itemsInCart[itemId]++
    renderCart()
}

function renderCart() {
    cartItems.innerHTML = ''
    Object.keys(itemsInCart).forEach(id => {
        const {name, price} = menuArray.filter(item => item.id === parseInt(id))[0]
        const quantity = itemsInCart[id]
        cartItems.innerHTML += `
    <div class="cart-item" id="${id}">
        <div>
            <p class="cart-item-name">${name}</p>
            <p class="cart-item-price">${price}€</p>
        </div>
        <div class="cart-controls">
            <button data-minus="${id}">-</button>
            <span>${quantity}</span>
            <button data-plus="${id}">+</button>
        </div>
    </div>
    <hr class="separator">
    `
    })
}

function calculateCartTotal() {
    let total = 0;
    for (let [key, value] of Object.entries(itemsInCart)) {
        let { price } = menuArray.filter(item => item.id === parseInt(key))[0]
        total += (price * value)
    }
    cartTotal.textContent = "Total price: " + total + ' €'
}

const dateSnapshot = new Date()
copyright.textContent = "© Volt " + dateSnapshot.getFullYear()