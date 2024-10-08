/*<option value="keep-original">Keep original</option>
<option value="sugar-milk">Sugar milk</option>
<option value="vanilla-milk">Vanilla milk</option>
<option value="double-chocolate">Double chocolate</option> going to move to js*/

let cart = [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

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


// now adding roll class//

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

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
