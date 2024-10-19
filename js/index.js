
let arr = []; //init array for products card which we will create afrer fetching



let items = []; // storing all items in items on fetch for compearing 


let cartItems = [];// here will comes all items which will added by user in cart

let cartItemsHtmlCode = []; // code which will be use ase innerHtml
let productsOuter = document.querySelector('.products'); // selecting product container 
const cart_outer = document.getElementById('cart_outer'); //selecting cart container 

const cart_title = document.getElementById('cart_title'); // selecting text element of cart headding
const cart_inner = document.getElementById('cart_inner'); // selecting cart inner where All user added items will appear 
const submit_order = document.getElementById('submit_order');// selecting submit element 
const inc_btn = document.getElementById("inc_btn"); // selecting increment button
const prompt_box = document.getElementById('prompt_box'); // selecting prompt box
const prompt_inner = document.getElementById('prompt_inner'); // selecting prompt box inner
const confirom_inner = document.getElementById('confirom_inner');// selecting confirom box 
const total_confirom = document.getElementById("total_confirom"); // selecting element where total amount will shows
// getting screen width and height for representing images dynamically 
let screenWidth = window.innerWidth; 
let screenHeight = window.innerHeight;


// setting initial "0" cart item on load
cart_title.innerText =`Your Cart (${cartItems.length})`;


// getting products data from api (data.json file)
const apiData = async () => {
  const res = await fetch('data.json');
  const data = await res.json();
  items = data;
  
  data.map((item, i) => {
    //setting image path for different devices witdth size
      let img =  screenWidth < 768 ? item.image.mobile : screenWidth > 768 && screenWidth < 992 ? item.image.tablet : item.image.desktop;
    
    // pushing product card in array which we defined on top
    arr.push(
      `<div class="single_product" id='product${i}'>
            <div class="cord">
              <div class="card_image" id="image_div_id${i}" style="background-image: url('${img}');">

                <div class="card_btns" >
                 <div class="add_cart_btn" id='cart_btn_id${i}' onclick="hideBtn(${i})">
                    <img src="/assets/images/icon-add-to-cart.svg" alt="cart image">
                    <p>Add to Cart</p>
                  </div>
                  <div class="counter hide" id='counter_btn_id${i}'>
                      <img class='dec_btn' onclick='decFunc(${i})' src="/assets/images/icon-decrement-quantity.svg"  alt="decrementt-icon"/>
                      <p class='counter_text' id='counter${i}'>0</p>
                     <img class='inc_btn' onclick="incFunc(${i})"  id=""inc_btn" src="/assets/images/icon-increment-quantity.svg" alt="increment Image" /> 
                    </div>
                </div>
              </div>
              <div class="card_info">
                <p class="item_cat">${item.category}</p>
                <p class="item_name" id='item_name${i}'>${item.name}</p>
                <p class="price">$${item.price}</p>
                
              </div>
            </div>

          </div>
           `);

  })

// seting data on html tag where we want to show all products
  productsOuter.innerHTML = arr;

}

// calling our main function to get data from api 
let commingData = apiData();

// setting up total amount of cart items
function totalConfirom (){
  let total = 0;
  cartItems.map((item,i) => {
    return total = total + (item.qty * item.price);
  })
  
  // showing total amount of cart items to user
totalConfirom.innerHTML = ` <div class="totle_info">
              <p class="total_info_p">Order Total</p>
              <p class="total_amount">\$${total}</p>
            </div>
           `;
}




 // creating function for increase quantity 
function incFunc(i) {
  // getting element where we show how much quantity user selected of an item
  const counteId = document.getElementById(`counter${i}`);
  
  // getting element inner text we will use it to compearing 
  const item_name = document.getElementById(`item_name${i}`);

// getting element where we set crunt quantity of item and after updating we will set updated numbers 
  const num = parseInt(counteId.innerText);
// increasing item quantity 
cartItems.map((item,i) => {
  item.name === item_name.innerText ? ([...cartItems,item.qty=item.qty+1],counteId.innerText=item.qty): '';

});
// re-rendere cart items, quantity, total prices etc👇
setCartDivData();
grandTotal();
totalCartItems();
}


// setting detriment function  
function decFunc(i) {
// getting all necessary elements 
  const cart_btn = document.getElementById(`cart_btn_id${i}`);
  const counter_btn = document.getElementById(`counter_btn_id${i}`);
  const item_name = document.getElementById(`item_name${i}`);
  const counteId = document.getElementById(`counter${i}`);
  
  
  // applying logic to chack if item quantity already is equal 1
if(parseInt(counteId.innerText) <= 1){
  cartItems = cartItems.filter((item,i) => {
    return item.name !== item_name.innerText;
    });
    // if condition true we will hide increment & decrement buttons because its our design requirement 
    counteId.innerText=0 ;
      cart_btn.classList.remove('hide');
    counter_btn.classList.add('hide');
}

// if condition false we will decrease item quantity by 1
else{
  cartItems.map((item,i) => {
    if(item.name == item_name.innerText){
      return  [...cartItems,item.qty = item.qty - 1];
    }
    
    })
    counteId.innerText = counteId.innerText - 1;
}
// updating again cart data
setCartDivData();
cartItems !== 0 ? grandTotal() : '';
totalCartItems();
}


// setting up logics for first time adding item in cart
function hideBtn(i) {
  const cruntItem = document.getElementById(`cart_btn_id${i}`);
  const counter_btn_id = document.getElementById(`counter_btn_id${i}`);
  const item_name = document.getElementById(`item_name${i}`).innerText;
  const counter = document.getElementById(`counter${i}`);

  



  let count = parseInt(counter.innerText);
  cruntItem.classList.add('hide');
  counter_btn_id.classList.remove('hide');

  const filterdItem = items.filter((item,i) =>{
    return item.name === item_name;
  });
  const addAbleItem = {
    name: filterdItem[0].name,
    price: filterdItem[0].price,
    qty: 1,
    counter: i,
    thumbnail: filterdItem[0].image.thumbnail
  };
   cartItems.push(addAbleItem);
  counter.innerText = addAbleItem.qty;
 setCartDivData();
 grandTotal();
 cartItems !== ' '? totalCartItems(): '';
}

// creating function which we used inside increments & decrement functions to show cart data 
function setCartDivData (){
  let cartDivInnerText = cartItems.length === 0 ? `<div class="empty_cart_img_div"><img class="empty_cart_img" src="/assets/images/illustration-empty-cart.svg" /></div>
            <p class="empty_cart_text">Your Added Items Will appear here</p>`:cartItems.map((item,i) => {
              let n = item.name;
   return ` <div class="cart_item">
              <div class="cart_item_left">
                <p class="c_i_item_name">${item.name}</p>
                <div class="c_i_info">
                  <p class="c_i_qty">${item.qty}x</p>
                  <p class="c_i_price">@ \$${item.price}</p>
                  <p class="c_i_multpy_price">\$ ${item.qty * item.price}</p>

                </div>
              </div>
              <div class="cart_item_right" onclick="removeItemFromCart(${i})">
                <img class="remove_cart_btn"  src="/assets/images/icon-remove-item.svg"  alt="remove cart icon"/>

              </div>
            </div>`;
 });
 cart_inner.innerHTML = cartDivInnerText;
}

// calling on load
setCartDivData();


// creating function to calculate total amount of user cart
function grandTotal (){
  let total = 0;
  cartItems.map((item,i) => {
    return total = total + (item.qty * item.price);
  })

// setting up on cart element 
if(cartItems.length >  0){
  submit_order.innerHTML = ` <div class="totle_info">
              <p class="total_info_p">Order Total</p>
              <p class="total_amount">\$${total}</p>
            </div>
            <div class="corben_delivery">
              <img src="/assets/images/icon-carbon-neutral.svg" alt="nothing">
              <p class="carbon_txt">This is a <span class="carbon_span">carbon-netural</span>
              deleviry</p>
            </div>
            <button class="submit_order_btn" onclick="confiromOrder()">Confirom Order</button>`;
}
else{
  submit_order.innerHTML = ''
}
}

// creating function to showing how much items inside our cart
function totalCartItems (){
  let tmp = 0;
  cartItems.map((item,i) => {
    return tmp = tmp + (item.qty);
  })
  cart_title.innerText = `Your Cart (${tmp})`
}

// creating function to remove complete item from cart
function removeItemFromCart (i){
let targetItem = cartItems[i];
let counter = targetItem.counter;


const counterElement = document.getElementById(`counter${counter}`); 
const cruntItem = document.getElementById(`cart_btn_id${counter}`);
const counter_btn_id = document.getElementById(`counter_btn_id${counter}`);


counterElement.innerText = 0;
cruntItem.classList.remove('hide');
counter_btn_id.classList.add('hide');
cartItems = cartItems.filter((item, i) => {
  return item.name !== targetItem.name
});
setCartDivData();
cartItems !== 0 ? grandTotal() : '';

}


// seting up to opne prompt box on confirmation order
function confiromOrder (){
  prompt_box.classList.remove('hide');
 let confiromOrder = cartItems.map((item,i)=> {
  // let n = item.name;
  let idNum = item.counter;
  let image_div_id = document.getElementById(`image_div_id${idNum}`)

  image_div_id.classList.add('image_border');


return ` 
<div class="cart_item confirom_box_model">
  <div class="confirom_item_left"><img src="${item.thumbnail}" alt="ok image" /></div>
  <div class="confirom_item_center">
    <p class="c_i_item_name">${item.name}</p>
    <div class="c_i_info">
      <p class="c_i_qty">${item.qty}x</p>
      <p class="c_i_price">@ \$${item.price}</p>


    </div>
    
  </div>
  <div class="confirom_item_left">
      <p>\$${item.price * item.qty}</p>
    </div>
</div>`;

}) ;
let total = 0;
  cartItems.map((item,i) => {
    return total = total + (item.qty * item.price);
  })


let outerBox = `<div class="outer_box">${confiromOrder}</div>`

confirom_inner.innerHTML = outerBox + ` <div class="totle_info">
              <p class="total_info_p">Order Total</p>
              <p class="total_amount">\$${total}</p>
            </div>
           `;
}

// creating function to reset everything on order confirmation 
function emptyCart (){
  productsOuter.innerHTML = arr;
  cartItems = [];
 grandTotal();
totalCartItems();
setCartDivData();
prompt_box.classList.add('hide');
}