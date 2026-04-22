// ==========================================
// FILE: index.js (GIAO DIỆN KHÁCH & ĐĂNG NHẬP)
// ==========================================
let isLoginMode = true;

function showLoginModal() { 
    document.getElementById('login-modal').style.display = 'flex'; 
    document.getElementById('auth-message').style.display = 'none'; 
    document.getElementById('auth-username').value = '';
    document.getElementById('auth-pass').value = '';
    if(!isLoginMode) document.getElementById('auth-confirm-pass').value = '';
}

function hideLoginModal() { 
    document.getElementById('login-modal').style.display = 'none'; 
}

function showMessage(text, isSuccess) {
    const msgBox = document.getElementById('auth-message');
    msgBox.style.display = 'block';
    msgBox.innerText = text;
    msgBox.style.backgroundColor = isSuccess ? '#dcfce7' : '#fee2e2'; 
    msgBox.style.color = isSuccess ? '#166534' : '#991b1b'; 
    msgBox.style.border = `1px solid ${isSuccess ? '#bbf7d0' : '#fecaca'}`;
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-message').style.display = 'none'; 
    
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const confirmPassWrapper = document.getElementById('auth-confirm-pass-wrapper');
    const mainBtn = document.getElementById('auth-action-btn');
    const switchText = document.getElementById('auth-switch-text');
    const switchBtn = document.getElementById('auth-switch-btn');

    if (isLoginMode) {
        title.innerText = 'Đăng nhập';
        subtitle.innerText = 'Chào mừng bạn quay trở lại finz';
        confirmPassWrapper.style.display = 'none'; 
        mainBtn.innerText = 'Đăng nhập';
        switchText.innerText = 'Chưa có tài khoản?';
        switchBtn.innerText = 'Đăng ký ngay';
    } else {
        title.innerText = 'Đăng ký tài khoản';
        subtitle.innerText = 'Bắt đầu hành trình quản lý tài chính';
        confirmPassWrapper.style.display = 'block'; 
        mainBtn.innerText = 'Tạo tài khoản';
        switchText.innerText = 'Đã có tài khoản?';
        switchBtn.innerText = 'Đăng nhập';
    }
}

function handleAuthAction() {
    const user = document.getElementById('auth-username').value.trim();
    const pass = document.getElementById('auth-pass').value;

    if (!user || !pass) {
        showMessage('Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.', false);
        return;
    }

    if (isLoginMode) {
        if (user === 'user' && pass === 'user') {
            localStorage.setItem('finz_demo_mode', 'empty');
            showMessage('Đăng nhập thành công! Đang tải dữ liệu...', true);
            setTimeout(() => executeLogin(), 1000);
        } else {
            showMessage('Tên đăng nhập hoặc mật khẩu không chính xác!', false);
        }
    } else {
        const confirmPass = document.getElementById('auth-confirm-pass').value;
        if (pass !== confirmPass) {
            showMessage('Mật khẩu nhập lại không khớp!', false);
            return;
        }
        localStorage.setItem('finz_demo_mode', 'empty');
        showMessage('Tạo tài khoản thành công! Đang vào trang chủ...', true);
        setTimeout(() => executeLogin(), 1000);
    }
}

function quickLoginAdmin() {
    localStorage.setItem('finz_demo_mode', 'full_data');
    showMessage('Đang truy cập tài khoản mẫu...', true);
    setTimeout(() => executeLogin(), 800);
}

function mockSocialLogin(provider) {
    showMessage(`Đang kết nối bảo mật tới ${provider}... Vui lòng đợi.`, true);
    setTimeout(() => {
        localStorage.setItem('finz_demo_mode', 'empty');
        showMessage(`Xác thực ${provider} thành công! Đang chuyển hướng...`, true);
        setTimeout(() => executeLogin(), 1000);
    }, 1500);
}

function executeLogin() {
    let prefix = window.location.pathname.includes('/pages/') ? '../' : '';
    window.location.href = prefix + 'index.html';
}

function redirectToDashboardIfLoggedIn() {
    
}

// SLIDESHOW
let slideIndex = 1;
let slideTimer;

document.addEventListener("DOMContentLoaded", function() {
    redirectToDashboardIfLoggedIn();
    if(document.getElementsByClassName("mySlides").length > 0) {
        showSlides(slideIndex);
        slideTimer = setInterval(function() { plusSlides(1) }, 3000);
    }
});

function plusSlides(n) {
    clearInterval(slideTimer); 
    showSlides(slideIndex += n);
    slideTimer = setInterval(function() { plusSlides(1) }, 3000); 
}

function currentSlide(n) {
    clearInterval(slideTimer);
    showSlides(slideIndex = n);
    slideTimer = setInterval(function() { plusSlides(1) }, 3000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) slides[i].classList.remove("active");
    for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active-dot", "");
    slides[slideIndex - 1].classList.add("active");
    if(dots.length > 0) dots[slideIndex - 1].className += " active-dot";
}