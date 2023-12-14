const orderWrap = document.querySelector('.order__wrapper');
const orderCards = document.querySelector('.order-cards');
const closeBtn = document.getElementById('closeBtn');
const formBtn = document.getElementById('formBtn');

// User Baskets
const userBaskets = [];

// Pizza mahsulolari
const pizzaEl = {
    thin: {
        name: "Thin",
        price: 10
    },
    medium: {
        name: "Medium",
        price: 12
    },
    thick: {
        name: "Thick",
        price: 15
    },
    size25: {
        sm: 25,
        price: 10
    },
    size30: {
        sm: 30,
        price: 12
    },
    size35: {
        sm: 35,
        price: 15
    }
}

// Cheking form inputs
function check(name, phone, adress, dough) {
    if (name.value != "" && phone.value != "" && adress.value != "" && dough !== "") return true;
    else return false;
}

// User create order function
function userOrder(checking) {
    const username = document.getElementById('username');
    const phoneNumber = document.getElementById('phoneNumber');
    const address = document.getElementById('address');
    const dough = document.getElementById('dough');
    const pizzaSizes = document.querySelectorAll('input[name="size"]');
    const onPizzas = document.querySelectorAll('.on_pizza input[type="checkbox"]');
    const addPizzas = document.querySelectorAll('.add_pizza input[type="checkbox"]');

    let isCheking = checking(username, phoneNumber, address, dough);
    if (isCheking) {

        const userBasket = {
            userName: username.value,
            phoneNumber: phoneNumber.value,
            address: address.value,
            onPizzas: [],
            addPizzas: [],
            totalPrice: 0
        }

        // Dough select value
        const doughVal = dough.value;
        userBasket.dough = pizzaEl[doughVal];
        userBasket.totalPrice += userBasket.dough.price;

        // Pizza Sizes's value
        for (sizename of pizzaSizes) {
            if (sizename.checked) {
                userBasket.pizzaSize = pizzaEl[sizename.value]
                userBasket.totalPrice += userBasket.pizzaSize.price;
            }
        }

        // Pizza on input check
        for (pizzaing of onPizzas) {
            if (pizzaing.checked) {
                userBasket.onPizzas.push(pizzaing.value);
                userBasket.totalPrice += 5;
            }
        }

        // Pizza add input check
        for (add of addPizzas) {
            if (add.checked) {
                userBasket.addPizzas.push(add.value);
                userBasket.totalPrice += 3;
            }
        }

        // Add user basket of user baskets
        userBaskets.push(userBasket);
        // Log user baskets
        console.log(userBaskets);
        renderHtmlEl();
    } else {
        alert("Iltimos mavjud malumotlarni kiritng!");
    }
}

function renderHtmlEl() {
    orderCards.innerHTML = "";
    orderWrap.style.display = 'flex';
    for (let i = 0; i < userBaskets.length; i++) {
        let onPizzaValues = '';
        for (el of userBaskets[i].onPizzas) {
            onPizzaValues = onPizzaValues + el + ', ';
        }

        let addPizzaValues = '';
        for (el of userBaskets[i].addPizzas) {
            addPizzaValues = addPizzaValues + el + ', ';
        }

        orderCards.innerHTML += `
        <div class="order">
            <h2>Order: <span>${i+1}</span></h2>

            <div class="user-info">
                <h3>Name: <span>${userBaskets[i].userName}</span></h3>
                <h3>Phone: <span>${userBaskets[i].phoneNumber}</span></h3>
                <h3>Address: <span>${userBaskets[i].address}</span></h3>
            </div>

            <hr>

            <div class="user-order">
                <h3>Dough thickness: <span>${userBaskets[i].dough.name}</span></h3>
                <h3>Size: <span>${userBaskets[i].pizzaSize.sm + 'sm'}</span></h3>
                <h3>On pizza: <span>${onPizzaValues}</span></h3>
                <h3>Add: <span>${addPizzaValues}</span></h3>
            </div>

            <hr>

            <div class="total-price">
                <h3>Total: <span>${'$' + userBaskets[i].totalPrice}</span></h3>
            </div>
        </div>
    `
    }
}

function openBasket() {
    orderWrap.style.display = 'flex';
}

function closeBtnFunc() {
    orderWrap.style.display = 'none';

    const username = document.getElementById('username');
    const phoneNumber = document.getElementById('phoneNumber');
    const address = document.getElementById('address');
    const dough = document.getElementById('dough');
    const onPizzas = document.querySelectorAll('.on_pizza input[type="checkbox"]');
    const addPizzas = document.querySelectorAll('.add_pizza input[type="checkbox"]');

    username.value = '';
    phoneNumber.value = '';
    address.value = '';
    dough.value = '';

    // Pizza on input check
    for (pizzaing of onPizzas) {
        pizzaing.checked = false;
    }

    // Pizza add input check
    for (add of addPizzas) {
        add.checked = false;
    }
}

closeBtn.onclick = closeBtnFunc;