// Cart Management Class
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.currentPage = "cart-page";
    this.init();
  }

  init() {
    this.renderCart();
    this.setupEventListeners();
    this.updateCartCount();
  }

  setupEventListeners() {
    // Event delegation for cart items
    document
      .getElementById("cart-items-container")
      .addEventListener("click", (e) => {
        const target = e.target;

        // Handle quantity decrease
        if (target.classList.contains("quantity-decrease")) {
          const id = target.closest(".cart-item").dataset.id;
          this.decreaseQuantity(id);
        }

        // Handle quantity increase
        if (target.classList.contains("quantity-increase")) {
          const id = target.closest(".cart-item").dataset.id;
          this.increaseQuantity(id);
        }

        // Handle remove item
        if (target.classList.contains("cart-item-remove")) {
          const id = target.closest(".cart-item").dataset.id;
          this.removeItem(id);
        }
      });

    // Event delegation for checkout items
    document
      .getElementById("order-items-container")
      .addEventListener("click", (e) => {
        const target = e.target;

        // Handle quantity decrease
        if (target.classList.contains("quantity-decrease")) {
          const id = target.closest(".order-item").dataset.id;
          this.decreaseQuantity(id);
        }

        // Handle quantity increase
        if (target.classList.contains("quantity-increase")) {
          const id = target.closest(".order-item").dataset.id;
          this.increaseQuantity(id);
        }
      });

    // Go to checkout button
    document.getElementById("go-to-checkout").addEventListener("click", () => {
      if (this.cart.length > 0) {
        this.navigateToPage("checkout-page");
      } else {
        alert("Giỏ hàng của bạn đang trống!");
      }
    });

    // Payment method selection
    document.querySelectorAll(".payment-method").forEach((method) => {
      method.addEventListener("click", () => {
        document.querySelectorAll(".payment-method").forEach((m) => {
          m.classList.remove("selected");
        });
        method.classList.add("selected");
      });
    });

    // Complete order button
    document.getElementById("complete-order").addEventListener("click", () => {
      if (this.validateCheckoutForm()) {
        this.processOrder();
      }
    });

    // Form validation
    document.querySelectorAll(".form-input").forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });
    });
  }

  renderCart() {
    this.renderCartItems();
    this.renderOrderItems();
    this.renderConfirmationItems();
    this.updateTotals();
  }

  renderCartItems() {
    const container = document.getElementById("cart-items-container");

    if (this.cart.length === 0) {
      container.innerHTML = `
                  <div class="empty-cart">
                      <i class="fas fa-shopping-cart"></i>
                      <p>Giỏ hàng của bạn đang trống</p>
                      <button class="btn btn-continue" onclick="window.location.href='index.html'">
                          <i class="fas fa-arrow-left"></i> Tiếp tục mua hàng
                      </button>
                  </div>
              `;
      return;
    }

    container.innerHTML = this.cart
      .map(
        (item) => `
              <div class="cart-item" data-id="${item.id}">
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-item-info">
                      <div class="cart-item-name">${item.name}</div>
                      <div class="cart-item-sku">Mã: ${item.sku}</div>
                      <div class="cart-item-price">${this.formatPrice(
                        item.price
                      )}</div>
                  </div>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn quantity-decrease" ${
                        item.quantity <= 1 ? "disabled" : ""
                      }>
                          <i class="fas fa-minus"></i>
                      </button>
                      <input type="number" class="quantity-input" value="${
                        item.quantity
                      }" min="1" readonly>
                      <button class="quantity-btn quantity-increase">
                          <i class="fas fa-plus"></i>
                      </button>
                  </div>
                  <div class="cart-item-total">${this.formatPrice(
                    item.price * item.quantity
                  )}</div>
                  <div class="cart-item-remove">
                      <i class="fas fa-trash"></i>
                  </div>
              </div>
          `
      )
      .join("");
  }

  renderOrderItems() {
    const container = document.getElementById("order-items-container");

    if (this.cart.length === 0) {
      container.innerHTML = "<p>Giỏ hàng trống</p>";
      return;
    }

    container.innerHTML = this.cart
      .map(
        (item) => `
              <div class="order-item" data-id="${item.id}">
                  <div class="order-item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="order-item-info">
                      <div class="order-item-name">${item.name}</div>
                      <div class="order-item-price">${this.formatPrice(
                        item.price
                      )}</div>
                      <div class="order-item-quantity">
                          <button class="quantity-btn quantity-decrease" ${
                            item.quantity <= 1 ? "disabled" : ""
                          }>
                              <i class="fas fa-minus"></i>
                          </button>
                          <span>${item.quantity}</span>
                          <button class="quantity-btn quantity-increase">
                              <i class="fas fa-plus"></i>
                          </button>
                      </div>
                  </div>
              </div>
          `
      )
      .join("");
  }

  renderConfirmationItems() {
    const container = document.getElementById("confirmation-items-body");

    if (this.cart.length === 0) {
      container.innerHTML = '<tr><td colspan="4">Không có sản phẩm</td></tr>';
      return;
    }

    container.innerHTML = this.cart
      .map(
        (item) => `
              <tr>
                  <td class="item-name">${item.name}</td>
                  <td>${item.quantity}</td>
                  <td style="text-align: right" class="item-price">${this.formatPrice(
                    item.price
                  )}</td>
                  <td style="text-align: right" class="item-price">${this.formatPrice(
                    item.price * item.quantity
                  )}</td>
              </tr>
          `
      )
      .join("");
  }

  updateTotals() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = subtotal * 0.2; // 20% discount
    const total = subtotal - discount;

    // Update cart page totals
    document.getElementById("subtotal").textContent =
      this.formatPrice(subtotal);
    document.getElementById("discount").textContent = `-${this.formatPrice(
      discount
    )}`;
    document.getElementById("total").textContent = this.formatPrice(total);

    // Update checkout page totals
    document.getElementById("checkout-subtotal").textContent =
      this.formatPrice(subtotal);
    document.getElementById(
      "checkout-discount"
    ).textContent = `-${this.formatPrice(discount)}`;
    document.getElementById("checkout-total").textContent =
      this.formatPrice(total);

    // Update confirmation page totals
    document.getElementById("confirmation-subtotal").textContent =
      this.formatPrice(subtotal);
    document.getElementById(
      "confirmation-discount"
    ).textContent = `-${this.formatPrice(discount)}`;
    document.getElementById("confirmation-total").textContent =
      this.formatPrice(total);
  }

  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
  }

  increaseQuantity(id) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity++;
      this.saveCart();
      this.renderCart();
      this.updateCartCount();
    }
  }

  decreaseQuantity(id) {
    const item = this.cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
      this.renderCart();
      this.updateCartCount();
    }
  }

  removeItem(id) {
    const itemElement = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (itemElement) {
      itemElement.classList.add("removing");
      setTimeout(() => {
        this.cart = this.cart.filter((item) => item.id !== id);
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
      }, 300);
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  navigateToPage(pageId) {
    document.querySelectorAll(".page-section").forEach((page) => {
      page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
    this.currentPage = pageId;

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById("breadcrumb-current");
    if (pageId === "cart-page") {
      breadcrumbCurrent.textContent = "Giỏ hàng";
    } else if (pageId === "checkout-page") {
      breadcrumbCurrent.textContent = "Thanh toán";
    } else if (pageId === "confirmation-page") {
      breadcrumbCurrent.textContent = "Xác nhận đơn hàng";
    }
  }

  validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);

    if (field.hasAttribute("required") && !field.value.trim()) {
      field.classList.add("error");
      errorElement.style.display = "block";
      return false;
    } else {
      field.classList.remove("error");
      errorElement.style.display = "none";
      return true;
    }
  }

  validateCheckoutForm() {
    const requiredFields = ["fullname", "phone", "address", "city", "district"];
    let isValid = true;

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  processOrder() {
    // Get form data
    const orderData = {
      fullname: document.getElementById("fullname").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").options[
        document.getElementById("city").selectedIndex
      ].text,
      district:
        document.getElementById("district").options[
          document.getElementById("district").selectedIndex
        ].text,
      note: document.getElementById("note").value,
      paymentMethod: document.querySelector(".payment-method.selected").dataset
        .method,
      orderDate: new Date().toLocaleDateString("vi-VN"),
      orderId: "#WS" + Math.floor(100000 + Math.random() * 900000),
    };

    // Update confirmation page with order data
    document.getElementById("order-id").textContent = orderData.orderId;
    document.getElementById("order-date").textContent = orderData.orderDate;
    document.getElementById("payment-method").textContent =
      this.getPaymentMethodName(orderData.paymentMethod);
    document.getElementById("customer-name").textContent = orderData.fullname;
    document.getElementById("customer-phone").textContent = orderData.phone;
    document.getElementById("customer-email").textContent =
      orderData.email || "Không có";
    document.getElementById(
      "customer-address"
    ).textContent = `${orderData.address}, ${orderData.district}, ${orderData.city}`;

    if (orderData.note) {
      document.getElementById("note-text").textContent = orderData.note;
    } else {
      document.getElementById("customer-note").style.display = "none";
    }

    // Attach items and totals to orderData
    const items = (this.cart || []).map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price }));
    const total = items.reduce((s, it) => s + (it.price * it.quantity), 0);
    orderData.items = items;
    orderData.total = total;
    orderData.status = 'pending';

    // Try to associate with logged-in user by id (fallback to phone)
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
      const idCustomer = (currentUser && currentUser.id) ? currentUser.id : null;
      orderData.id_Customer = idCustomer;

      // Save into centralized usersOrders store
      const usersOrdersStr = localStorage.getItem('usersOrders');
      const usersOrders = usersOrdersStr ? JSON.parse(usersOrdersStr) : [];
      usersOrders.push(orderData);
      localStorage.setItem('usersOrders', JSON.stringify(usersOrders));
    } catch (e) {
      console.error('Failed to save order to usersOrders', e);
    }

    // Clear cart
    this.cart = [];
    this.saveCart();
    this.updateCartCount();

    // Navigate to confirmation page
    this.navigateToPage("confirmation-page");
  }

  getPaymentMethodName(method) {
    const methods = {
      cod: "COD (Thanh toán khi nhận hàng)",
      banking: "Chuyển khoản ngân hàng",
      momo: "Ví MoMo",
    };
    return methods[method] || method;
  }

  formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", () => {
  const cartManager = new CartManager();

  // Add sample data if cart is empty
  if (cartManager.cart.length === 0) {
    cartManager.cart = [
      {
        id: "1",
        name: "Đồng hồ Nam Citizen Eco-Drive",
        sku: "WS001",
        price: 4500000,
        quantity: 1,
        image: "https://via.placeholder.com/100x100?text=Watch1",
      },
      {
        id: "2",
        name: "Đồng hồ Nữ Casio LTP-V300L",
        sku: "WS002",
        price: 2500000,
        quantity: 1,
        image: "https://via.placeholder.com/100x100?text=Watch2",
      },
    ];
    cartManager.saveCart();
    cartManager.renderCart();
    cartManager.updateCartCount();
  }
});
