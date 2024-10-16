
let arr = [];


// storing all items in items on fetch for compearing 
let items = [];

// here will comes all items who will added by user 
let cartItems = [];

let cartItemsHtmlCode = [];
let productsOuter = document.querySelector('.products');
const cart_outer = document.getElementById('cart_outer');

const cart_title = document.getElementById('cart_title');
const cart_inner = document.getElementById('cart_inner');
const submit_order = document.getElementById('submit_order');
const inc_btn = document.getElementById("inc_btn");
const prompt_box = document.getElementById('prompt_box');
const prompt_inner = document.getElementById('prompt_inner');
const confirom_inner = document.getElementById('confirom_inner');
const total_confirom = document.getElementById("total_confirom");

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

cart_title.innerText =`Your Cart (${cartItems.length})`;


function totalConfirom (){
  let total = 0;
  cartItems.map((item,i) => {
    return total = total + (item.qty * item.price);
  })
totalConfirom.innerHTML = ` <div class="totle_info">
              <p class="total_info_p">Order Total</p>
              <p class="total_amount">\$${total}</p>
            </div>
           `;
}

// function btns (e)  {
//   console.log(e.target)
// }
const apiData = async () => {
  const res = await fetch('data.json');
  const data = await res.json();
  items = data;
  
  data.map((item, i) => {
    // console.log(items)
    // const itemName = item.name;
      let img =  screenWidth < 768 ? item.image.mobile : screenWidth > 768 && screenWidth < 992 ? item.image.tablet : item.image.desktop;
    arr.push(
      `<div class="single_product" id='product${i}'>
            <div class="cord">
              <div class="card_image" id="image_div_id${i}" style="background-image: url('${img}');">

                <div class="card_btns" >
                 <div class="add_cart_btn" id='cart_btn_id${i}' onclick="hideBtn(${i})">
                    <img src="/assets/images/icon-add-to-cart.svg" alt="">
                    <p>Add to Cart</p>
                  </div>
                  <div class="counter hide" id='counter_btn_id${i}'>
                      <img class='dec_btn' onclick='decFunc(${i})' src="/assets/images/icon-decrement-quantity.svg" />
                      <p class='counter_text' id='counter${i}'>0</p>
                     <img class='inc_btn' onclick="incFunc(${i})"  id=""inc_btn" src="/assets/images/icon-increment-quantity.svg" /> 
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

  productsOuter.innerHTML = arr;

}


function incFunc(i) {
  const counteId = document.getElementById(`counter${i}`);
  const item_name = document.getElementById(`item_name${i}`);

  const num = parseInt(counteId.innerText);

cartItems.map((item,i) => {
  item.name === item_name.innerText ? ([...cartItems,item.qty=item.qty+1],counteId.innerText=item.qty): '';

})
setCartDivData();
grandTotal();
totalCartItems();
}


function decFunc(i) {

  const cart_btn = document.getElementById(`cart_btn_id${i}`);
  const counter_btn = document.getElementById(`counter_btn_id${i}`);
  const item_name = document.getElementById(`item_name${i}`);
  const counteId = document.getElementById(`counter${i}`);
  
if(parseInt(counteId.innerText) <= 1){
  cartItems = cartItems.filter((item,i) => {
    return item.name !== item_name.innerText;
    });
    counteId.innerText=0 ;
      cart_btn.classList.remove('hide');
    counter_btn.classList.add('hide');
}
else{
  cartItems.map((item,i) => {
    if(item.name == item_name.innerText){
      return  [...cartItems,item.qty = item.qty - 1];
    }
    
    })
    counteId.innerText = counteId.innerText - 1;
  console.log(cartItems)
}

setCartDivData();
cartItems !== 0 ? grandTotal() : '';
totalCartItems();
}
function hideBtn(i) {
  const cruntItem = document.getElementById(`cart_btn_id${i}`);
  const counter_btn_id = document.getElementById(`counter_btn_id${i}`);
  const item_name = document.getElementById(`item_name${i}`).innerText;
  const counter = document.getElementById(`counter${i}`);

  



  let count = parseInt(counter.innerText);
  cruntItem.classList.add('hide');
  counter_btn_id.classList.remove('hide');
  // counter.innerText = count + 1;
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
  console.log(addAbleItem)
 setCartDivData();
 grandTotal();
 cartItems !== ' '? totalCartItems(): '';
}
let commingData = apiData();

function setCartDivData (){
  let cartDivInnerText = cartItems.length === 0 ? `<div class="empty_cart_img_div"><img class="empty_cart_img" src="/assets/images/illustration-empty-cart.svg" /></div>
            <p class="empty_cart_text">Your Added Items Will appear here</p>`:cartItems.map((item,i)=> {
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
                <img class="remove_cart_btn"  src="/assets/images/icon-remove-item.svg" />

              </div>
            </div>`;
 });
 cart_inner.innerHTML = cartDivInnerText;
}
setCartDivData();
function grandTotal (){
  let total = 0;
  cartItems.map((item,i) => {
    return total = total + (item.qty * item.price);
  })

if(cartItems.length >  0){
  submit_order.innerHTML = ` <div class="totle_info">
              <p class="total_info_p">Order Total</p>
              <p class="total_amount">\$${total}</p>
            </div>
            <div class="corben_delivery">
              <img src="/assets/images/icon-carbon-neutral.svg" alt="">
              <p class="carbon_txt">This is a <span class="carbon_span">carbon-netural</span>
              deleviry</p>
            </div>
            <button class="submit_order_btn" onclick="confiromOrder()">Confirom Order</button>`;
}
else{
  submit_order.innerHTML = ''
}
}


function totalCartItems (){
  let tmp = 0;
  cartItems.map((item,i) => {
    return tmp = tmp + (item.qty);
  })
  cart_title.innerText = `Your Cart (${tmp})`
}

function removeItemFromCart (i){
  // console.log(index)
let targetItem = cartItems[i];
let counter = targetItem.counter;


const counterElement = document.getElementById(`counter${counter}`); 
const cruntItem = document.getElementById(`cart_btn_id${counter}`);
const counter_btn_id = document.getElementById(`counter_btn_id${counter}`);


counterElement.innerText =0;
cruntItem.classList.remove('hide');
counter_btn_id.classList.add('hide');
cartItems = cartItems.filter((item, i) => {
  return item.name !== targetItem.name
});
setCartDivData();
cartItems !== 0 ? grandTotal() : '';
console.log(cartItems)

}

function confiromOrder (){
  prompt_box.classList.remove('hide');
 let confiromOrder = cartItems.map((item,i)=> {
  // let n = item.name;
  let idNum = item.counter;
  let image_div_id = document.getElementById(`image_div_id${idNum}`)

  image_div_id.classList.add('image_border');


return ` 
<div class="cart_item confirom_box_model">
  <div class="confirom_item_left"><img src="${item.thumbnail}" /></div>
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
function emptyCart (){
  productsOuter.innerHTML = arr;
  cartItems = [];
  console.log(cartItems)
  cartItems !== 0 ? grandTotal() : '';
totalCartItems();
setCartDivData();
prompt_box.classList.add('hide');



  // window.location.reload()
}