// Breakpoint variables used throughout to determine what viewport we're on.
var bp = 'lg';

var breakpoints = {
    xsmall: 479,
    small: 599,
    medium: 767,
    large: 959,
    xlarge: 1199
};
/**
 * Extend Number object to provide between functionality
 * 
 * @param INT a
 * @param INT b
 * @returns BOOLEAN
 */
 Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};


/**
 * Set the global bp variable to the represent the current media query breakpoint.
 */
 var set_breakpoint = function () {

    var winWidth = $(window).width();

    if (winWidth < breakpoints.xsmall) {
        bp = 'mb';
    }
    else if (winWidth.between(breakpoints.xsmall, breakpoints.small + 1)) {
        bp = 'xs';
    }
    else if (winWidth.between(breakpoints.small, breakpoints.medium + 1)) {
        bp = 'sm';
    }
    else if (winWidth.between(breakpoints.medium, breakpoints.large + 1)) {
        bp = 'md';
    }
    else if (winWidth.between(breakpoints.large, breakpoints.xlarge + 1)) {
        bp = 'lg';
    }
    else {
        bp = 'xl';
    }
};

/**
 * Add page scrolling
 * -----------------
 * Add a scrolling animation to all on-page anchors
 */
 var set_up_scroll_animation = function () {
    $('[href^="#"]').click(function (e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top - 72
        }, 1500, 'easeInOutQuart');
    });

};

/**
 * Returns true or false if the current breakpoint is considered to be a mobile device.
 * @returns bool
 */
 var are_we_on_a_mobile_device = function () {
    return $(window).width() < breakpoints.small ? true : false;
};

var intro_block_delay = function () {
    var multiplier = 7;
    return ($('html').height() / multiplier) * -1;
};

var positions = {
    tap: {
        mb: {delay: 200, start: -80, end: -200},
        xs: {delay: 200, start: -80, end: -200},
        sm: {delay: 200, start: -200, end: -180},
        md: {delay: 400, start: -250, end: -180},
        lg: {delay: 400, start: -250, end: -180},
        xl: {delay: 400, start: -250, end: -180}
    },
    montage: {
        mb: {duration: 600, delay: 200, start: '101%', end: '120%'},
        xs: {duration: 600, delay: 200, start: '101%', end: '120%'},
        sm: {duration: 600, delay: 250, start: '101%', end: '120%'},
        md: {duration: 800, delay: 300, start: '101%', end: '120%'},
        lg: {duration: 800, delay: 300, start: '101%', end: '115%'},
        xl: {duration: 800, delay: 350, start: '101%', end: '115%'}
    }
};

$(document).ready(function () {

    set_breakpoint();

    var scrollorama = $.scrollorama({
        blocks: '.scroll-block',
        enablePin: false
    });

    //.parallax(xPosition, speedFactor, outerHeight) options:
    //  xPosition - Horizontal position of the element
    //  inertia - speed to move relative to vertical scroll.
    //  outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    //$('#hp-intro').parallax("50%", 0.8, true);

    scrollorama
    .animate('#hp-montage div', {
        delay: positions.montage[bp].delay,
        start: positions.montage[bp].start,
        end: positions.montage[bp].end,
        duration: positions.montage[bp].duration,
        property: 'background-size',
        easing: 'easeInOutQuad'
    });

    if ($(window).width() >= breakpoints.medium) {
        scrollorama
        .animate('#hp-info-panels li:first-of-type', {duration: 100, delay: intro_block_delay(), property: 'opacity', start: 0, end: 1})
        .animate('#hp-info-panels li:first-of-type', {duration: 400, delay: intro_block_delay(), property: 'left', start: '-10%', end: 0, easing: 'easeInOutCubic'})
        .animate('#hp-info-panels li:last-of-type', {duration: 100, delay: intro_block_delay(), property: 'opacity', start: 0, end: 1})
        .animate('#hp-info-panels li:last-of-type', {duration: 400, delay: intro_block_delay(), property: 'right', start: '-10%', end: 0, easing: 'easeInOutCubic'});
    }

    $('#ellipse').click(function () {
        $(this).next('ul').toggleClass('active');
    });

    // Initialise page scrolling animation
    set_up_scroll_animation();

    /**
     * Image gallery on homepage
     */
     $('#gallery-thumbs img').click(function () {
        var filename = $(this).data('image');
        $('#gallery-viewer').attr('src', '/resources/img/gallery/images/' + filename);
    });

     $('.video-thumb').click(function () {
        var iframe = $('<iframe src="' + $(this).data('video') + '?fs=0&modestbranding=1&rel=0&showinfo=0"></iframe>')
        $(this).html(iframe);
    });

 });

$(window).load(function () {
    resize_functions();
});

$(window).resize(function () {
    resize_functions();
});

var resize_functions = function () {
    set_breakpoint();
    resize_montage_images();
}

var resize_montage_images = function () {
    $left = typeof $left != 'undefined' ? $left : $('#hp-montage .left');
    $rightSmall = typeof $rightSmall != 'undefined' ? $rightSmall : $('#hp-montage .right.small');
    $rightBig = typeof $rightBig != 'undefined' ? $rightBig : $('#hp-montage .right.big');

    $left.css('height', $left.width() * 0.7);
    $rightSmall.css('height', $left.height() * 0.60714);
    $rightBig.css('height', $left.height() * 0.39285);
};