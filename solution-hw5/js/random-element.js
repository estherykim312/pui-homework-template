class Roll{
    constructor(rollType, rollGlazing, packSize, rollPrice){
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

let cart = [];

function initializeCart(){
let originalRoll = new Roll("Original", "Sugar Milk", 1, 2.49);
let walnutRoll = new Roll("Walnut", "Vanilla Milk", 12, 3.49);
let raisinRoll = new Roll("Raisin", "Sugar Milk", 3, 2.99);
let appleRoll = new Roll("Apple", "Original", 3, 3.49);

cart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);
console.log(cart);
}

initializeCart();

//
function displayCartItem(roll) {
    let cartContainer = document.querySelector('.cart-body-contents');

    let cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    cartItemDiv.innerHTML = `
        <div class="image-and-remove">
            <img src="../../assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg" width="200" alt="${roll.type} cinnamon roll" class="small-product-image">
            <p class="remove">Remove</p>
        </div>
        <div class="cart-item-details">
            <p>
                ${roll.type} Cinnamon Roll <br>
                Glazing: ${roll.glazing} <br>
                Pack Size: ${roll.size} <br>
            </p>
            <p class="cart-item-price">$${(roll.basePrice * roll.size).toFixed(2)}</p>
        </div>
    `;

    // Add event listener to the "Remove" button
    cartItemDiv.querySelector('.remove').addEventListener('click', function() {
        removeItemFromCart(roll);
    });

    cartContainer.appendChild(cartItemDiv);
}

// to display the entire cart
function displayCart(){
    document.querySelector('.cart-body-contents').innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        displayCartItem(cart[i]);
    }

    calculateTotalPrice();
}

// remmove an item from the cart
function removeItemFromCart(rollToRemove) {
    console.log("Removing:", rollToRemove);
    let updatedCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] !== rollToRemove) {
            updatedCart.push(cart[i]);
        }
    }
    cart = updatedCart;

    displayCart();
}

// to calculate the total price
function calculateTotalPrice() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].basePrice * cart[i].size;
    }

    //updating total price on the page
    document.querySelector('.cart-total .cart-item-price').textContent = '$' + total.toFixed(2);
}

displayCart();


let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let rollType = params.get('roll');

console.log(rollType);

let rollDetails = rolls[rollType];
let basePrice = rollDetails.basePrice;
let imageFile = rollDetails.imageFile;


//updated title
document.querySelector('.productdetail-header').innerText = rollType + ' Cinnamon Roll';

//to update image
document.getElementById('roll-image').src = '../../assets/products/' + imageFile;

//to update price
document.getElementById('roll-price').innerText = '$' + basePrice;



let glazingOptions= [
    {name: "Keep original", price: 0.00},
    {name: "Sugar milk", price: 0.00},
    {name: "Vanilla milk", price: 0.50},
    {name: "Double chocolate", price: 1.50},
]; /*making an array w both name and their price add-on $*/


let packsizeOptions= [
    {size: 1, priceAdaptation: 1},
    {size: 3, priceAdaptation: 3},
    {size: 6, priceAdaptation: 5},
    {size: 12, priceAdaptation: 10},
]; /*making an array w both pack size options and their price adaptation*/


function loadDropdowns(){
    let selectGlazing= document.getElementById("glazing-styles");
    let selectPack= document.getElementById("pack-size");

    /*settings for glazing options*/
    glazingOptions.forEach(function(option){
        let optionElement= document.createElement("option");
        optionElement.value= option.price; /*price = option.price aka .value*/
        optionElement.textContent= option.name; /*option.name= glazing name aka .textContent*/
        selectGlazing.appendChild(optionElement); 
    });

    /*same settings for packsize options*/
    packsizeOptions.forEach(function(option){
        let optionElement= document.createElement("option");
        optionElement.value= option.priceAdaptation; 
        optionElement.textContent= option.size;
        selectPack.appendChild(optionElement); /*adding child element to parent*/
    });

}

function glazingUpdate(){
    updatePrice(); /*to update price for each glazing selection*/
}

function packUpdate(){
    updatePrice(); /*to update price for each pack size selection*/
}

/* function to do all the math*/
function updatePrice(){
    //SOL3 NO MORE: let basePrice= 2.49;//

    let glazingPrice= parseFloat(document.getElementById('glazing-styles').value);
    let packPrice= parseFloat(document.getElementById('pack-size').value);

    let totalPrice= (basePrice + glazingPrice) * packPrice;

    document.querySelector('.price').textContent= '$' + totalPrice.toFixed(2);  /*total price formula*/
}

loadDropdowns();

document.getElementById('glazing-styles').addEventListener('change', glazingUpdate); 
document.getElementById('pack-size').addEventListener('change', packUpdate);


/* now adding roll class// this is the old placement i am removing this and placing it int he front

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}*/

document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    //glazing
    let glazing = document.getElementById('glazing-styles').value;
    //pack size
    let packSize = document.getElementById('pack-size').value;
    // object that refers to everything
    let newRoll = new Roll(rollType, glazing, packSize, basePrice);
    //adding to cart
    cart.push(newRoll);
    //to print
    console.log(cart);
});
