// 1. call element -> event click
// 2. removeClass active
// 3. addClass active

var colorItem = $('.js-choose-color');

colorItem.click(function() {
    colorItem.removeClass('active');
    $(this).addClass('active');
});