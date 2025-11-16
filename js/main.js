document.addEventListener("DOMContentLoaded", function () {
  // === MENU CHUYỂN TRANG ===
  const defaultContent = document.querySelectorAll(
    ".service-banner, .hotsale-product, .product-section, .about-section, .review-section"
  );
  
  function updateMenuWithCategories() {
    // Lấy danh mục từ localStorage
    const categories = window.getCategories();
    const innerMenu = document.getElementById("inner-menu");
    
    if (!innerMenu) return;
    
    // Xóa link cũ (trừ link home)
    const existingLinks = innerMenu.querySelectorAll('li');
    existingLinks.forEach(li => li.remove());
    
    // Tạo link mới cho từng danh mục
    categories.forEach(cat => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.id = `${cat.name}-link`;
      a.textContent = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
      
      a.addEventListener('click', (e) => {
        e.preventDefault();
        hienTrang(cat.name);
      });
      
      li.appendChild(a);
      innerMenu.appendChild(li);
    });
  }
  
  const links = {
    home: document.querySelector(".inner-logo a"),
  };
  
  function hienTrang(id) {
    const pages = document.querySelectorAll(".page");
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

  if (links.home) {
    links.home.addEventListener("click", (e) => {
      e.preventDefault();
      hienTrang("home");
    });
  }
  
  // Cập nhật menu với danh mục từ localStorage
  updateMenuWithCategories();

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

      if (typeof attachProductClick === "function") {
        attachProductClick();
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

  // Lấy danh mục từ localStorage (được quản lý bởi admin)
  const categories = window.getCategories();
  
  // Tìm vị trí để chèn section danh mục (sau Hot Sale)
  const hotSaleDiv = document.querySelector('.hotsale-product');
  const insertPoint = hotSaleDiv.nextElementSibling;
  
  // Hiển thị sản phẩm cho từng danh mục
  categories.forEach(cat => {
    const categoryName = cat.name;
    const containerId = `${categoryName}-products`;
    let container = document.getElementById(containerId);
    
    // Nếu section chưa tồn tại → tạo mới
    if (!container) {
      const section = document.createElement('section');
      section.id = categoryName;
      section.className = 'page';
      
      const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      section.innerHTML = `
        <div class="container">
          <h1 class="page-title-main">${title}</h1>
          
          <div class="filter-options">
            <div class="filter-group">
              <label for="price-filter-${categoryName}">Giá:</label>
              <select id="price-filter-${categoryName}" class="filter-select">
                <option value="">Tất cả</option>
                <option value="<1M">Dưới 1 triệu</option>
                <option value="1M-3M">1 - 3 triệu</option>
                <option value="3M-5M">3 - 5 triệu</option>
                <option value=">5M">Trên 5 triệu</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="brand-filter-${categoryName}">Thương hiệu:</label>
              <select id="brand-filter-${categoryName}" class="filter-select">
                <option value="">Tất cả</option>
                <option value="Casio">Casio</option>
                <option value="Orient">Orient</option>
                <option value="Seiko">Seiko</option>
                <option value="Tissot">Tissot</option>
                <option value="Citizen">Citizen</option>
                <option value="Bentley">Bentley</option>
                <option value="Olym Pianus">Olym Pianus</option>
                <option value="Bonest Gatti">Bonest Gatti</option>
                <option value="Carnival">Carnival</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="movement-filter-${categoryName}">Bộ máy:</label>
              <select id="movement-filter-${categoryName}" class="filter-select">
                <option value="">Tất cả</option>
                <option value="Automatic">Automatic (Cơ)</option>
                <option value="Quartz">Quartz (Pin)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="water-filter-${categoryName}">Chống nước:</label>
              <select id="water-filter-${categoryName}" class="filter-select">
                <option value="">Tất cả</option>
                <option value="30m">30m (Rửa tay)</option>
                <option value="50m">50m (Đi mưa)</option>
                <option value="100m">100m (Bơi lội)</option>
                <option value="200m">200m (Lặn)</option>
              </select>
            </div>
          </div>
          </div>
        <div id="${containerId}" class="product-list product-list-container"></div>
      `;
      
      // Chèn section trước "Product Section"
      if (insertPoint) {
        insertPoint.parentNode.insertBefore(section, insertPoint);
      } else {
        hotSaleDiv.parentNode.appendChild(section);
      }
      
      container = document.getElementById(containerId);
    }
    
    if (container) {
      const products = window.getProducts({ category: categoryName });
      renderPaginatedProducts(containerId, products, 10);
    }

    const page = document.getElementById(categoryName); // Lấy <section>
      if (page) {
        // Lấy tất cả các <select> trong section này
        const filters = {
          price: page.querySelector(`#price-filter-${categoryName}`),
          brand: page.querySelector(`#brand-filter-${categoryName}`),
          movement: page.querySelector(`#movement-filter-${categoryName}`),
          water: page.querySelector(`#water-filter-${categoryName}`)
        };

        // Hàm để áp dụng bộ lọc
        const applyFilters = () => {
          const currentFilters = {
            price: filters.price ? filters.price.value : "",
            brand: filters.brand ? filters.brand.value : "",
            movement: filters.movement ? filters.movement.value : "",
            water: filters.water ? filters.water.value : ""
          };
          
          // Lấy danh sách sản phẩm đã lọc
          const filteredProducts = getFilteredProducts(categoryName, currentFilters);
          
          // Render lại danh sách sản phẩm với dữ liệu đã lọc
          renderPaginatedProducts(containerId, filteredProducts, 8);
        };

        // Gắn sự kiện 'change' cho tất cả các <select>
        Object.values(filters).forEach(selectElement => {
          if (selectElement) {
            selectElement.addEventListener('change', applyFilters);
          }
        });
      }
  });

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
  if (typeof attachProductClick === "function") {
    attachProductClick();
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

  //Lọc theo thương hiệu
function displayBrandProducts(brandName) {
    // 1. Chuyển sang trang chi tiết hãng
    hienTrang("brand-detail");
    document.getElementById("brand-title").textContent = brandName.toUpperCase();

    const containerId = "brand-products-container"; 
    const noResults = document.getElementById("no-brand-products");
    
    // 2. Nhóm alias 
    const brandAliases = {
      "G-Shock": ["G-Shock"],
      "Baby-G": ["Baby-G", "Baby G", "Casio Baby-G"],
      "Casio": ["Casio"], 
      "Olym Pianus": ["Olym Pianus", "Olympia Star"],
      "Rolex": ["Rolex", "Giống Rolex"],
      "Tissot": ["Tissot"],
      "Orient": ["Orient"],
      "Seiko": ["Seiko"],
      "Citizen": ["Citizen"],
      "Bonest Gatti": ["Bonest Gatti"],
      "Hanboro": ["Hanboro"],
      "Movado": ["Movado"],
      "I&W Carnival": ["I&W Carnival", "Carnival"],
    };
    // Tạo danh sách từ khóa (viết thường)
    const keywords = (brandAliases[brandName] || [brandName]).map(k => k.toLowerCase());
    const gShockKeyword = "g-shock";
    const casioKeyword = "casio";
    const allProducts = window.getProducts();

    // 3. Lọc trên mảng DỮ LIỆU (product object), không phải DOM
    const filtered = allProducts.filter(product => {
        // Lấy tất cả các trường cần check (viết thường)
        const name = (product.name || "").toLowerCase();
        const brand = (product.brand || "").toLowerCase();
        const description = (product.description || "").toLowerCase();
        
        // Logic đặc biệt cho Casio (loại G-Shock)
        if (brandName === "Casio") {
            // Phải chứa "casio" (trong brand, name, hoặc desc)
            const isCasio = brand.includes(casioKeyword) || 
                            name.includes(casioKeyword) || 
                            description.includes(casioKeyword);
            
            // VÀ KHÔNG được chứa "g-shock" (trong brand, name, hoặc desc)
            const isGShock = brand.includes(gShockKeyword) || 
                             name.includes(gShockKeyword) || 
                             description.includes(gShockKeyword);
            
            return isCasio && !isGShock;
        }

        if (brandName === "G-Shock") {
            // Phải chứa "g-shock" (trong brand, name, hoặc desc)
            return brand.includes(gShockKeyword) || 
                   name.includes(gShockKeyword) || 
                   description.includes(gShockKeyword);
        }

        return keywords.some(
            (keyword) => 
                name.includes(keyword) || 
                brand.includes(keyword) || 
                description.includes(keyword) 
        );
    });

    // 4. HIỂN THỊ KẾT QUẢ
    if (filtered.length > 0) {
        noResults.style.display = "none";
        // Tái sử dụng hàm render có phân trang đã có trong main.js
        // Hàm này sẽ tự động gọi attachProductDetailEvents()
        renderPaginatedProducts(containerId, filtered, 12); 
    } else {
        // Nếu không có kết quả, xóa nội dung cũ và báo lỗi
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Xóa phân trang/sản phẩm cũ
        container.style.display = "block"; 
        noResults.style.display = "block";
        noResults.textContent = `Không tìm thấy sản phẩm nào của hãng ${brandName.toUpperCase()}.`;
    }
}

// 5. Gắn sự kiện Click (Đã xóa lời gọi hàm bị lặp)
const brandLinks = document.querySelectorAll(
  ".product-categories .brand-link"
);

brandLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const brandName = this.getAttribute("data-brand");
    if (brandName) {
      displayBrandProducts(brandName);
      // Không cần gọi attachProductDetailEvents() ở đây nữa
    }
  });
});

  // === LỊCH SỬ XEM SẢN PHẨM ===
  const MAX_HISTORY_ITEMS = 10;
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
      // Thêm cờ để tránh gắn sự kiện lặp lại
      if (card.dataset.historyBound === "true") return;
      card.dataset.historyBound = "true";

      card.addEventListener("click", (e) => {
        // Chặn khi click vào nút khác
        if (
          e.target.classList.contains("compare-btn") ||
          e.target.classList.contains("add-to-cart-btn")
        ) return;

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
  function getFilteredProducts(categoryName, filters) {
    // Lấy tất cả sản phẩm cho danh mục này
    let allProducts = window.getProducts({ category: categoryName });

    // Áp dụng các bộ lọc
    return allProducts.filter(product => {
      const specs = product.specs || {};
      const price = product.price || 0;
      const brand = product.brand || "";
      const movement = (specs.movement || "").toLowerCase();
      const waterResistance = (specs.waterResistance || "").toLowerCase();

      // 1. Lọc Giá
      if (filters.price) {
        switch (filters.price) {
          case "<1M": if (price >= 1000000) return false; break;
          case "1M-3M": if (price < 1000000 || price > 3000000) return false; break;
          case "3M-5M": if (price < 3000000 || price > 5000000) return false; break;
          case ">5M": if (price <= 5000000) return false; break;
        }
      }

      // 2. Lọc Thương hiệu
      if (filters.brand && brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // 3. Lọc Bộ máy (MỚI)
      if (filters.movement && movement !== filters.movement.toLowerCase()) {
        return false;
      }

      // 4. Lọc Chống nước (MỚI)
      if (filters.water) {
        const filterWater = filters.water.toLowerCase(); // vd: "50m"
        
        if (filterWater === "30m") {
          // Nếu lọc 30m, bao gồm "30m" và "water resistant" (thường là mức 30m)
          if (waterResistance !== "30m" && waterResistance !== "water resistant") {
            return false;
          }
        } else {
          // Với các mức 50m, 100m, 200m, yêu cầu khớp chính xác
          if (waterResistance !== filterWater) {
            return false;
          }
        }
      }

      return true; // Sản phẩm vượt qua tất cả bộ lọc
    });
  }

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

// so sánh ===========================================================================================
(function () {
  const TAG = "[COMPARE]";
  function log(...args) {
    console.log(TAG, ...args);
  }
  function formatVND(n) {
    if (n == null || n === "") return "";
    const num =
      typeof n === "number" ? n : Number(String(n).replace(/[^\d.-]/g, ""));
    return isNaN(num) ? String(n) : num.toLocaleString("vi-VN") + " ₫";
  }
  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initCompareModule() {
    const compareBar = document.getElementById("compareBar");
    const compareItems = document.getElementById("compareItems");
    const compareNowBtn = document.getElementById("compareNowBtn");
    const clearAllBtn = document.getElementById("clearAllBtn");

    if (!compareBar || !compareItems || !compareNowBtn || !clearAllBtn) {
      log(
        "Missing required elements: #compareBar, #compareItems, #compareNowBtn, #clearAllBtn"
      );
      return;
    }

    let selected = [];

    function readCardInfo(card) {
      if (!card) return null;
      const idAttr = card.dataset?.id || card.getAttribute("data-id");
      const id = idAttr ? Number(idAttr) : Date.now();
      const img = card.querySelector("img")?.src || "";
      const name = card.querySelector(".product-name")?.innerText?.trim() || "";
      const priceText =
        card.querySelector(".product-price")?.innerText?.trim() || "";
      const oldPriceText =
        card.querySelector(".product-oldprice")?.innerText?.trim() || "";
      return { id, name, price: priceText, oldPrice: oldPriceText, image: img };
    }

    function updateCompareBar() {
      compareItems.innerHTML = "";
      selected.forEach((item) => {
        const div = document.createElement("div");
        div.className = "compare-item";
        if (item.id) div.dataset.id = item.id;
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "8px";
        div.style.padding = "6px";
        div.innerHTML = `
          <img src="${escapeHtml(
            item.image || "images/no-image.png"
          )}" width="56" height="56" style="object-fit:cover;border-radius:6px;">
          <div style="min-width:140px;max-width:220px;overflow:hidden;">
            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(
              item.name || "Sản phẩm"
            )}</div>
            <div style="font-size:11px;color:#666">${formatVND(
              item.price
            )}</div>
            <div style="font-size:11px;color:#999;text-decoration:line-through;">${escapeHtml(
              item.oldPrice || ""
            )}</div>
          </div>
          <button class="remove-compare-item" title="Xóa" style="margin-left:auto;border:none;background:transparent;cursor:pointer;font-size:14px;">✕</button>
        `;
        div
          .querySelector(".remove-compare-item")
          .addEventListener("click", () => {
            selected = selected.filter((s) => s.id !== item.id);
            updateCompareBar();
          });
        compareItems.appendChild(div);
      });
      if (selected.length > 0) compareBar.classList.remove("hidden");
      else compareBar.classList.add("hidden");
      log(
        "updateCompareBar -> selected:",
        selected.map((s) => ({ id: s.id, name: s.name }))
      );
    }

    document.addEventListener("click", function (e) {
      const btn = e.target.closest && e.target.closest(".compare-btn");
      if (!btn) return;
      e.preventDefault();
      const card = btn.closest(".product-card");
      if (!card) {
        alert("Không tìm thấy .product-card");
        return;
      }

      const cardInfo = readCardInfo(card);
      if (selected.some((s) => s.id === cardInfo.id)) {
        alert("Sản phẩm đã được chọn");
        return;
      }
      if (selected.length >= 3) {
        alert("Chỉ chọn tối đa 3 sản phẩm");
        return;
      }

      selected.push({
        id: cardInfo.id,
        name: cardInfo.name,
        price: cardInfo.price,
        oldPrice: cardInfo.oldPrice,
        image: cardInfo.image,
      });

      updateCompareBar();
    });

    compareNowBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!selected || selected.length === 0) {
        alert("Hãy chọn sản phẩm trước khi bấm 'So sánh'.");
        return;
      }
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
        ["Tên sản phẩm", (p) => escapeHtml(p.name || "")],
        [
          "Hình ảnh",
          (p) =>
            `<img src="${escapeHtml(
              p.image || ""
            )}" width="100" style="object-fit:cover;border-radius:6px;">`,
        ],
        ["Giá", (p) => formatVND(p.price)],
        ["Giá gốc", (p) => escapeHtml(p.oldPrice || "")],
      ];

      const rowsHtml = fields
        .map(([label, fn]) => {
          const cells = selProducts
            .map(
              (p) => `<td style="vertical-align:top;padding:8px;">${fn(p)}</td>`
            )
            .join("");
          return `<tr><th style="text-align:left;padding:10px;background:#fafafa">${escapeHtml(
            label
          )}</th>${cells}</tr>`;
        })
        .join("");

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
          <div style="display:flex;justifyContent:flex-end;margin-top:12px;">
            <button id="compareCloseBtn" class="btn-secondary" style="padding:8px 12px;border-radius:6px;border:none;cursor:pointer;">Đóng</button>
          </div>
        </div>
      `;
      document.body.appendChild(popup);

      const popupEl = document.getElementById("comparePopup");
      document
        .getElementById("compareCloseBtn")
        .addEventListener("click", () => popupEl.remove());
      popupEl.addEventListener("click", (e) => {
        if (e.target === popupEl) popupEl.remove();
      });

      log(
        "Popup shown with products:",
        selProducts.map((p) => ({ id: p.id, name: p.name }))
      );
    }

    log("Compare module initialized");
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initCompareModule);
  else initCompareModule();
})();

//============= END SO SÁNH ========================================================

// ================== PRODUCT DETAIL MODAL ==================
window.attachProductDetailEvents=function() {
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
      modal.querySelector("#modalCurrentPrice").textContent = window.formatPrice(product.price);
      modal.querySelector("#modalOldPrice").textContent = window.formatPrice(product.oldPrice);

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
document.addEventListener("DOMContentLoaded", window.attachProductDetailEvents);
