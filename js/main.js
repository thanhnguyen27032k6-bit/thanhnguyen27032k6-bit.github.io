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
        slides.style.marginLeft = `-${(i * 100)}%`;
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
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResultsContainer = document.getElementById('search-results-container');
  const noResultsMessage = document.getElementById('no-results');
  
  function renderProductCard(product) {
    return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.alt}">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-oldprice">${product.oldPrice}</div>
      </div>
    `;
  }
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    hienTrang('search'); 

    searchResultsContainer.innerHTML = '';
    noResultsMessage.style.display = 'none';

    if (query.length === 0) {
      noResultsMessage.textContent = 'Vui lòng nhập từ khóa để tìm kiếm.';
      noResultsMessage.style.display = 'block';
      return;
    }

    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.alt.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        searchResultsContainer.insertAdjacentHTML('beforeend', renderProductCard(product));
      });
    } else {
      noResultsMessage.textContent = `Không tìm thấy sản phẩm nào cho từ khóa: "${searchInput.value}"`;
      noResultsMessage.style.display = 'block';
    }
  }

  searchButton.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  //KHỞI TẠO CUỐI CÙNG
  hienTrang('home'); // Khởi tạo lần đầu

  // HÃNG 
  function displayBrandProducts(brandName) {
      // 1. Chuyển trang
      hienTrang('brand-detail');

      // 2. Cập nhật tiêu đề
      document.getElementById('brand-title').textContent = `${brandName.toUpperCase()}`;
      
      const container = document.getElementById('brand-products-container');
      const noResults = document.getElementById('no-brand-products');
      container.innerHTML = '';

      // 3. Lọc sản phẩm
      // Logic lọc đơn giản: Tìm brandName trong product.name hoặc product.alt
      // Sử dụng biến products từ data.js
      const filtered = products.filter(p => 
          p.name.toLowerCase().includes(brandName.toLowerCase()) || 
          p.alt.toLowerCase().includes(brandName.toLowerCase())
      );

      // 4. Render kết quả (sử dụng lại renderProductCard)
      if (filtered.length > 0) {
          // Reset style display của container để nó xếp hàng đúng
          container.style.display = 'flex'; 
          filtered.forEach(product => {
              container.insertAdjacentHTML('beforeend', renderProductCard(product));
          });
          noResults.style.display = 'none';
      } else {
          container.style.display = 'block'; // Đặt lại block để thông báo nằm giữa
          noResults.style.display = 'block';
          noResults.textContent = `Không tìm thấy sản phẩm nào của hãng ${brandName.toUpperCase()} trong dữ liệu.`;
      }
  }

  // 5. Gắn sự kiện Click cho các thẻ hãng
  const brandLinks = document.querySelectorAll('.product-categories .brand-link');

  brandLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const brandName = this.getAttribute('data-brand');
          if (brandName) {
              displayBrandProducts(brandName);
          }
      });
  });



});

// === LỊCH SỬ XEM SẢN PHẨM ===
document.addEventListener("DOMContentLoaded", function () {
  const MAX_HISTORY_ITEMS = 15;
  const historySections = document.querySelectorAll(".viewed-history-section");

  // Hàm tạo thẻ sản phẩm trong lịch sử
  function renderHistoryItem(product) {
    const nameShort =
      product.name.length > 25 ? product.name.substring(0, 25) + "..." : product.name;
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
        <button class="item-remove" data-image="${product.image}">&times;</button>
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
        history.forEach((p) => container.insertAdjacentHTML("beforeend", renderHistoryItem(p)));
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
        const oldPrice = card.querySelector(".product-oldprice")?.textContent || "";

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
});


//LỌC SP
document.addEventListener("DOMContentLoaded", function () {
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
        case "<1M": return price < 1000000;
        case "1M-3M": return price >= 1000000 && price <= 3000000;
        case "3M-5M": return price > 3000000 && price <= 5000000;
        case ">5M": return price > 5000000;
        default: return true;
      }
    }

    function filterProducts() {
      const priceValue = priceFilter.value;
      const brandValue = brandFilter.value.toLowerCase();

      productData.forEach(({ element, name, price }) => {
        const matchesBrand = !brandValue || name.toLowerCase().includes(brandValue);
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

//============= END SO SÁNH ========================================================







