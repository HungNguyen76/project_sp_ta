document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
    Validator({
        form: '#form-1',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isEmail('#email'),
            Validator.minLength('#password', 6),
        ],
        onSubmit: function (data) {
            let listUsers = JSON.parse(localStorage.getItem('listUsers')) || [];

            let foundUser = listUsers.find(user => user.email === data.email && user.password === data.password);
            
            if(foundUser) {
                alert("Đăng nhập thành công");
                // Lưu email vào localStorage
                localStorage.setItem('userEmail', foundUser.email);
                // Thực hiện chuyển hướng sau khi đăng nhập thành công
                function redirect() {
                    window.location.href = "/index.html";
                }
                setTimeout(redirect, 1000);
            } else {
                alert("Email hoặc mật khẩu không chính xác");
            }
        }
    });
});
