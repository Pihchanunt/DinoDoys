let cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
let total = parseFloat(sessionStorage.getItem('total')) || 0;

updatecart();

function caltotal() {
    total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price) * item.quantity;
    });
    sessionStorage.setItem('total', total);
}

function cartcounter() {
    const counter = document.getElementById('cartcount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = `${totalItems}`;
}

function addcart(productname, price, quantity = 1) {
    const existingItem = cart.find(item => item.name === productname);
    
    if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity if already in cart
    } else {
        cart.push({ name: productname, price: parseFloat(price), quantity });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    caltotal();
    updatecart();
    cartcounter();
}

function updatecart() {
  const cartitems = document.getElementById('cart-items');
  cartitems.innerHTML = ''; // Clear the current cart display

  // Create table structure
  const table = document.createElement('table');
  table.innerHTML = `
      <thead>
          <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
  `;

  const tbody = table.querySelector('tbody');

  cart.forEach(item => {
      const itemTotalPrice = (item.price * item.quantity).toFixed(2);
      
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.name}</td>
          <td>฿${item.price.toFixed(2)}</td>
          <td>
              <button class="cart-button remove-button" aria-label="Remove one ${item.name}" onclick="removeQuantity('${item.name}')">-</button>
              <span>${item.quantity}</span>
              <button class="cart-button" aria-label="Add one ${item.name}" onclick="addQuantity('${item.name}')">+</button>
          </td>
          <td>฿${itemTotalPrice}</td>
      `;
      
      tbody.appendChild(row);
  });

  cartitems.appendChild(table); // Add the table to the cart display
  document.getElementById('total-price').textContent = `Total: ฿${total.toFixed(2)}`;
  cartcounter();
}

function addQuantity(productname) {
    const item = cart.find(item => item.name === productname);
    if (item) {
        item.quantity += 1; // Increase quantity by 1
        sessionStorage.setItem('cart', JSON.stringify(cart));
        caltotal();
        updatecart();
    }
}

function removeQuantity(productname) {
    const itemIndex = cart.findIndex(item => item.name === productname);
    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1; // Decrease quantity by 1
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity is 0
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        caltotal();
        updatecart();
    }
}

function removeall() {
    cart = [];
    total = 0;
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('total');
    updatecart();
}


filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("Active");
    current[0].className = current[0].className.replace(" Active", "");
    this.className += " Active";
  });
}

function changeImage(src) {
  document.getElementById('mainImage').src = src;
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumbnail => {
      thumbnail.classList.remove('active');
  });
  event.target.classList.add('active');
}

window.onload = function activatefilter() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('activatesale') === 'true') {
      document.getElementById('salefilter').click();
  }
  if (urlParams.get('activatenew') === 'true') {
      document.getElementById('newfilter').click();
  }
  if (urlParams.get('activatecars') === 'true') {
    document.getElementById('carsfilter').click();
  }
  if (urlParams.get('activatedolls') === 'true') {
    document.getElementById('dollsfilter').click();
  }
  if (urlParams.get('activatefigures') === 'true') {
    document.getElementById('figuresfilter').click();
  }
  if (urlParams.get('activatelegos') === 'true') {
    document.getElementById('legosfilter').click();
  }
}