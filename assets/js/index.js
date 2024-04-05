$(document).ready(function () {
    // Điều khiển việc chuyển slide trong carousel
    $('#carouselExampleCaptions').carousel({
        interval: 5000, // Thời gian chuyển slide (5 giây)
        wrap: true // Cho phép quay vòng khi đến slide cuối cùng
    });

    var navbar = $('.navbar');
    var navbarHeight = navbar.outerHeight();

    $(window).scroll(function() {
        if ($(window).scrollTop() >= navbarHeight) {
            navbar.addClass('fixed-top');
        } else {
            navbar.removeClass('fixed-top');
        }
    });

    $('.dropdown-toggle').on('click', function () {
        var $parent = $(this).parent();
        var isOpen = $parent.hasClass('show');

        if (isOpen) {
            // Nếu dropdown menu đang mở, đóng lại khi nhấp lần nữa
            $('.dropdown-menu').removeClass('show');
        } else {
            // Đóng tất cả các dropdown menu khác
            $('.dropdown-menu').removeClass('show');
            // Mở dropdown menu của phần tử được nhấp
            $(this).next('.dropdown-menu').addClass('show');
        }
    });

    // Đóng dropdown menu khi click ra ngoài
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });

    // Kiểm tra nếu đã có email trong localStorage
    var loggedInUserEmail = localStorage.getItem('userEmail');
    if (loggedInUserEmail) {
        // Ẩn phần đăng nhập và hiển thị phần người dùng đã đăng nhập
        $('#loginSection').hide();
        $('#userSection').show();
        $('#userEmail').text(loggedInUserEmail);
    }

    // Xử lý sự kiện đăng xuất
    $('#logout').click(function (e) {
        e.preventDefault();

        // Hiển thị hộp thoại xác nhận
        if (confirm("Are you sure you want to log out?")) {
            // Nếu người dùng xác nhận muốn đăng xuất, tiến hành xóa email khỏi localStorage và hiển thị phần đăng nhập
            localStorage.removeItem('userEmail');
            $('#loginSection').show();
            $('#userSection').hide();
        }
    });
});
