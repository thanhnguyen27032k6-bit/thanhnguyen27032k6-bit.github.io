document.addEventListener("DOMContentLoaded", function () {
  // === MENU CHUYỂN TRANG ===
  const defaultContent = document.querySelectorAll(
    ".service-banner, .hotsale-product, .product-section, .about-section, .review-section"
  );
  const pages = document.querySelectorAll(".page");

  const links = {
    home: document.querySelector(".inner-logo a"),
    xuhuong: document.getElementById("xuhuong-link"),
    nam: document.getElementById("nam-link"),
    nu: document.getElementById("nu-link"),
  };
  function hienTrang(id) {
    pages.forEach((p) => p.classList.add("hidden"));
    defaultContent.forEach((c) => c.classList.add("hidden"));

    if (id === "home") {
      defaultContent.forEach((c) => c.classList.remove("hidden"));
    } else {
      const page = document.getElementById(id);
      if (page) {
        page.classList.remove("hidden");
      }
    }

    window.scrollTo(0, 0);
  }

  Object.keys(links).forEach((key) => {
    if (links[key]) {
      links[key].addEventListener("click", (e) => {
        e.preventDefault();
        hienTrang(key);
      });
    }
  });

  // === SLIDESHOW (banner) ===
  const slidesContainers = document.querySelectorAll(".slides");
  slidesContainers.forEach((slides) => {
    // Logic slideshow...
    const dots = slides.parentElement.querySelectorAll(".navigation li");
    const total = dots.length;
    let index = 0;

    function showSlide(i) {
      if (total > 0) {
        slides.style.marginLeft = `-${i * 100}%`;
      }
      dots.forEach((d) => d.classList.remove("kichhoat"));
      if (dots[i]) {
        dots[i].classList.add("kichhoat");
      }
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
      });
    });

    const slideInterval = setInterval(() => {
      index = (index + 1) % total;
      showSlide(index);
    }, 5000);

    showSlide(0);
  });

  // === TÌM KIẾM ===
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchResultsContainer = document.getElementById(
    "search-results-container"
  );
  const noResultsMessage = document.getElementById("no-results");

  function renderProductCard(product) {
    return `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)}</div>
        <div class="product-oldprice">${formatPrice(product.oldPrice)}</div>
        <button class="compare-btn" type="button">So sánh</button>
      </div>
    `;
  }
  
  
  function formatPrice(price) {
    if (!price) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  function renderPaginatedProducts(containerId, products, itemsPerPage = 12) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    // Xóa nội dung cũ
    container.innerHTML = "";
  
    // Tạo vùng chứa danh sách sản phẩm + pagination
    const productContainer = document.createElement("div");
    productContainer.className = "product-list";
    container.appendChild(productContainer);
  
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";
    container.appendChild(paginationContainer);
  
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / itemsPerPage);
  
    function renderPage(page) {
      productContainer.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const visibleProducts = products.slice(start, end);
  
      visibleProducts.forEach((p) => {
        productContainer.insertAdjacentHTML("beforeend", renderProductCard(p));
      });
  
      // Gắn lại sự kiện xem chi tiết
      if (typeof attachProductDetailEvents === "function") {
        attachProductDetailEvents();
      }
  
      renderPagination();
    }
  
    function renderPagination() {
      paginationContainer.innerHTML = "";
  
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "« Trước";
      prevBtn.disabled = currentPage === 1;
      prevBtn.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        }
      };
      paginationContainer.appendChild(prevBtn);
  
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        if (i === currentPage) pageBtn.classList.add("active");
        pageBtn.onclick = () => {
          currentPage = i;
          renderPage(currentPage);
        };
        paginationContainer.appendChild(pageBtn);
      }
  
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Sau »";
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
        }
      };
      paginationContainer.appendChild(nextBtn);
    }
  
    // Hiển thị trang đầu tiên
    renderPage(1);
  }
  // =================== HIỂN THỊ SẢN PHẨM CHÍNH CÓ PHÂN TRANG ===================

// Xu hướng 2025
const xuhuongProducts = window.getProducts({ category: "xuhuong" });
renderPaginatedProducts("xuhuong-products", xuhuongProducts, 8);

// Đồng hồ Nam
const namProducts = window.getProducts({ category: "nam" });
renderPaginatedProducts("nam-products", namProducts, 8);

// Đồng hồ Nữ
const nuProducts = window.getProducts({ category: "nu" });
renderPaginatedProducts("nu-products", nuProducts, 8);

// =================== HOT SALE (HIỂN THỊ TOÀN BỘ, KHÔNG PHÂN TRANG) ===================
const hotProducts = window.getProducts({ category: "hot" });
const hotContainer = document.getElementById("hotsale-products");

if (hotContainer && hotProducts.length > 0) {
  hotContainer.innerHTML = hotProducts
    .map(
      (p) => `
      <div class="product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.alt || p.name}">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-oldprice">${formatPrice(p.oldPrice)}</div>
        <button class="compare-btn" type="button">So sánh</button>
      </div>
    `
    )
    .join("");

  // Gắn lại sự kiện mở modal chi tiết cho sản phẩm Hot Sale
  if (typeof attachProductDetailEvents === "function") {
    attachProductDetailEvents();
  }
}


function performSearch() {
  const query = searchInput.value.toLowerCase().trim();
  hienTrang("search");

  searchResultsContainer.innerHTML = "";
  noResultsMessage.style.display = "none";

  if (query.length === 0) {
    noResultsMessage.textContent = "Vui lòng nhập từ khóa để tìm kiếm.";
    noResultsMessage.style.display = "block";
    return;
  }

  const filteredProducts = window.PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      (product.alt && product.alt.toLowerCase().includes(query))
  );

  if (filteredProducts.length > 0) {
    // ✅ Gọi hàm phân trang
    renderPaginatedProducts("search-results-container", filteredProducts, 12);
  } else {
    noResultsMessage.textContent = `Không tìm thấy sản phẩm nào cho từ khóa: "${searchInput.value}"`;
    noResultsMessage.style.display = "block";
  }
}

  
  
  searchButton.addEventListener("click", performSearch);
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
  //KHỞI TẠO CUỐI CÙNG
  hienTrang("home"); // Khởi tạo lần đầu

  function displayBrandProducts(brandName) {
    hienTrang("brand-detail");
    document.getElementById("brand-title").textContent =
      brandName.toUpperCase();

    const container = document.getElementById("brand-products-container");
    const noResults = document.getElementById("no-brand-products");
    container.innerHTML = "";

    // 🧩 Nhóm alias đặc biệt cho thương hiệu
    const brandAliases = {
      "G-Shock": ["G-Shock", "G-Shock"], // tránh lỗi ký tự khác nhau
      "Baby-G": ["Baby-G", "Baby G", "Casio Baby-G"],
      Casio: ["Casio"], // chỉ Casio thường
      "Olym Pianus": ["Olym Pianus", "Olympia Star"],
      Rolex: ["Rolex", "Giống Rolex"], // ✅ thêm alias cho Rolex
      Tissot: ["Tissot"],
      Orient: ["Orient"],
      Seiko: ["Seiko"],
      Citizen: ["Citizen"],
      "Bonest Gatti": ["Bonest Gatti"],
      Hanboro: ["Hanboro"],
      Movado: ["Movado"],
      "I&W Carnival": ["I&W Carnival", "Carnival"],
    };

    const keywords = brandAliases[brandName] || [brandName];

    // 🔍 Lấy toàn bộ sản phẩm có trong trang index
    const allProducts = Array.from(document.querySelectorAll(".product-card"));

    // 🔎 Lọc sản phẩm có tên hoặc alt chứa các từ khóa alias
    const filtered = allProducts.filter((card) => {
      const name =
        card.querySelector(".product-name")?.textContent.toLowerCase() || "";
      const alt = card.querySelector("img")?.alt.toLowerCase() || "";

      // Nếu đang lọc Casio → loại bỏ G-Shock
      if (brandName === "Casio") {
        return (
          (name.includes("casio") || alt.includes("casio")) &&
          !name.includes("g-shock") &&
          !alt.includes("g-shock")
        );
      }

      // Nếu đang lọc G-Shock → chỉ lấy có chữ G-Shock
      if (brandName === "G-Shock") {
        return name.includes("g-shock") || alt.includes("g-shock");
      }

      // Các hãng khác
      return keywords.some(
        (keyword) =>
          name.includes(keyword.toLowerCase()) ||
          alt.includes(keyword.toLowerCase())
      );
    });

    // 🎨 Hiển thị kết quả
    if (filtered.length > 0) {
      container.style.display = "flex";
      filtered.forEach((card) => {
        const img = card.querySelector("img");
        const name = card.querySelector(".product-name").textContent;
        const price = card.querySelector(".product-price").textContent;
        const oldPrice =
          card.querySelector(".product-oldprice")?.textContent || "";

        container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="product-card">
            <img src="${img.src}" alt="${img.alt}">
            <div class="product-name">${name}</div>
            <div class="product-price">${price}</div>
            <div class="product-oldprice">${oldPrice}</div>
            <button class="compare-btn" type="button">So sánh</button>
          </div>
        `
        );
      });

      noResults.style.display = "none";
      attachProductDetailEvents(); // Gắn lại modal chi tiết
    } else {
      container.style.display = "block";
      noResults.style.display = "block";
      noResults.textContent = `Không tìm thấy sản phẩm nào của hãng ${brandName.toUpperCase()}.`;
    }
  }

  // 5. Gắn sự kiện Click cho các thẻ hãng
  const brandLinks = document.querySelectorAll(
    ".product-categories .brand-link"
  );

  brandLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const brandName = this.getAttribute("data-brand");
      if (brandName) {
        displayBrandProducts(brandName);
        attachProductDetailEvents(); // Gắn lại sự kiện mở chi tiết cho sản phẩm mới
      }
    });
  });

  // === LỊCH SỬ XEM SẢN PHẨM ===
  const MAX_HISTORY_ITEMS = 15;
  const historySections = document.querySelectorAll(".viewed-history-section");

  // Hàm tạo thẻ sản phẩm trong lịch sử
  function renderHistoryItem(product) {
    const nameShort =
      product.name.length > 25
        ? product.name.substring(0, 25) + "..."
        : product.name;
    return `
      <div class="history-item">
        <div class="item-image">
          <img src="${product.image}" alt="${product.alt}">
        </div>
        <div class="item-details">
          <div class="item-name">${nameShort}</div>
          <div class="item-info">${product.alt || ""}</div>
          <div class="item-price">${product.price}</div>
        </div>
        <button class="item-remove" data-image="${
          product.image
        }">&times;</button>
      </div>
    `;
  }

  function removeHistoryItem(imagePath) {
    let history = JSON.parse(localStorage.getItem("viewedHistory")) || [];
    history = history.filter((item) => item.image !== imagePath);
    localStorage.setItem("viewedHistory", JSON.stringify(history));
    renderViewedHistory();
  }

  function clearViewedHistory() {
    localStorage.removeItem("viewedHistory");
    renderViewedHistory();
  }

  function attachHistoryEvents() {
    document.querySelectorAll(".clear-history-button").forEach((btn) => {
      btn.addEventListener("click", clearViewedHistory);
    });
    document.querySelectorAll(".item-remove").forEach((btn) => {
      btn.addEventListener("click", () => removeHistoryItem(btn.dataset.image));
    });
  }

  // Hiển thị danh sách lịch sử xem
  function renderViewedHistory() {
    const history = JSON.parse(localStorage.getItem("viewedHistory")) || [];
    historySections.forEach((section) => {
      const container = section.querySelector(".product-list");
      const noMsg = section.querySelector("p[id^='no-history-message']");
      const clearBtn = section.querySelector(".clear-history-button");
      container.innerHTML = "";

      if (history.length === 0) {
        section.classList.add("hidden-history");
        if (noMsg) noMsg.style.display = "block";
        if (clearBtn) clearBtn.style.display = "none";
      } else {
        section.classList.remove("hidden-history");
        if (noMsg) noMsg.style.display = "none";
        if (clearBtn) clearBtn.style.display = "inline-block";
        history.forEach((p) =>
          container.insertAdjacentHTML("beforeend", renderHistoryItem(p))
        );
      }
    });
    attachHistoryEvents();
  }

  // Lưu sản phẩm khi click
  function saveToViewedHistory(product) {
    let history = JSON.parse(localStorage.getItem("viewedHistory")) || [];
    history = history.filter((item) => item.image !== product.image);
    history.unshift(product);
    history = history.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem("viewedHistory", JSON.stringify(history));
    renderViewedHistory();
  }

  // Gắn sự kiện click vào sản phẩm để lưu lịch sử
  function attachProductClick() {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img").src;
        const name = card.querySelector(".product-name").textContent;
        const price = card.querySelector(".product-price").textContent;
        const oldPrice =
          card.querySelector(".product-oldprice")?.textContent || "";

        saveToViewedHistory({
          image: img,
          name,
          price,
          oldPrice,
          alt: name,
        });
      });
    });
  }

  attachProductClick();
  renderViewedHistory();

  //LỌC SP
  function setupFilter(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;

    const products = page.querySelectorAll(".product-card");
    const priceFilter = page.querySelector(`#price-filter-${pageId}`);
    const brandFilter = page.querySelector(`#brand-filter-${pageId}`);

    if (!priceFilter || !brandFilter) return;

    const productData = Array.from(products).map((product) => {
      const name = product.querySelector(".product-name").innerText.trim();
      const priceText = product.querySelector(".product-price").innerText;
      const price = parseFloat(priceText.replace(/[^\d]/g, "")) || 0;
      return { element: product, name, price };
    });

    function matchPrice(price, filterValue) {
      switch (filterValue) {
        case "<1M":
          return price < 1000000;
        case "1M-3M":
          return price >= 1000000 && price <= 3000000;
        case "3M-5M":
          return price > 3000000 && price <= 5000000;
        case ">5M":
          return price > 5000000;
        default:
          return true;
      }
    }

    function filterProducts() {
      const priceValue = priceFilter.value;
      const brandValue = brandFilter.value.toLowerCase();

      productData.forEach(({ element, name, price }) => {
        const matchesBrand =
          !brandValue || name.toLowerCase().includes(brandValue);
        const matchesPrice = matchPrice(price, priceValue);
        element.style.display = matchesBrand && matchesPrice ? "block" : "none";
      });
    }

    priceFilter.addEventListener("change", filterProducts);
    brandFilter.addEventListener("change", filterProducts);
  }

  // Kích hoạt bộ lọc cho từng trang
  setupFilter("xuhuong");
  setupFilter("nam");
  setupFilter("nu");

  // ===================== GIỎ HÀNG NÂNG CAO =====================

  // Hàm lấy giỏ hàng từ localStorage
  function getCart() {
    const cart = localStorage.getItem("watchstore_cart");
    return cart ? JSON.parse(cart) : { items: [], total: 0, count: 0 };
  }

  // Hàm lưu giỏ hàng vào localStorage
  function saveCart(cart) {
    // Tính toán lại tổng tiền và số lượng
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cart.count = cart.items.reduce((count, item) => count + item.quantity, 0);
    localStorage.setItem("watchstore_cart", JSON.stringify(cart));
    updateCartCount();
    return cart;
  }

  // Hàm cập nhật số lượng giỏ hàng trên icon
  function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.count;

    // Cập nhật trên tất cả các icon giỏ hàng
    document.querySelectorAll("#cart-count").forEach((element) => {
      element.textContent = totalItems;
    });
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  function addToCart(product) {
    const cart = getCart();

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cart.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      // Nếu đã có, tăng số lượng lên 1
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Nếu chưa có, thêm sản phẩm mới
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        sku: product.sku || `WS${Date.now().toString().slice(-6)}`,
        category: product.category || "Đồng hồ",
      });
    }

    saveCart(cart);
    showNotification("✅ Đã thêm sản phẩm vào giỏ hàng!");
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(productId) {
    const cart = getCart();
    cart.items = cart.items.filter((item) => item.id !== productId);
    saveCart(cart);
    showNotification("🗑️ Đã xóa sản phẩm khỏi giỏ hàng!");
  }

  // Hàm cập nhật số lượng sản phẩm
  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    const cart = getCart();
    const item = cart.items.find((item) => item.id === productId);

    if (item) {
      item.quantity = newQuantity;
      saveCart(cart);
    }
  }

  // Hàm hiển thị thông báo
  function showNotification(message) {
    // Kiểm tra xem đã có thông báo nào chưa
    const existingNotification = document.querySelector(".cart-notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
    font-size: 14px;
  `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Tự động xóa sau 3 giây
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }

  // Thêm CSS animation cho thông báo
  if (!document.querySelector("#cart-notification-styles")) {
    const style = document.createElement("style");
    style.id = "cart-notification-styles";
    style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);
  }

  // Xử lý sự kiện click nút "THÊM VÀO GIỎ" trong modal chi tiết sản phẩm
  function setupModalAddToCart() {
    const addToCartBtn = document.querySelector(".btn-cart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        const productImage = document.getElementById("modalProductImage").src;
        const productName =
          document.getElementById("modalProductName").textContent;
        const productPriceText =
          document.getElementById("modalCurrentPrice").textContent;

        // Chuyển đổi giá từ chuỗi sang số (loại bỏ ký tự không phải số)
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ""));

        // Tạo ID sản phẩm duy nhất từ tên và timestamp
        const productId =
          "product_" + Date.now() + "_" + productName.replace(/\s+/g, "_");

        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        };

        addToCart(product);
      });
    }
  }

  // Xử lý click vào icon giỏ hàng để chuyển sang trang cart.html
  function setupCartIconClick() {
    const cartIcons = document.querySelectorAll("#cart-icon, .cart");
    cartIcons.forEach((icon) => {
      icon.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "cart.html";
      });
    });
  }

  // Hàm thiết lập thêm vào giỏ hàng nhanh từ các sản phẩm
  function setupQuickAddToCart() {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      // Kiểm tra xem đã có nút thêm vào giỏ hàng chưa
      if (card.querySelector(".add-to-cart-btn")) return;

      // Tạo nút thêm vào giỏ hàng
      const addToCartBtn = document.createElement("button");
      addToCartBtn.className = "add-to-cart-btn";
      addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Thêm giỏ hàng';
      addToCartBtn.style.cssText = `
      background: var(--color-one);
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      margin-top: 8px;
      transition: all 0.3s;
      width: 100%;
    `;

      addToCartBtn.addEventListener("mouseenter", function () {
        this.style.background = "#e56a00";
        this.style.transform = "translateY(-1px)";
      });

      addToCartBtn.addEventListener("mouseleave", function () {
        this.style.background = "var(--color-one)";
        this.style.transform = "translateY(0)";
      });

      addToCartBtn.addEventListener("click", function (e) {
        e.stopPropagation();

        const productName = card.querySelector(".product-name").textContent;
        const productPriceText =
          card.querySelector(".product-price").textContent;
        const productImage = card.querySelector("img").src;

        // Chuyển đổi giá từ chuỗi sang số
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ""));

        // Tạo ID sản phẩm duy nhất
        const productId =
          "product_" + Date.now() + "_" + productName.replace(/\s+/g, "_");

        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        };

        addToCart(product);

        // Hiệu ứng visual feedback
        this.innerHTML = '<i class="fas fa-check"></i> Đã thêm!';
        this.style.background = "#4CAF50";
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-cart-plus"></i> Thêm giỏ hàng';
          this.style.background = "var(--color-one)";
        }, 1500);
      });

      card.appendChild(addToCartBtn);
    });
  }

  // Hàm định dạng giá tiền
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  // Hàm hiển thị giỏ hàng (cho trang cart.html)
  function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count-badge");
    const emptyCart = document.getElementById("empty-cart");

    if (!cartContainer) return; // Chỉ chạy trên trang cart.html

    const cart = getCart();

    if (cart.items.length === 0) {
      if (emptyCart) emptyCart.style.display = "block";
      if (cartContainer) cartContainer.innerHTML = "";
      if (cartTotal) cartTotal.textContent = "0 ₫";
      return;
    }

    if (emptyCart) emptyCart.style.display = "none";

    cartContainer.innerHTML = cart.items
      .map(
        (item) => `
    <div class="cart-item" data-id="${item.id}">
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <p class="item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="item-quantity">
        <button class="quantity-btn minus" onclick="updateQuantity('${
          item.id
        }', ${item.quantity - 1})">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn plus" onclick="updateQuantity('${
          item.id
        }', ${item.quantity + 1})">+</button>
      </div>
      <div class="item-total">
        ${formatPrice(item.price * item.quantity)}
      </div>
      <button class="item-remove" onclick="removeFromCart('${item.id}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `
      )
      .join("");

    if (cartTotal) {
      cartTotal.textContent = formatPrice(cart.total);
    }

    if (cartCount) {
      cartCount.textContent = cart.count;
    }
  }

  // Khởi tạo giỏ hàng khi trang được tải
  document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    setupModalAddToCart();
    setupCartIconClick();
    setupQuickAddToCart();

    // Nếu đang ở trang cart.html, render giỏ hàng
    if (window.location.pathname.includes("cart.html")) {
      renderCart();
    }
  });

  // Xuất các hàm ra global scope để có thể gọi từ HTML
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateQuantity = updateQuantity;
  window.formatPrice = formatPrice;
  window.renderCart = renderCart;
});

/*===============================Đăng ký / Đăng nhập / Profile (toàn bộ)===============================*/

/* ----------------- Helpers ----------------- */
function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function isValidPhone(raw) {
  if (!raw) return false;
  const digits = String(raw).replace(/\D/g, "");
  // Hỗ trợ 0xxxxxxxxx (10 số) hoặc 0xxxxxxxxxx (11 số) / +84xxxxxxxxx
  if (/^0\d{9,10}$/.test(digits)) return true;
  if (/^84\d{9,10}$/.test(digits)) return true;
  return false;
}

function normalizePhone(raw) {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  // chuyển 84... -> 0...
  if (/^84\d{9,10}$/.test(digits)) {
    return "0" + digits.slice(2);
  }
  if (/^0\d{9,10}$/.test(digits)) {
    return digits;
  }
  return "";
}

function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function safeQuery(root, selector) {
  if (!root) return null;
  return root.querySelector(selector);
}

/* ----------------- Storage helpers ----------------- */
const USERS_KEY = "registeredUsers";
const LOGGED_KEY = "loggedInUser";

function getUsersArray() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch (e) {
    console.error("Parse registeredUsers failed", e);
    return [];
  }
}
function setUsersArray(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}
function getLoggedRaw() {
  try {
    return JSON.parse(localStorage.getItem(LOGGED_KEY) || "null");
  } catch (e) {
    return null;
  }
}
function setLogged(obj) {
  localStorage.setItem(LOGGED_KEY, JSON.stringify(obj));
}
function clearLogged() {
  localStorage.removeItem(LOGGED_KEY);
}

/* ----------------- Auth handlers ----------------- */

function handleRegister(e) {
  if (e && e.preventDefault) e.preventDefault();
  const form = document.querySelector(".register-form");
  if (!form) return false;

  const fullname = (safeQuery(form, ".register-fullname") || {}).value?.trim() || "";
  const birthdate = (safeQuery(form, ".register-birthdate") || {}).value || "";
  const rawPhone = (safeQuery(form, ".register-phone") || {}).value || "";
  const email = (safeQuery(form, ".register-email") || {}).value?.trim() || "";
  const password = (safeQuery(form, ".register-password") || {}).value || "";
  const confirm = (safeQuery(form, ".register-confirm") || {}).value || "";

  // Validate required fields
  if (!fullname || !birthdate || !rawPhone || !password) {
    alert("Vui lòng nhập đầy đủ thông tin đăng ký.");
    return false;
  }
  if (password !== confirm) {
    alert("Mật khẩu không khớp.");
    return false;
  }

  // Phone validation & normalize
  if (!isValidPhone(rawPhone)) {
    alert("Số điện thoại không hợp lệ! Vui lòng nhập dạng 0xxxxxxxxx hoặc +84xxxxxxxxx.");
    return false;
  }
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    alert("Không thể chuẩn hóa số điện thoại. Vui lòng kiểm tra lại.");
    return false;
  }

  // Email validation (nếu nhập)
  if (email && !isValidEmail(email)) {
    alert("Địa chỉ email không hợp lệ.");
    return false;
  }

  // Check duplicate phone
  const users = getUsersArray();
  if (users.some(u => normalizePhone(u.phone) === phone)) {
    alert("Số điện thoại đã được đăng ký. Vui lòng đăng nhập hoặc dùng số khác.");
    return false;
  }

  const newUser = {
    id: 'u' + Date.now() + Math.floor(Math.random()*1000),
    fullname,
    birthdate,
    phone,
    email,
    password, // LƯU Ý: plain-text chỉ demo. Không dùng trong production.
    avatar: "", // lưu dataURL nếu có
    savedAt: new Date().toISOString()
  };
  users.push(newUser);
  setUsersArray(users);

  // Close overlay if exists
  if (typeof hideRegisterOverlay === "function") hideRegisterOverlay();
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "none";

  alert("Đăng ký thành công! Hãy đăng nhập.");
  form.reset();
  return true;
}

function handleLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  const form = document.querySelector(".login-form") || document.querySelector(".user-login-form");
  if (!form) return false;

  const rawPhone = (safeQuery(form, ".login-phone") || {}).value || "";
  const password = (safeQuery(form, ".login-password") || {}).value || "";

  if (!rawPhone || !password) {
    alert("Nhập số điện thoại và mật khẩu.");
    return false;
  }
  if (!isValidPhone(rawPhone)) {
    alert("Số điện thoại không hợp lệ!");
    return false;
  }

  const phone = normalizePhone(rawPhone);
  const users = getUsersArray();
  const found = users.find(u => normalizePhone(u.phone) === phone && u.password === password);
  if (!found) {
    alert("Sai số điện thoại hoặc mật khẩu.");
    const p = safeQuery(form, ".login-password");
    if (p) p.value = "";
    return false;
  }

  // Lưu phiên
  setLogged({
    phone: found.phone,
    fullname: found.fullname,
    loggedAt: new Date().toISOString()
  });

  /* === CHỈ HIỆN PROFILE === */
  // Ẩn tất cả các nội dung trang trừ #account-area
  document.querySelectorAll("body > *").forEach(el => {
    if (el.id !== "account-area") el.style.display = "none";
  });

  // Hiện #account-area
  const area = document.getElementById("account-area");
  if (area) {
    area.style.display = "block";
    area.classList.remove("hidden");
    showAccountAreaFromLogged();
  }

  // Dọn mật khẩu
  const pw = safeQuery(form, ".login-password");
  if (pw) pw.value = "";
  return true;
}


if (document.getElementById("account-area")) {
  const logged = getLoggedRaw();
  if (logged) {
    // Ẩn toàn bộ nội dung khác
    document.querySelectorAll("body > *").forEach(el => {
      if (el.id !== "account-area") el.style.display = "none";
    });
    // Hiện profile
    showAccountAreaFromLogged();
  }
}


/* ----------------- PROFILE DISPLAY & EDIT IN #account-area ----------------- */

function getCurrentUserRecord() {
  const logged = getLoggedRaw();
  if (!logged) return null;
  const users = getUsersArray();
  return users.find(u => normalizePhone(u.phone) === normalizePhone(logged.phone)) || null;
}

function hideAccountAreaUI() {
  const area = document.getElementById("account-area");
  if (!area) return;
  // restore page in case hideAccountAreaUI called directly
  document.querySelectorAll("body > *").forEach(el => {
    if (el.id !== "account-area") el.style.display = "";
  });
  area.style.display = "none";
  area.innerHTML = "";
  document.body.style.overflow = "";
  // remove possible resize listener
  window.removeEventListener("resize", showAccountAreaFromLogged.__applyResponsive);
}

function showAccountAreaFromLogged() {
  const logged = getLoggedRaw();
  if (!logged) return hideAccountAreaUI();

  const rec = getCurrentUserRecord();
  const user = rec || { phone: logged.phone, fullname: logged.fullname || "", email: "", birthdate: "", avatar: "" };

  const area = document.getElementById("account-area");
  if (!area) return;

  // 1) Ẩn tất cả nội dung trang (trừ account-area)
  document.querySelectorAll("body > *").forEach(el => {
    if (el.id !== "account-area") el.style.display = "none";
  });

  // 2) Ép account-area full màn hình (backdrop)
  Object.assign(area.style, {
    display: "block",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
    zIndex: "2147483646",
    padding: "20px",
    boxSizing: "border-box",
    background: "rgba(0,0,0,0.35)" // backdrop mờ
  });

  // khóa scroll body
  document.body.style.overflow = "hidden";

  // 3) Chèn nội dung profile (card giữa màn hình)
  area.innerHTML = `
    <div class="account-card">
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;">
        <div style="flex:1;min-width:0;align-items:center;">
          <div style="font-size:30px;font-weight:700;margin-bottom:6px;" id="profileNameUI">${escapeHtml(user.fullname || user.phone)}</div>
          <div style="color:#444;font-size:24px;">Số điện thoại: <strong id="profilePhoneUI">${escapeHtml(user.phone)}</strong></div>
          <div style="color:#444;font-size:24px;">Email: <span id="profileEmailUI">${escapeHtml(user.email || '—')}</span></div>
          <div style="color:#444;font-size:24px;">Ngày sinh: <span id="profileBirthUI">${escapeHtml(user.birthdate || '—')}</span></div>
        </div>
      </div>

      <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap;font-size:24px;">
        <button id="accountEditBtn" type="button">Chỉnh sửa hồ sơ</button>
        <button id="accountHomeBtn" type="button">Trang chủ</button>
        <button id="accountLogoutBtn" type="button" style="margin-left:auto;background:#dc3545;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;">Đăng xuất</button>
      </div>

      <div id="accountEditAreaUI" style="margin-top:16px;">
        <form id="accountEditFormUI">
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px;">
            <label>Họ và tên<br><input type="text" id="accountEditFullname" value="${escapeHtml(user.fullname || '')}" /></label>
            <label>Email<br><input type="email" id="accountEditEmail" value="${escapeHtml(user.email || '')}" /></label>
            <label>Ngày sinh<br><input type="date" id="accountEditBirth" value="${escapeHtml(user.birthdate || '')}" max="${(new Date()).toISOString().slice(0,10)}"/></label>
            <div style="display:flex;gap:8px;">
              <button type="submit">Lưu</button>
              <button type="button" id="accountEditCancelBtn">Hủy</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  // 4) restore helper (khôi phục trang khi đóng)
  function restorePage() {
    document.querySelectorAll("body > *").forEach(el => {
      if (el.id !== "account-area") el.style.display = "";
    });
    // hide area and cleanup
    area.style.display = "none";
    area.innerHTML = "";
    document.body.style.overflow = "";
    // remove resize listener
    window.removeEventListener("resize", showAccountAreaFromLogged.__applyResponsive);
  }

  // 5) Gắn sự kiện các nút
  const closeBtn = document.getElementById("accountPanelClose");
  if (closeBtn) closeBtn.addEventListener("click", restorePage);

  const btnLogout = document.getElementById("accountLogoutBtn");
  if (btnLogout) btnLogout.addEventListener("click", () => {
    clearLogged();
    restorePage();
    window.location.reload();
  });

  const btnHome = document.getElementById("accountHomeBtn");
  if (btnHome) btnHome.addEventListener("click", () => {
    // chỉnh đường dẫn nếu cần
    window.location.href = "../index.html";
  });

  // 6) Edit profile wiring
  const btnEdit = document.getElementById("accountEditBtn");
  const editArea = document.getElementById("accountEditAreaUI");
  if (btnEdit && editArea) {
    btnEdit.addEventListener("click", () => {
      editArea.style.display = editArea.style.display === 'none' ? 'block' : 'none';
    });

    const form = document.getElementById("accountEditFormUI");
    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const fullname = document.getElementById("accountEditFullname")?.value?.trim() || "";
        const email = document.getElementById("accountEditEmail")?.value?.trim() || "";
        const birth = document.getElementById("accountEditBirth")?.value || "";

        if (!fullname) { alert("Vui lòng nhập họ và tên."); return; }
        if (email && !isValidEmail(email)) { alert("Email không hợp lệ."); return; }
        if (birth && birth > (new Date()).toISOString().slice(0,10)) { alert("Ngày sinh không hợp lệ."); return; }

        let users = getUsersArray();
        const idx = users.findIndex(u => normalizePhone(u.phone) === normalizePhone(user.phone));
        if (idx === -1) { alert("Không tìm thấy người dùng."); return; }

        users[idx].fullname = fullname;
        users[idx].email = email;
        users[idx].birthdate = birth;
        users[idx].updatedAt = new Date().toISOString();
        setUsersArray(users);

        const loggedNow = getLoggedRaw();
        if (loggedNow && normalizePhone(loggedNow.phone) === normalizePhone(user.phone)) {
          setLogged({ phone: users[idx].phone, fullname: users[idx].fullname, loggedAt: new Date().toISOString() });
        }

        // cập nhật UI
        document.getElementById("profileNameUI").textContent = fullname;
        document.getElementById("profileEmailUI").textContent = email || '—';
        document.getElementById("profileBirthUI").textContent = birth || '—';
        editArea.style.display = 'none';
        alert("Cập nhật hồ sơ thành công.");
      });

      const cancelBtn = document.getElementById("accountEditCancelBtn");
      if (cancelBtn) cancelBtn.addEventListener("click", () => { editArea.style.display = 'none'; });
    }
  }

  // 7) Responsive: nếu màn hình nhỏ thì bottom-sheet (gần full)
  function applyResponsive() {
    if (window.innerWidth <= 640) {
      // bottom sheet look
      Object.assign(area.style, {
        top: "",
        bottom: "0",
        left: "0",
        width: "100vw",
        height: "auto",
        maxHeight: "85vh",
        padding: "12px",
      });
      const card = area.querySelector(".account-card");
      if (card) {
        card.style.margin = "12px auto";
        card.style.width = "calc(100% - 24px)";
      }
    } else {
      // full centered modal card on desktop
      Object.assign(area.style, {
        top: "0",
        bottom: "",
        left: "0",
        width: "100vw",
        height: "100vh",
        padding: "20px",
      });
      const card = area.querySelector(".account-card");
      if (card) {
        card.style.margin = "48px auto";
        card.style.width = "calc(100% - 48px)";
        card.style.maxWidth = "900px";
      }
    }
  }

  // expose applyResponsive so we can remove listener later
  showAccountAreaFromLogged.__applyResponsive = applyResponsive;
  window.addEventListener("resize", applyResponsive);
  applyResponsive();
}

function ensureProfileContainer() {
  let container = document.getElementById("headerProfileContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "headerProfileContainer";
    container.style.cssText = "float:right;align-items:center;gap:8px;";
    document.body.prepend(container);
  }
  return container;
}


function renderProfileBox() {
  const container = ensureProfileContainer();
  if (!container) return;

  const logged = getLoggedRaw();
  if (!logged) {
    container.innerHTML = `
      <span class="profile-text">Chưa đăng nhập.</span>
      <a class="profile-login" href="page/user.html">Đăng nhập</a>
    `;
    return;
  }

  const displayName = escapeHtml(logged.fullname || logged.phone || "Tài khoản");
  container.innerHTML = `
    <span class="profile-text">Xin chào, <strong>${displayName}</strong></span>
    <br>
    <button class="profile-edit" id="btnOpenEditProfile" type="button">Profile</button>
    <button class="profile-logout" id="btnLogout" type="button">Đăng xuất</button>
  `;

  const btnLogout = container.querySelector("#btnLogout");
  if (btnLogout) btnLogout.addEventListener("click", () => {
    clearLogged();
    renderProfileBox();
    window.location.reload();
  });

  const btnEdit = container.querySelector("#btnOpenEditProfile");
  if (btnEdit) btnEdit.addEventListener("click", () => {
    // nếu có account-area, mở nó, còn không điều hướng tới trang user
    if (document.getElementById("account-area")) {
      showAccountAreaFromLogged();
    } else {
      window.location.href = "page/user.html";
    }
  });
  
}

/* ----------------- Overlay helpers (exposed) ----------------- */
window.showRegisterOverlay = function() {
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "flex";
};
window.hideRegisterOverlay = function() {
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "none";
};

/* ----------------- Init & Event wiring ----------------- */
function initAuthModule() {
  // attach forms
  const regForm = document.querySelector(".register-form");
  if (regForm) regForm.addEventListener("submit", handleRegister);

  const loginForm = document.querySelector(".login-form") || document.querySelector(".user-login-form");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  // Render header small box
  renderProfileBox();

  // If page contains #account-area and user already logged -> show profile
  if (document.getElementById("account-area")) {
    const logged = getLoggedRaw();
    if (logged) showAccountAreaFromLogged();
  }

  // Close register overlay on Esc
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      const overlay = document.getElementById("overlay");
      if (overlay) overlay.style.display = "none";
    }
  });
}

// Expose some handlers so HTML onclick attributes can call them
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.renderProfileBox = renderProfileBox;
window.showAccountAreaFromLogged = showAccountAreaFromLogged;
window.hideAccountAreaUI = hideAccountAreaUI;

// Autostart
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuthModule);
} else {
  initAuthModule();
}






// so sánh ===========================================================================================
(function () {
  const TAG = "[COMPARE]";
  function log(...args){ console.log(TAG, ...args); }
  function formatVND(n){
    if (n==null||n==="") return "";
    const num = typeof n==="number"? n : Number(String(n).replace(/[^\d.-]/g,""));
    return isNaN(num)? String(n) : num.toLocaleString('vi-VN') + ' ₫';
  }
  function escapeHtml(s){ if (s==null) return ""; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function initCompareModule() {
    const compareBar = document.getElementById("compareBar");
    const compareItems = document.getElementById("compareItems");
    const compareNowBtn = document.getElementById("compareNowBtn");
    const clearAllBtn = document.getElementById("clearAllBtn");

    if (!compareBar || !compareItems || !compareNowBtn || !clearAllBtn) {
      log("Missing required elements: #compareBar, #compareItems, #compareNowBtn, #clearAllBtn");
      return;
    }

    let selected = [];

    function readCardInfo(card) {
      if (!card) return null;
      const idAttr = card.dataset?.id || card.getAttribute("data-id");
      const id = idAttr ? Number(idAttr) : Date.now();
      const img = card.querySelector("img")?.src || "";
      const name = card.querySelector(".product-name")?.innerText?.trim() || "";
      const priceText = card.querySelector(".product-price")?.innerText?.trim() || "";
      const oldPriceText = card.querySelector(".product-oldprice")?.innerText?.trim() || "";
      return { id, name, price: priceText, oldPrice: oldPriceText, image: img };
    }

    function updateCompareBar() {
      compareItems.innerHTML = "";
      selected.forEach(item => {
        const div = document.createElement("div");
        div.className = "compare-item";
        if (item.id) div.dataset.id = item.id;
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "8px";
        div.style.padding = "6px";
        div.innerHTML = `
          <img src="${escapeHtml(item.image || 'images/no-image.png')}" width="56" height="56" style="object-fit:cover;border-radius:6px;">
          <div style="min-width:140px;max-width:220px;overflow:hidden;">
            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(item.name || 'Sản phẩm')}</div>
            <div style="font-size:11px;color:#666">${formatVND(item.price)}</div>
            <div style="font-size:11px;color:#999;text-decoration:line-through;">${escapeHtml(item.oldPrice || '')}</div>
          </div>
          <button class="remove-compare-item" title="Xóa" style="margin-left:auto;border:none;background:transparent;cursor:pointer;font-size:14px;">✕</button>
        `;
        div.querySelector(".remove-compare-item").addEventListener("click", () => {
          selected = selected.filter(s => s.id !== item.id);
          updateCompareBar();
        });
        compareItems.appendChild(div);
      });
      if (selected.length > 0) compareBar.classList.remove("hidden");
      else compareBar.classList.add("hidden");
      log("updateCompareBar -> selected:", selected.map(s => ({id: s.id, name: s.name})));
    }

    document.addEventListener("click", function (e) {
      const btn = e.target.closest && e.target.closest(".compare-btn");
      if (!btn) return;
      e.preventDefault();
      const card = btn.closest(".product-card");
      if (!card) { alert("Không tìm thấy .product-card"); return; }

      const cardInfo = readCardInfo(card);
      if (selected.some(s => s.id === cardInfo.id)) { alert("Sản phẩm đã được chọn"); return; }
      if (selected.length >= 3) { alert("Chỉ chọn tối đa 3 sản phẩm"); return; }

      selected.push({
        id: cardInfo.id,
        name: cardInfo.name,
        price: cardInfo.price,
        oldPrice: cardInfo.oldPrice,
        image: cardInfo.image
      });

      updateCompareBar();
    });

    compareNowBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!selected || selected.length === 0) { alert("Hãy chọn sản phẩm trước khi bấm 'So sánh'."); return; }
      buildComparePopup(selected);
    });

    clearAllBtn.addEventListener("click", function (e) {
      e.preventDefault();
      selected = [];
      updateCompareBar();
      const old = document.getElementById("comparePopup");
      if (old) old.remove();
    });

    function buildComparePopup(selProducts) {
      const fields = [
        ["Tên sản phẩm", p => escapeHtml(p.name || "")],
        ["Hình ảnh", p => `<img src="${escapeHtml(p.image || '')}" width="100" style="object-fit:cover;border-radius:6px;">`],
        ["Giá", p => formatVND(p.price)],
        ["Giá gốc", p => escapeHtml(p.oldPrice || "")]
      ];

      const rowsHtml = fields.map(([label, fn]) => {
        const cells = selProducts.map(p => `<td style="vertical-align:top;padding:8px;">${fn(p)}</td>`).join("");
        return `<tr><th style="text-align:left;padding:10px;background:#fafafa">${escapeHtml(label)}</th>${cells}</tr>`;
      }).join("");

      const old = document.getElementById("comparePopup");
      if (old) old.remove();

      const popup = document.createElement("div");
      popup.id = "comparePopup";
      popup.style.position = "fixed";
      popup.style.inset = "0";
      popup.style.display = "flex";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";
      popup.style.background = "rgba(0,0,0,0.45)";
      popup.style.zIndex = "99999";

      popup.innerHTML = `
        <div class="popup-content" style="width:min(1100px,96%);max-height:90vh;overflow:auto;background:#fff;border-radius:8px;padding:16px;box-shadow:0 8px 30px rgba(0,0,0,0.25);">
          <h3 style="margin:0 0 12px;">So sánh sản phẩm (${selProducts.length})</h3>
          <div style="overflow:auto;">
            <table class="compare-table" style="width:100%;border-collapse:collapse;border:1px solid #eee;">
              ${rowsHtml}
            </table>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:12px;">
            <button id="compareCloseBtn" class="btn-secondary" style="padding:8px 12px;border-radius:6px;border:none;cursor:pointer;">Đóng</button>
          </div>
        </div>
      `;
      document.body.appendChild(popup);

      const popupEl = document.getElementById("comparePopup");
      document.getElementById("compareCloseBtn").addEventListener("click", () => popupEl.remove());
      popupEl.addEventListener("click", (e) => { if (e.target === popupEl) popupEl.remove(); });

      log("Popup shown with products:", selProducts.map(p => ({id:p.id, name:p.name})));
    }

    log("Compare module initialized");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initCompareModule);
  else initCompareModule();
})();

//=================================Quản lý tài khoản (admin)==================================

// --------------- CẤU TRÚC DỮ LIỆU MẪU ---------------
// Mẫu user object: { id: "u1", name: "Nguyen A", email: "a@x.com", phone: "0123...", role: "admin" }
// Có 2 kiểu lưu: (A) localStorage.accounts = JSON.stringify([user,...])
//                  (B) localStorage keys like "user_<id>" = JSON.stringify(user)

// --------------- LẤY DỮ LIỆU TỪ LOCAL ---------------
function getAccountsFromLocal() {
  // Thử đọc key "accounts" trước
  try {
    const raw = localStorage.getItem('accounts');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    }
  } catch(e) { console.warn('parse accounts failed', e); }

  // Nếu không có key "accounts", dò các key có prefix "user_"
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (k.startsWith('user_')) {
      try {
        const u = JSON.parse(localStorage.getItem(k));
        if (u && typeof u === 'object') users.push(u);
      } catch(e) { /* ignore parse error */ }
    }
  }
  return users;
}

// --------------- LƯU DỮ LIỆU VỀ LOCAL ---------------
function saveAccountsToLocal(arr) {
  // Mình lưu gọn vào "accounts" (thay thế toàn bộ)
  localStorage.setItem('accounts', JSON.stringify(arr));
}

// --------------- RENDER DANH SÁCH ---------------
function renderAccounts(filterText = '') {
  const accounts = getAccountsFromLocal();
  const tbody = document.getElementById('accountList');
  const noData = document.getElementById('noData');
  tbody.innerHTML = '';

  const filtered = accounts.filter(acc => {
    if (!filterText) return true;
    const s = filterText.toLowerCase();
    return (acc.name||'').toLowerCase().includes(s)
        || (acc.email||'').toLowerCase().includes(s)
        || (acc.phone||'').toLowerCase().includes(s);
  });

  if (filtered.length === 0) {
    noData.style.display = '';
    return;
  } else {
    noData.style.display = 'none';
  }

  filtered.forEach((acc, idx) => {
    const tr = document.createElement('tr');

    const idCell = `<td>${idx + 1}</td>`;
    const nameCell = `<td>${escapeHtml(acc.name || '-')}</td>`;
    const contact = `${escapeHtml(acc.email || '')}${acc.email && acc.phone ? ' / ' : ''}${escapeHtml(acc.phone || '')}`;
    const contactCell = `<td>${contact || '-'}</td>`;
    const roleCell = `<td>${escapeHtml(acc.role || 'user')}</td>`;
    const actions = `
      <td>
        <button class="action-btn action-edit" data-id="${acc.id}">Sửa</button>
        <button class="action-btn action-del" data-id="${acc.id}">Xóa</button>
      </td>
    `;

    tr.innerHTML = idCell + nameCell + contactCell + roleCell + actions;
    tbody.appendChild(tr);
  });

  // gắn event cho nút sửa/xóa
  tbody.querySelectorAll('.action-del').forEach(b => {
    b.onclick = () => deleteAccount(b.dataset.id);
  });
  tbody.querySelectorAll('.action-edit').forEach(b => {
    b.onclick = () => editAccount(b.dataset.id);
  });
}

// --------------- HÀM SỬA / XÓA ---------------
function deleteAccount(id) {
  if (!confirm('Bạn có chắc muốn xóa tài khoản này?')) return;
  let arr = getAccountsFromLocal();
  arr = arr.filter(u => String(u.id) !== String(id));
  saveAccountsToLocal(arr);

  // nếu bạn cũng lưu từng key user_<id> riêng lẻ, xóa luôn
  try { localStorage.removeItem('user_' + id); } catch(e) {}
  renderAccounts(document.getElementById('searchAccounts').value);
}

function editAccount(id) {
  // Quick demo: prompt sửa tên (bạn có thể mở modal form đẹp hơn)
  const arr = getAccountsFromLocal();
  const idx = arr.findIndex(u => String(u.id) === String(id));
  if (idx === -1) return alert('Không tìm thấy tài khoản');
  const newName = prompt('Sửa tên:', arr[idx].name || '');
  if (newName === null) return; // hủy
  arr[idx].name = newName.trim();
  saveAccountsToLocal(arr);
  renderAccounts(document.getElementById('searchAccounts').value);
}

// --------------- HỖ TRỢ: escapeHtml ---------------
function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --------------- Demo helper: thêm 1 số data mẫu ---------------
function addDemoAccounts() {
  const base = [
    { id: 'u1', name: 'Nguyễn Văn A', email: 'a@example.com', phone:'0912345678', role:'admin' },
    { id: 'u2', name: 'Trần Thị B', email: 'b@x.com', phone:'0987654321', role:'user' },
    { id: 'u3', name: 'Khách Hàng', email: '', phone:'0123456789', role:'customer' },
  ];
  saveAccountsToLocal(base);
  // lưu key user_... (tùy bạn có cần)
  base.forEach(u => localStorage.setItem('user_' + u.id, JSON.stringify(u)));
  renderAccounts();
}

// --------------- Khởi tạo event listeners ---------------
document.getElementById('btnReload').addEventListener('click', () => renderAccounts());
document.getElementById('btnAddDemo').addEventListener('click', addDemoAccounts);
document.getElementById('searchAccounts').addEventListener('input', (e) => renderAccounts(e.target.value));

// Load lần đầu
renderAccounts();
//=================================END Quản lý tài khoản (admin)==================================

//============= END SO SÁNH ========================================================







// ================== PRODUCT DETAIL MODAL ==================
function attachProductDetailEvents() {
  const modal = document.getElementById("productDetailModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".close-modal");
  const specsTable = modal.querySelector("#specsTable");

  document.querySelectorAll(".product-card").forEach((card) => {

    if (card.dataset.modalBound === "true") return;
    card.dataset.modalBound = "true";

    card.addEventListener("click", (e) => {

      // Chặn khi click vào nút khác
      if (
        e.target.classList.contains("compare-btn") ||
        e.target.classList.contains("add-to-cart-btn")
      ) return;

      // Lấy ID
      const productId = card.getAttribute("data-id");
      const product = window.getProductById(productId);

      if (!product) {
        console.error("Không tìm thấy sản phẩm ID:", productId);
        return;
      }

      // Hiển thị hình ảnh
      modal.querySelector("#modalProductImage").src = product.image;

      // Tên & giá
      modal.querySelector("#modalProductName").textContent = product.name;
      modal.querySelector("#modalCurrentPrice").textContent = formatPrice(product.price);
      modal.querySelector("#modalOldPrice").textContent = formatPrice(product.oldPrice);

      // ⭐ Thêm mô tả
      modal.querySelector("#modalDescription").textContent =
        product.description || "Đang cập nhật mô tả sản phẩm.";

      // Thông số sản phẩm
      specsTable.innerHTML = Object.entries(product.specs || {})
        .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
        .join("");

      // Hiện modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // Đóng modal
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}


// Gọi khi trang tải xong
document.addEventListener("DOMContentLoaded", attachProductDetailEvents);
