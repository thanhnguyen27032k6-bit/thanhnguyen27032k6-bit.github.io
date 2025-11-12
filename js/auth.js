// Đăng nhập / đăng ký / quản lý tài khoản
    // =======================================================
        // PHẦN JAVASCRIPT
        // =======================================================

        const LOGIN_USERNAME = "admin";
        const LOGIN_PASSWORD = "123"; // Mật khẩu mẫu

        const loginForm = document.getElementById('adminLoginForm');
        const loginScreen = document.getElementById('loginScreen');
        const adminDashboard = document.getElementById('adminDashboard');
        const loginErrorMessage = document.getElementById('loginErrorMessage');
        const loggedInUserSpan = document.getElementById('loggedInUser');

        const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
        const mainContentSections = document.querySelectorAll('.main-content .data-section, .main-content .dashboard-section');
        const pageTitle = document.getElementById('page-title');

        // Hàm kiểm tra trạng thái đăng nhập khi tải trang
        function checkLoginStatus() {
            // Sử dụng localStorage để giữ trạng thái sau khi refresh
            const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
            if (isLoggedIn === 'true') {
                showDashboard(localStorage.getItem('adminUsername') || LOGIN_USERNAME);
            } else {
                showLogin();
            }
        }

        // Hàm xử lý đăng nhập
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kiểm tra mật khẩu (Mô phỏng Backend)
            if (username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
                // Đăng nhập thành công
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('adminUsername', username);
                showDashboard(username);
            } else {
                // Đăng nhập thất bại
                loginErrorMessage.style.display = 'block';
            }
        });

        // Hàm hiển thị Dashboard
        function showDashboard(username) {
            loginScreen.style.display = 'none';
            adminDashboard.style.display = 'flex'; // Hiển thị dashboard
            loggedInUserSpan.textContent = username;
            loginErrorMessage.style.display = 'none';
            
            // Chuyển đến Dashboard mặc định
            document.getElementById('link-dashboard').click();
        }

        // Hàm hiển thị trang Login
        function showLogin() {
            loginScreen.style.display = 'flex';
            adminDashboard.style.display = 'none';
        }

        // Hàm xử lý Đăng xuất
        function logoutAdmin(event) {
            event.preventDefault();
            localStorage.setItem('isAdminLoggedIn', 'false');
            localStorage.removeItem('adminUsername');
            showLogin();
        }

        const hideAllSections = () => {
            mainContentSections.forEach(section => {
                section.style.display = 'none';
            });
        };

        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    const targetId = link.getAttribute('href').substring(1);
                    hideAllSections();
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.style.display = 'block';
                        pageTitle.textContent = link.textContent.trim();
                    }
                }
            });
        });

       
    