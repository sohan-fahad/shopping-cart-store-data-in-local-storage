// Those Event for counting quantitiy (Start From Here)
document.getElementById('laptop-plus').addEventListener('click', function () {
    calculateQuantity('laptop-number', 'laptopPrice', 1000, true)
})
document.getElementById('laptop-minus').addEventListener('click', function () {
    calculateQuantity('laptop-number', 'laptopPrice', 1000, false)
})

document.getElementById('phone-plus').addEventListener('click', function () {
    calculateQuantity('phone-number', 'phone-price', 800, true)
})
document.getElementById('phone-minus').addEventListener('click', function () {
    calculateQuantity('phone-number', 'phone-price', 800, false)
})

document.getElementById('cover-plus').addEventListener('click', function () {
    calculateQuantity('cover-number', 'cover-price', 100, true)
})
document.getElementById('cover-minus').addEventListener('click', function () {
    calculateQuantity('cover-number', 'cover-price', 100, false)
})
// Those Event for counting quantitiy (END Here)


// Those function for onclick envet to get Items in Items Cart 
const getLaptopCart = () => {
    getInCart('laptop-name', 'laptopImg', 'laptopPrice', 'laptop-number')
}
const getPhoneCart = () => {
    getInCart('phone-name', 'phoneImg', 'phone-price', 'phone-number')
}
const getCoverCart = () => {
    getInCart('coner-name', 'coverImg', 'cover-price', 'cover-number')
}

// this function for counting item quantity, Here I Passing four data
const calculateQuantity = (quantityID, priceItem, price, isQuantity) => {
    let quantityNumber = document.getElementById(quantityID)
    let quantityText = quantityNumber.value;
    let quantityValue = parseInt(quantityText)
    if (isQuantity) {
        quantityValue += 1;
    }
    else {
        if (quantityValue > 0) {
            quantityValue -= 1;
        }
        else {
            return
        }
    }
    quantityNumber.value = quantityValue;

    const QuantityPrice = document.getElementById(priceItem)
    QuantityPrice.innerText = quantityValue * price;
}


// this function for get data in cart by clicking add item button
const getInCart = (itemName, itemImg, itemPrice, quantity) => {
    const item = document.getElementById(itemName).innerText
    const itemImgView = document.getElementById(itemImg).src
    const itemQuantityPrice = document.getElementById(itemPrice).innerText
    const itemQuantityPriceValue = parseInt(itemQuantityPrice)
    const itemQuantity = document.getElementById(quantity).value
    const itemQuantityValue = parseInt(itemQuantity)

    // this condition check the valid input. If the input quantity is more than 0, than it will get, otherwise not
    if (itemQuantityValue > 0) {
        const getItem = document.createElement('div');
        getItem.classList.add('row');
        getItem.innerHTML = `
        <div class="d-flex align-items-center justify-content-around">
            <div>
                <img class="cartImg img-fluid" src="${itemImgView}" alt="" srcset="">
            </div>
            <div class="cartInfo d-flex justify-content-around">
                <h5>Name: <span >${item}</span></h5>
                <h5 class="ps-5">Price: $<span >${itemQuantityPrice}</span></h5>
                <h5 class="ps-5">Quantity: <span>${itemQuantity}</span></h5>
            </div>
        </div>
    `
        const addCartItem = document.getElementById('addCartItem')
        addCartItem.appendChild(getItem)
    }

    // this function store my carts data in locatal Storage
    addToStorage(item, itemImgView, itemQuantityPriceValue, itemQuantityValue, itemQuantityPriceValue)

    // this function for calculating total items price in cart section 
    calculateTotal(itemQuantityPriceValue)
}

// This Function will calculate total price
const calculateTotal = eachItemPrice => {
    let total = document.getElementById('totalPrice');
    let totaltext = total.innerText
    let totalPrice = parseInt(totaltext)
    totalPrice = totalPrice + eachItemPrice;
    total.innerText = totalPrice;
}

// this function get my local storage data. If there are any data than it will parse it other wise it will return an empty object, where I store my data
const getDataFromStorage = () => {
    const storageData = localStorage.getItem('cartInfo')
    let storageDataObj;
    // if the condition is true, than storage data will parse by json 
    if (storageData) {
        storageDataObj = JSON.parse(storageData)
    }
    // if the condition is false, than it will return an empty object where will new data
    else {
        storageDataObj = {}
    }
    return storageDataObj;
}

// this function for storing data in local storage
const addToStorage = (itemName, img, price, quantity) => {
    let cartDateils = getDataFromStorage();
    cartDateils[itemName] = [itemName, img, price, quantity]
    const itemStrigify = JSON.stringify(cartDateils)
    localStorage.setItem('cartInfo', itemStrigify)
}

// this functon for showing local storage data in carts section. the function used in onload event in body tag
const displayLocalItems = () => {
    const items = getDataFromStorage();

    // entities method use for getting properties and values
    const myItems = Object.entries(items)
    let totalPrice = 0;
    for (const item of myItems) {
        const getItem = document.createElement('div');
        getItem.classList.add('row');
        getItem.innerHTML = `
        <div class="d-flex align-items-center justify-content-around">
            <div>
                <img class="cartImg img-fluid" src="${item[1][1]}" alt="" srcset="">

            </div>
            <div class="cartInfo d-flex justify-content-around">
                <h5>Name: <span >${item[1][0]}</span></h5>
                <h5 class="ps-5">Price: $<span >${item[1][2]}</span></h5>
                <h5 class="ps-5">Quantity: <span>${item[1][3]}</span></h5>
            </div>
        </div>
    `
        const addCartItem = document.getElementById('addCartItem')
        addCartItem.appendChild(getItem)
        totalPrice += item[1][2]
    }
    document.getElementById('totalPrice').innerText = totalPrice;
}

// this click event for clearing carts & local storage data
const placeOrder = () => {
    document.getElementById('addCartItem').textContent = '';
    document.getElementById('totalPrice').innerText = 0;
    localStorage.removeItem('cartInfo')
}