class WatchStoreApp {
    constructor() {
      this.currentPage = "giohang";
      this.cartData = this.getCartData();
      this.init();
    }
  
    /**
     * KHỞI TẠO ỨNG DỤNG
     */
    init() {
      console.log("🛍️ Khởi tạo WatchStore App...");
  
      // Xử lý routing dựa trên URL
      this.handleRouting();
  
      // Thiết lập sự kiện navigation
      this.setupNavigation();
  
      // Khởi tạo trang hiện tại
      this.renderCurrentPage();
    }
  
    /**
     * XỬ LÝ ROUTING
     */
    handleRouting() {
      const path = window.location.hash.replace("#", "") || "giohang";
      this.currentPage = path;
    }
  
    /**
     * THIẾT LẬP NAVIGATION
     */
    setupNavigation() {
      // Xử lý sự kiện click trên các link
      document.addEventListener("click", (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
          e.preventDefault();
          const page = link.getAttribute("href").replace("#", "");
          this.navigateTo(page);
        }
      });
  
      // Xử lý sự kiện popstate (back/forward)
      window.addEventListener("popstate", () => {
        this.handleRouting();
        this.renderCurrentPage();
      });
    }
  
    /**
     * CHUYỂN HƯỚNG ĐẾN TRANG
     */
    navigateTo(page) {
      this.currentPage = page;
      window.location.hash = page;
      this.renderCurrentPage();
    }
  
    /**
     * HIỂN THỊ TRANG HIỆN TẠI
     */
    renderCurrentPage() {
      const app = document.getElementById("app");
  
      switch (this.currentPage) {
        case "giohang":
          app.innerHTML = this.renderCartPage();
          this.initCartPage();
          break;
        case "thanhtoan":
          app.innerHTML = this.renderCheckoutPage();
          this.initCheckoutPage();
          break;
        case "xemlai":
          app.innerHTML = this.renderConfirmationPage();
          this.initConfirmationPage();
          break;
        default:
          app.innerHTML = this.renderCartPage();
          this.initCartPage();
      }
    }
  
    /**
     * =============================================
     * TRANG GIỎ HÀNG
     * =============================================
     */
  
    renderCartPage() {
      return `
              <div class="container">
                  <div class="breadcrumb">
                      <a href="#giohang">Trang chủ</a> > <a href="#giohang">Giỏ hàng</a>
                  </div>
  
                  <div class="cart-section">
                      <h1 class="cart-title">Giỏ Hàng</h1>
  
                      <div class="cart-items" id="cart-items-container">
                          <!-- Sản phẩm sẽ được thêm bằng JavaScript -->
                      </div>
  
                      <div class="cart-summary">
                          <div class="summary-row">
                              <span>Tạm tính:</span>
                              <span id="subtotal">0₫</span>
                          </div>
                          <div class="summary-row">
                              <span>Phí vận chuyển:</span>
                              <span id="shipping">Miễn phí</span>
                          </div>
                          <div class="summary-row">
                              <span>Giảm giá (20%):</span>
                              <span id="discount">-0₫</span>
                          </div>
                          <div class="summary-row total">
                              <span>Tổng cộng:</span>
                              <span id="total">0₫</span>
                          </div>
                      </div>
  
                      <div class="cart-actions">
                          <button class="btn btn-continue" onclick="app.navigateTo('trangchu')">
                              <i class="fas fa-arrow-left"></i> Tiếp tục mua hàng
                          </button>
                          <div class="cart-action-buttons">
                            <button class="btn btn-reset" onclick="app.resetToSampleCart()">
                                <i class="fas fa-sync-alt"></i> Reset Mẫu
                            </button>
                            <button class="btn btn-checkout" onclick="app.navigateTo('thanhtoan')">
                                Thanh toán <i class="fas fa-arrow-right"></i>
                            </button>
                          </div>
                      </div>
                  </div>
              </div>
          `;
    }
  
    initCartPage() {
      this.ensureSampleProducts(); // Đảm bảo có sản phẩm mẫu
      this.renderCartItems();
      this.updateCartSummary();
      this.updateCartCount();
      this.setupCartEventListeners();
    }
  
    /**
     * =============================================
     * TRANG THANH TOÁN
     * =============================================
     */
  
    renderCheckoutPage() {
      return `
              <div class="container">
                  <div class="breadcrumb">
                      <a href="#giohang">Trang chủ</a> >
                      <a href="#giohang">Giỏ hàng</a> >
                      <a href="#thanhtoan">Thanh toán</a>
                  </div>
  
                  <div class="checkout-section">
                      <div class="checkout-form">
                          <h1 class="checkout-title">Thanh Toán</h1>
  
                          <div class="form-section">
                              <h3 class="section-title"><i class="fas fa-user"></i> Thông tin khách hàng</h3>
                              <div class="form-row">
                                  <div class="form-group">
                                      <label class="form-label" for="fullname">Họ và tên *</label>
                                      <input type="text" id="fullname" class="form-input" placeholder="Nhập họ và tên" required>
                                  </div>
                                  <div class="form-group">
                                      <label class="form-label" for="phone">Số điện thoại *</label>
                                      <input type="tel" id="phone" class="form-input" placeholder="Nhập số điện thoại" required>
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label class="form-label" for="email">Email</label>
                                  <input type="email" id="email" class="form-input" placeholder="Nhập email (không bắt buộc)">
                              </div>
                          </div>
  
                          <div class="form-section">
                              <h3 class="section-title"><i class="fas fa-map-marker-alt"></i> Địa chỉ giao hàng</h3>
                              <div class="form-group">
                                  <label class="form-label" for="address">Địa chỉ *</label>
                                  <input type="text" id="address" class="form-input" placeholder="Nhập địa chỉ giao hàng" required>
                              </div>
                              <div class="form-row">
                                  <div class="form-group">
                                      <label class="form-label" for="city">Tỉnh/Thành phố *</label>
                                      <select id="city" class="form-input" required>
                                          <option value="">Chọn tỉnh/thành phố</option>
                                          <option value="hcm">TP. Hồ Chí Minh</option>
                                          <option value="hn">Hà Nội</option>
                                          <option value="dn">Đà Nẵng</option>
                                      </select>
                                  </div>
                                  <div class="form-group">
                                      <label class="form-label" for="district">Quận/Huyện *</label>
                                      <select id="district" class="form-input" required>
                                          <option value="">Chọn quận/huyện</option>
                                          <option value="q1">Quận 1</option>
                                          <option value="q2">Quận 2</option>
                                          <option value="q3">Quận 3</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label class="form-label" for="note">Ghi chú đơn hàng</label>
                                  <textarea id="note" class="form-input" rows="3" placeholder="Ghi chú về đơn hàng (không bắt buộc)"></textarea>
                              </div>
                          </div>
  
                          <div class="form-section">
                              <h3 class="section-title"><i class="fas fa-credit-card"></i> Phương thức thanh toán</h3>
                              <div class="payment-methods">
                                  <div class="payment-method selected" data-method="cod">
                                      <div class="payment-header">
                                          <div class="payment-icon"><i class="fas fa-money-bill-wave"></i></div>
                                          <div class="payment-name">Thanh toán khi nhận hàng (COD)</div>
                                      </div>
                                      <div class="payment-description">Thanh toán bằng tiền mặt khi nhận được hàng</div>
                                  </div>
                                  <div class="payment-method" data-method="banking">
                                      <div class="payment-header">
                                          <div class="payment-icon"><i class="fas fa-university"></i></div>
                                          <div class="payment-name">Chuyển khoản ngân hàng</div>
                                      </div>
                                      <div class="payment-description">Chuyển khoản qua tài khoản ngân hàng</div>
                                  </div>
                                  <div class="payment-method" data-method="momo">
                                      <div class="payment-header">
                                          <div class="payment-icon"><i class="fas fa-mobile-alt"></i></div>
                                          <div class="payment-name">Ví MoMo</div>
                                      </div>
                                      <div class="payment-description">Thanh toán qua ứng dụng MoMo</div>
                                  </div>
                              </div>
                          </div>
  
                          <button class="btn btn-checkout" id="complete-order">
                              <i class="fas fa-lock"></i> Hoàn tất đơn hàng
                          </button>
                      </div>
  
                      <div class="order-summary">
                          <h3 class="section-title">Đơn hàng của bạn</h3>
                          <div class="order-items" id="order-items-container"></div>
                          <div class="order-totals">
                              <div class="total-row"><span>Tạm tính:</span><span id="checkout-subtotal">0₫</span></div>
                              <div class="total-row"><span>Phí vận chuyển:</span><span id="checkout-shipping">Miễn phí</span></div>
                              <div class="total-row"><span>Giảm giá:</span><span id="checkout-discount">-0₫</span></div>
                              <div class="total-row final"><span>Tổng cộng:</span><span id="checkout-total">0₫</span></div>
                          </div>
                      </div>
                  </div>
              </div>
          `;
    }
  
    initCheckoutPage() {
      if (!this.cartData || this.cartData.items.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        this.navigateTo("giohang");
        return;
      }
  
      this.renderOrderItems();
      this.updateCheckoutTotals();
      this.updateCartCount();
      this.setupPaymentMethods();
      this.setupCheckoutForm();
    }
  
    /**
     * =============================================
     * TRANG XÁC NHẬN ĐƠN HÀNG
     * =============================================
     */
  
    renderConfirmationPage() {
      // Lấy thông tin đơn hàng từ localStorage
      const orderInfo = this.getOrderInfo();
  
      return `
              <div class="container">
                  <div class="breadcrumb">
                      <a href="#giohang">Trang chủ</a> >
                      <a href="#giohang">Giỏ hàng</a> >
                      <a href="#thanhtoan">Thanh toán</a> >
                      <a href="#xemlai">Xem lại đơn hàng</a>
                  </div>
  
                  <div class="confirmation-section">
                      <div class="confirmation-box">
                          <i class="fas fa-check-circle confirmation-icon"></i>
                          <h1 class="confirmation-title">Đặt Hàng Thành Công!</h1>
                          <p class="confirmation-text">
                              Cảm ơn bạn đã tin tưởng và đặt hàng tại WatchStore. Dưới đây là thông tin chi tiết đơn hàng của bạn.
                          </p>
  
                          <div class="order-info-grid">
                              <div class="info-card">
                                  <h4><i class="fas fa-file-invoice"></i> Chi tiết Đơn hàng</h4>
                                  <p><strong>Mã đơn hàng:</strong> <span id="order-id">${
                                    orderInfo.orderId
                                  }</span></p>
                                  <p><strong>Ngày đặt hàng:</strong> <span id="order-date">${
                                    orderInfo.orderDate
                                  }</span></p>
                                  <p><strong>Phương thức thanh toán:</strong> <span id="payment-method">${this.getPaymentMethodName(
                                    orderInfo.paymentMethod
                                  )}</span></p>
                                  <p><strong>Trạng thái:</strong> Đang chờ xác nhận</p>
                              </div>
  
                              <div class="info-card">
                                  <h4><i class="fas fa-user"></i> Thông tin Khách hàng</h4>
                                  <p><strong>Họ tên:</strong> <span id="customer-name">${
                                    orderInfo.customer.fullname
                                  }</span></p>
                                  <p><strong>Số điện thoại:</strong> <span id="customer-phone">${
                                    orderInfo.customer.phone
                                  }</span></p>
                                  <p><strong>Email:</strong> <span id="customer-email">${
                                    orderInfo.customer.email || "Không có"
                                  }</span></p>
                                  <p><strong>Địa chỉ giao hàng:</strong> <span id="customer-address">${
                                    orderInfo.customer.address
                                  }, ${this.getDistrictName(
        orderInfo.customer.district
      )}, ${this.getCityName(orderInfo.customer.city)}</span></p>
                                  ${
                                    orderInfo.customer.note
                                      ? `<p><strong>Ghi chú:</strong> ${orderInfo.customer.note}</p>`
                                      : ""
                                  }
                              </div>
                          </div>
  
                          <div class="order-details">
                              <h4 style="margin: 30px 0 15px 0; color: #333;">Chi tiết sản phẩm</h4>
                              <table class="order-details-table">
                                  <thead>
                                      <tr>
                                          <th>Sản phẩm</th>
                                          <th>Đơn giá</th>
                                          <th>Số lượng</th>
                                          <th>Thành tiền</th>
                                      </tr>
                                  </thead>
                                  <tbody id="confirmation-items">
                                      <!-- Sản phẩm sẽ được thêm bằng JavaScript -->
                                  </tbody>
                              </table>
  
                              <div class="order-summary-footer">
                                  <div class="summary-row">
                                      <span>Tạm tính:</span>
                                      <span id="confirmation-subtotal">0₫</span>
                                  </div>
                                  <div class="summary-row">
                                      <span>Phí vận chuyển:</span>
                                      <span id="confirmation-shipping">Miễn phí</span>
                                  </div>
                                  <div class="summary-row">
                                      <span>Giảm giá:</span>
                                      <span id="confirmation-discount">-0₫</span>
                                  </div>
                                  <div class="summary-row final">
                                      <span>Tổng cộng:</span>
                                      <span id="confirmation-total">0₫</span>
                                  </div>
                              </div>
                          </div>
  
                          <a href="#giohang" class="btn-home" onclick="app.resetToSampleCart()">
                              <i class="fas fa-home"></i> Quay lại trang chủ
                          </a>
                      </div>
                  </div>
              </div>
          `;
    }
  
    initConfirmationPage() {
      this.renderConfirmationItems();
      this.updateConfirmationTotals();
      this.updateCartCount();
      // KHÔNG xóa giỏ hàng ngay, chỉ xóa khi quay lại trang chủ
    }
  
    /**
     * =============================================
     * QUẢN LÝ GIỎ HÀNG
     * =============================================
     */
  
    getCartData() {
      const savedCart = localStorage.getItem("watchstore_cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
  
      // Dữ liệu mẫu với nhiều sản phẩm đa dạng
      return {
        items: [
          {
            id: 1,
            name: "Đồng hồ Nam Citizen Eco-Drive AT2140-52L",
            sku: "WS001",
            price: 12500000,
            quantity: 1,
            image:
              "https://via.placeholder.com/100x100/4A90E2/FFFFFF?text=Citizen",
            category: "Nam",
          },
          {
            id: 2,
            name: "Đồng hồ Nữ Casio LTP-V300L-4AUDF",
            sku: "WS002",
            price: 3500000,
            quantity: 2,
            image: "https://via.placeholder.com/100x100/E74C3C/FFFFFF?text=Casio",
            category: "Nữ",
          },
          {
            id: 3,
            name: "Đồng hồ Thể thao Seiko 5 Sports",
            sku: "WS003",
            price: 8900000,
            quantity: 1,
            image: "https://via.placeholder.com/100x100/27AE60/FFFFFF?text=Seiko",
            category: "Thể thao",
          },
          {
            id: 4,
            name: "Đồng hồ Cao cấp Tissot Le Locle",
            sku: "WS004",
            price: 18500000,
            quantity: 1,
            image:
              "https://via.placeholder.com/100x100/8E44AD/FFFFFF?text=Tissot",
            category: "Cao cấp",
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
    }
  
    saveCartData() {
      localStorage.setItem("watchstore_cart", JSON.stringify(this.cartData));
    }
  
    updateCartCount() {
      const totalItems = this.cartData.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const cartCountElement = document.getElementById("cart-count");
      if (cartCountElement) {
        cartCountElement.textContent = totalItems;
      }
    }
  
    /**
     * ĐẢM BẢO LUÔN CÓ SẢN PHẨM MẪU
     */
    ensureSampleProducts() {
      if (!this.cartData.items || this.cartData.items.length === 0) {
        console.log("🛒 Giỏ hàng trống, đang thêm sản phẩm mẫu...");
        this.cartData = this.getCartData();
        this.saveCartData();
      }
    }
  
    /**
     * RESET GIỎ HÀNG VỀ MẪU
     */
    resetToSampleCart() {
      if (confirm("Bạn có chắc muốn reset giỏ hàng về mẫu demo?")) {
        localStorage.removeItem("watchstore_cart");
        this.cartData = this.getCartData();
        this.saveCartData();
        this.renderCartItems();
        this.updateCartSummary();
        this.updateCartCount();
  
        // Hiển thị thông báo
        alert("Đã reset giỏ hàng về mẫu demo!");
      }
    }
  
    renderCartItems() {
      const container = document.getElementById("cart-items-container");
  
      if (!this.cartData || this.cartData.items.length === 0) {
        container.innerHTML = `
                  <div class="empty-cart">
                      <i class="fas fa-shopping-cart"></i>
                      <p>Giỏ hàng của bạn đang trống</p>
                      <button class="btn btn-continue" onclick="app.resetToSampleCart()">
                          <i class="fas fa-sync-alt"></i> Tải sản phẩm mẫu
                      </button>
                  </div>
              `;
        return;
      }
  
      container.innerHTML = this.cartData.items
        .map(
          (item) => `
              <div class="cart-item" data-id="${item.id}">
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-item-info">
                      <h3 class="cart-item-name">${item.name}</h3>
                      <p class="cart-item-sku">Mã SP: ${item.sku}</p>
                      <div class="cart-item-price">${this.formatPrice(
                        item.price
                      )}</div>
                  </div>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn" onclick="app.decreaseQuantity(${
                        item.id
                      })">-</button>
                      <input type="number" class="quantity-input" value="${
                        item.quantity
                      }" min="1" 
                             onchange="app.updateQuantity(${
                               item.id
                             }, this.value)">
                      <button class="quantity-btn" onclick="app.increaseQuantity(${
                        item.id
                      })">+</button>
                  </div>
                  <div class="cart-item-total">${this.formatPrice(
                    item.price * item.quantity
                  )}</div>
                  <div class="cart-item-remove" onclick="app.removeFromCart(${
                    item.id
                  })">
                      <i class="fas fa-trash"></i>
                  </div>
              </div>
          `
        )
        .join("");
    }
  
    renderOrderItems() {
      const container = document.getElementById("order-items-container");
      container.innerHTML = this.cartData.items
        .map(
          (item) => `
              <div class="order-item">
                  <div class="order-item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="order-item-info">
                      <div class="order-item-name">${item.name}</div>
                      <div class="order-item-price">${this.formatPrice(
                        item.price
                      )}</div>
                      <div class="order-item-quantity">Số lượng: ${
                        item.quantity
                      }</div>
                  </div>
              </div>
          `
        )
        .join("");
    }
  
    renderConfirmationItems() {
      const container = document.getElementById("confirmation-items");
      const orderInfo = this.getOrderInfo();
      const items = orderInfo.cartItems || this.cartData.items;
  
      container.innerHTML = items
        .map(
          (item) => `
              <tr>
                  <td class="item-name">${item.name}</td>
                  <td class="item-price">${this.formatPrice(item.price)}</td>
                  <td>${item.quantity}</td>
                  <td class="item-price">${this.formatPrice(
                    item.price * item.quantity
                  )}</td>
              </tr>
          `
        )
        .join("");
    }
  
    /**
     * =============================================
     * TÍNH TOÁN VÀ CẬP NHẬT TỔNG TIỀN
     * =============================================
     */
  
    calculateTotals() {
      const subtotal = this.cartData.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const discount = subtotal * 0.2; // Giảm giá 20%
      const total = subtotal - discount;
  
      return { subtotal, discount, total };
    }
  
    updateCartSummary() {
      const { subtotal, discount, total } = this.calculateTotals();
  
      const subtotalElement = document.getElementById("subtotal");
      const discountElement = document.getElementById("discount");
      const totalElement = document.getElementById("total");
  
      if (subtotalElement)
        subtotalElement.textContent = this.formatPrice(subtotal);
      if (discountElement)
        discountElement.textContent = `-${this.formatPrice(discount)}`;
      if (totalElement) totalElement.textContent = this.formatPrice(total);
    }
  
    updateCheckoutTotals() {
      const { subtotal, discount, total } = this.calculateTotals();
  
      const subtotalElement = document.getElementById("checkout-subtotal");
      const discountElement = document.getElementById("checkout-discount");
      const totalElement = document.getElementById("checkout-total");
  
      if (subtotalElement)
        subtotalElement.textContent = this.formatPrice(subtotal);
      if (discountElement)
        discountElement.textContent = `-${this.formatPrice(discount)}`;
      if (totalElement) totalElement.textContent = this.formatPrice(total);
    }
  
    updateConfirmationTotals() {
      const orderInfo = this.getOrderInfo();
      const items = orderInfo.cartItems || this.cartData.items;
  
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const discount = subtotal * 0.2;
      const total = subtotal - discount;
  
      const subtotalElement = document.getElementById("confirmation-subtotal");
      const discountElement = document.getElementById("confirmation-discount");
      const totalElement = document.getElementById("confirmation-total");
  
      if (subtotalElement)
        subtotalElement.textContent = this.formatPrice(subtotal);
      if (discountElement)
        discountElement.textContent = `-${this.formatPrice(discount)}`;
      if (totalElement) totalElement.textContent = this.formatPrice(total);
    }
  
    /**
     * =============================================
     * THAO TÁC VỚI GIỎ HÀNG
     * =============================================
     */
  
    increaseQuantity(productId) {
      const item = this.cartData.items.find((item) => item.id === productId);
      if (item) {
        item.quantity++;
        this.saveCartData();
        this.renderCartItems();
        this.updateCartSummary();
        this.updateCartCount();
      }
    }
  
    decreaseQuantity(productId) {
      const item = this.cartData.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.saveCartData();
        this.renderCartItems();
        this.updateCartSummary();
        this.updateCartCount();
      }
    }
  
    updateQuantity(productId, newQuantity) {
      const quantity = parseInt(newQuantity);
      if (quantity > 0) {
        const item = this.cartData.items.find((item) => item.id === productId);
        if (item) {
          item.quantity = quantity;
          this.saveCartData();
          this.renderCartItems();
          this.updateCartSummary();
          this.updateCartCount();
        }
      }
    }
  
    removeFromCart(productId) {
      if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        this.cartData.items = this.cartData.items.filter(
          (item) => item.id !== productId
        );
        this.saveCartData();
        this.renderCartItems();
        this.updateCartSummary();
        this.updateCartCount();
      }
    }
  
    clearCart() {
      this.cartData.items = [];
      this.saveCartData();
      this.updateCartCount();
    }
  
    /**
     * =============================================
     * XỬ LÝ THANH TOÁN
     * =============================================
     */
  
    setupPaymentMethods() {
      const paymentMethods = document.querySelectorAll(".payment-method");
      paymentMethods.forEach((method) => {
        method.addEventListener("click", () => {
          paymentMethods.forEach((m) => m.classList.remove("selected"));
          method.classList.add("selected");
        });
      });
    }
  
    setupCheckoutForm() {
      const completeOrderBtn = document.getElementById("complete-order");
      if (completeOrderBtn) {
        completeOrderBtn.addEventListener("click", () => {
          this.processOrder();
        });
      }
  
      // Điền dữ liệu mẫu để testing
      this.fillSampleData();
    }
  
    processOrder() {
      // Lấy thông tin từ form
      const fullname = document.getElementById("fullname").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;
      const city = document.getElementById("city").value;
      const district = document.getElementById("district").value;
      const note = document.getElementById("note").value;
      const paymentMethod = document.querySelector(".payment-method.selected")
        ?.dataset.method;
  
      // Kiểm tra thông tin bắt buộc
      if (!fullname || !phone || !address || !city || !district) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc (*)");
        return;
      }
  
      // Lưu thông tin đơn hàng
      const orderInfo = {
        customer: {
          fullname,
          phone,
          email,
          address,
          city,
          district,
          note,
        },
        paymentMethod,
        orderDate: new Date().toLocaleDateString("vi-VN"),
        orderId: `WS${Date.now().toString().slice(-6)}`,
        cartItems: [...this.cartData.items], // Lưu cả giỏ hàng
      };
  
      localStorage.setItem("watchstore_order", JSON.stringify(orderInfo));
  
      // Chuyển đến trang xác nhận
      this.navigateTo("xemlai");
    }
  
    /**
     * =============================================
     * TIỆN ÍCH MỚI
     * =============================================
     */
  
    // Lấy thông tin đơn hàng từ localStorage
    getOrderInfo() {
      const savedOrder = localStorage.getItem("watchstore_order");
      if (savedOrder) {
        return JSON.parse(savedOrder);
      }
  
      // Trả về dữ liệu mẫu nếu không có
      return {
        customer: {
          fullname: "Nguyễn Văn A",
          phone: "0123456789",
          email: "nguyenvana@gmail.com",
          address: "123 Nguyễn Trãi",
          city: "hcm",
          district: "q1",
          note: "",
        },
        paymentMethod: "cod",
        orderDate: new Date().toLocaleDateString("vi-VN"),
        orderId: `WS${Date.now().toString().slice(-6)}`,
        cartItems: this.cartData.items,
      };
    }
  
    // Chuyển đổi mã phương thức thanh toán thành tên
    getPaymentMethodName(method) {
      const methods = {
        cod: "COD (Thanh toán khi nhận hàng)",
        banking: "Chuyển khoản ngân hàng",
        momo: "Ví MoMo",
      };
      return methods[method] || "COD (Thanh toán khi nhận hàng)";
    }
  
    // Chuyển đổi mã thành phố thành tên
    getCityName(cityCode) {
      const cities = {
        hcm: "TP. Hồ Chí Minh",
        hn: "Hà Nội",
        dn: "Đà Nẵng",
      };
      return cities[cityCode] || cityCode;
    }
  
    // Chuyển đổi mã quận thành tên
    getDistrictName(districtCode) {
      const districts = {
        q1: "Quận 1",
        q2: "Quận 2",
        q3: "Quận 3",
      };
      return districts[districtCode] || districtCode;
    }
  
    // Điền dữ liệu mẫu vào form thanh toán (cho testing)
    fillSampleData() {
      // Chỉ điền nếu các trường còn trống
      if (!document.getElementById("fullname").value) {
        document.getElementById("fullname").value = "Nguyễn Văn A";
      }
      if (!document.getElementById("phone").value) {
        document.getElementById("phone").value = "0123456789";
      }
      if (!document.getElementById("email").value) {
        document.getElementById("email").value = "nguyenvana@gmail.com";
      }
      if (!document.getElementById("address").value) {
        document.getElementById("address").value = "123 Nguyễn Trãi";
      }
      if (!document.getElementById("city").value) {
        document.getElementById("city").value = "hcm";
      }
      if (!document.getElementById("district").value) {
        document.getElementById("district").value = "q1";
      }
    }
  
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    }
  
    setupCartEventListeners() {
      // Các sự kiện đã được xử lý trực tiếp trong HTML
    }
  }
  
  // Khởi tạo ứng dụng
  const app = new WatchStoreApp();
