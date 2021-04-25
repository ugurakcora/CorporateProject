var interleaveOffset = 0.5;

var swiperOptions = {
    loop: true,
    speed: 1000,
    grabCursor: false,
    watchSlidesProgress: true,
    mousewheelControl: false,
    keyboardControl: true,
    touchRatio: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"><b>0' + (index + 1) + '</b></span>';
        },
    },
    on: {
        progress: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
            }
        },
        touchStart: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
        },
        setTransition: function(speed) {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
            }
        },
        slideChange: function (swiper) {
            console.log('slideChange', this.previousIndex, '->', this.activeIndex);
            $('footer ul li').removeClass('footer-active');
            $('footer ul li#el'+this.activeIndex+'').addClass('footer-active');
            if(this.activeIndex == 6){

                $('footer ul li#el1').addClass('footer-active');

            } else if(this.activeIndex == 0){

                $('footer ul li#el5').addClass('footer-active');

            }
        }
    }
};

var swiper = new Swiper(".swiper-container", swiperOptions);

$(function () {
    $('footer ul li').on('mouseover', function() {
        var x = $(this).data('id');
        swiper.slideTo(x);
    });
});