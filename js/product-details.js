document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productDetailModal");
  const closeBtn = modal.querySelector(".close-modal");
  const specsTable = modal.querySelector("#specsTable");

  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const name = card.querySelector(".product-name").textContent.trim();
      const product = products.find(p => p.name === name);
      if (product) openModal(product);
    });
  });

  function openModal(product) {
    modal.querySelector("#modalProductImage").src = product.image;
    modal.querySelector("#modalProductName").textContent = product.name;
    
    // Xử lý giá với hệ thống discount mới
    let currentPrice = 0;
    let oldPrice = 0;
    
    if (product.costPrice && product.profitMargin !== undefined) {
      // Có dữ liệu từ hệ thống discount mới
      const costPrice = Number(product.costPrice) || 0;
      const profitMargin = Number(product.profitMargin) || 0;
      const discount = Number(product.discount) || 0;
      
      // Tính giá bán gốc = costPrice × (1 + profitMargin%)
      oldPrice = Math.round(costPrice * (1 + profitMargin / 100));
      
      // Tính giá bán chính thức = giá gốc × (1 - discount%)
      currentPrice = Math.round(oldPrice * (1 - discount / 100));
    } else {
      // BACKWARD COMPATIBILITY - sử dụng hệ thống giá cũ
      currentPrice = product.price || 0;
      oldPrice = product.oldPrice || 0;
    }
    
    modal.querySelector("#modalCurrentPrice").textContent = currentPrice ? currentPrice.toLocaleString("vi-VN") + "₫" : "Liên hệ";
    modal.querySelector("#modalOldPrice").textContent = oldPrice ? oldPrice.toLocaleString("vi-VN") + "₫" : "";

    // Tạo bảng thông số động
    specsTable.innerHTML = `
      <tr><td>Thương hiệu:</td><td>${product.brand}</td></tr>
      <tr><td>Xuất xứ:</td><td>${product.origin}</td></tr>
      <tr><td>Loại máy:</td><td>${product.movement}</td></tr>
      <tr><td>Chất liệu dây:</td><td>${product.band}</td></tr>
      <tr><td>Chất liệu kính:</td><td>${product.glass}</td></tr>
      <tr><td>Chống nước:</td><td>${product.waterproof}</td></tr>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // Đóng modal
  closeBtn.onclick = closeModal;
  modal.onclick = e => { if (e.target === modal) closeModal(); };

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
