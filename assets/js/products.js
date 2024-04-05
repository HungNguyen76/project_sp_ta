function showCart() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartHTML = "";
    if (cartItems.length === 0) {
      cartHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    } else {
      cartHTML += "<ul>";
      cartItems.forEach(function (item) {
        cartHTML += `
              <li>
              <div>
                  <img src="${item.img1}" alt="${item.name}">
              </div>
              <div class="details">
                  <h4>${item.name}</h4>
                  <p> Money: ${item.price}</p>
                  <div>
                  <button onclick="decreaseQuantity('${item.id}')">-</button>
                  <span id="${item.id}-quantity">${item.quantity || 1}</span>
                  <button onclick="increaseQuantity('${item.id}')">+</button>
                  <button onclick="removeItem('${item.id}')">Xóa</button>
                  </div>
              </div>
              </li>
          `;
      });
      cartHTML += "</ul>";

      
    }
    cartHTML +=  `<p class="total-price">Tổng tiền: ${calculateTotal()} VNĐ</p>`;

    document.getElementById("cart").innerHTML = cartHTML;
  }
  
  function decreaseQuantity(id) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = (cartItems[itemIndex].quantity || 1) - 1;
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      showCart();
    }
  }
  
  function increaseQuantity(id) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = (cartItems[itemIndex].quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      showCart();
    }
  }
  
  function removeItem(id) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showCart();
  }
  
  document.addEventListener("DOMContentLoaded", showCart);
  
  function calculateTotal() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
  
    cartItems.forEach(function (item) {
      let itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
      let itemTotal = itemPrice * (item.quantity || 1);
      total += itemTotal;
    });
  
    return total;
  }