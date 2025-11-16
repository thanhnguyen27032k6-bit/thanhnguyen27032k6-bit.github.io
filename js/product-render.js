// FILE: js/product-render.js
// Thay thế file product-render.js hiện tại bằng code này

// ==================== HÀM RENDER SẢN PHẨM ====================

// Hàm làm sạch và chuyển đổi giá sang số
function cleanPrice(price) {
  // Nếu là undefined, null, hoặc chuỗi "undefined"
  if (!price || price === "undefined" || price === "NaN" || price === "") {
    return 0;
  }
  
  // Nếu là string, loại bỏ tất cả ký tự không phải số
  if (typeof price === 'string') {
    const cleaned = price.replace(/[^\d]/g, '');
    return parseInt(cleaned) || 0;
  }
  
  // Nếu là số
  const num = Number(price);
  return isNaN(num) ? 0 : num;
}

// Hàm tính giá trị thẻ giảm giá (discount badge)
function calculateDiscountPercentage(originalPrice, salePrice) {
  const original = cleanPrice(originalPrice);
  const sale = cleanPrice(salePrice);
  
  if (original <= 0 || sale <= 0 || original <= sale) {
    return 0;
  }
  
  return Math.round(((original - sale) / original) * 100);
}

// Hàm render một sản phẩm
function renderProductCard(product) {
  // Xử lý ảnh
  let imgSrc = product.image;
  if (!imgSrc.startsWith('http') && !imgSrc.startsWith('data:image')) {
    imgSrc = imgSrc.replace(/^\.\.\//, '');
  }

  // ✅ XỬ LÝ GIÁ - TÍNH TOÁN TỪ COSTPRICE + DISCOUNT
  let productPrice = 0;      // Giá bán chính thức (sau giảm giá)
  let productOriginalPrice = 0; // Giá bán gốc (trước giảm giá)
  let discountPercent = 0;
  
  // LOGIC TÍNH GIÁ MỚI (với discount system):
  if (product.costPrice && product.profitMargin !== undefined) {
    // Có dữ liệu từ hệ thống discount mới
    const costPrice = cleanPrice(product.costPrice);
    const profitMargin = Number(product.profitMargin) || 0;
    const discount = Number(product.discount) || 0;
    
    // Tính giá bán gốc = costPrice × (1 + profitMargin%)
    productOriginalPrice = Math.round(costPrice * (1 + profitMargin / 100));
    
    // Tính giá bán chính thức = giá gốc × (1 - discount%)
    productPrice = Math.round(productOriginalPrice * (1 - discount / 100));
    
    // Discount percent là % giảm từ giá gốc so với giá chính thức
    if (discount > 0) {
      discountPercent = discount;
    }
  } else {
    // BACKWARD COMPATIBILITY - sử dụng hệ thống giá cũ
    productPrice = cleanPrice(product.price);
    productOriginalPrice = cleanPrice(product.oldPrice);
    if (productOriginalPrice > 0 && productOriginalPrice > productPrice) {
      discountPercent = calculateDiscountPercentage(productOriginalPrice, productPrice);
    }
  }
  
  let priceHTML = '';
  let discountBadge = '';
  
  // Kiểm tra giá hợp lệ
  if (productPrice <= 0) {
    priceHTML = `
      <div class="product-price">
        <span class="price-sale">Liên hệ</span>
      </div>
    `;
  }
  // Kiểm tra xem có giảm giá không
  else if (productOriginalPrice > 0 && productOriginalPrice > productPrice) {
    // CÓ GIẢM GIÁ - Hiển thị giá gốc + giá sale
    priceHTML = `
      <div class="product-price">
        <div class="price-row">
          <span class="price-original">${productOriginalPrice.toLocaleString("vi-VN")}₫</span>
        </div>
        <div class="price-row">
          <span class="price-sale">${productPrice.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>
    `;
    
    if (discountPercent > 0) {
      discountBadge = `<span class="discount-badge">-${discountPercent}%</span>`;
    }
  } else {
    // KHÔNG GIẢM GIÁ - Chỉ hiển thị giá bình thường
    priceHTML = `
      <div class="product-price">
        <span class="price-sale">${productPrice.toLocaleString("vi-VN")}₫</span>
      </div>
    `;
  }

  return `
    <div class="product-item" data-id="${product.id}" data-category="${product.category}" data-brand="${product.brand}">
      ${discountBadge}
      <div class="product-image">
        <img src="${imgSrc}" 
             alt="${product.name}" 
             onerror="this.src='image/anh_default.png'">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-brand">${product.brand}</p>
        ${priceHTML}
      </div>
      <div class="product-actions">
        <button class="btn-detail" data-id="${product.id}">
          <i class="fas fa-info-circle"></i> Chi tiết
        </button>
        <button class="compare-btn" data-id="${product.id}">
          <i class="fas fa-balance-scale"></i> So sánh
        </button>
      </div>
    </div>
  `;
}

// ==================== RENDER CÁC DANH MỤC ====================

// Render sản phẩm Xu hướng 2025
function renderXuHuongProducts() {
  const container = document.getElementById("xuhuong-products");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("products")) || window.PRODUCTS || [];
  const xuhuongProducts = products.filter(p => p.category === "xuhuong");

  if (xuhuongProducts.length === 0) {
    container.innerHTML = '<p style="text-align: center; width: 100%; padding: 40px;">Chưa có sản phẩm nào trong danh mục này.</p>';
    return;
  }

  container.innerHTML = xuhuongProducts.map(product => renderProductCard(product)).join("");
}

// Render sản phẩm Nam
function renderNamProducts() {
  const container = document.getElementById("nam-products");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("products")) || window.PRODUCTS || [];
  const namProducts = products.filter(p => p.category === "nam");

  if (namProducts.length === 0) {
    container.innerHTML = '<p style="text-align: center; width: 100%; padding: 40px;">Chưa có sản phẩm nào trong danh mục này.</p>';
    return;
  }

  container.innerHTML = namProducts.map(product => renderProductCard(product)).join("");
}

// Render sản phẩm Nữ
function renderNuProducts() {
  const container = document.getElementById("nu-products");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("products")) || window.PRODUCTS || [];
  const nuProducts = products.filter(p => p.category === "nu");

  if (nuProducts.length === 0) {
    container.innerHTML = '<p style="text-align: center; width: 100%; padding: 40px;">Chưa có sản phẩm nào trong danh mục này.</p>';
    return;
  }

  container.innerHTML = nuProducts.map(product => renderProductCard(product)).join("");
}

// Render sản phẩm Hot Sale
function renderHotSaleProducts() {
  const container = document.getElementById("hotsale-products");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("products")) || window.PRODUCTS || [];
  const hotProducts = products.filter(p => p.category === "hot");

  if (hotProducts.length === 0) {
    container.innerHTML = '<p style="text-align: center; width: 100%; padding: 40px;">Chưa có sản phẩm nào trong danh mục này.</p>';
    return;
  }

  container.innerHTML = hotProducts.map(product => renderProductCard(product)).join("");
}

// ==================== KHỞI TẠO ====================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎨 Khởi tạo render sản phẩm...");
  
  // Render tất cả danh mục
  renderXuHuongProducts();
  renderNamProducts();
  renderNuProducts();
  renderHotSaleProducts();
  
  console.log("✅ Đã render tất cả sản phẩm!");
});

// Export các hàm để sử dụng ở nơi khác
window.renderProductCard = renderProductCard;
window.renderXuHuongProducts = renderXuHuongProducts;
window.renderNamProducts = renderNamProducts;
window.renderNuProducts = renderNuProducts;
window.renderHotSaleProducts = renderHotSaleProducts;