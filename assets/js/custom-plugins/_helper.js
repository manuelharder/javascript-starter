
// debounce function //

function debounce(func, wait, immediate) {
        
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) {func.apply(context, args);}
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {func.apply(context, args);}
    };
};


// image load function //

(function ($) {

    $.fn.loadImages = function (callback) {

        var elems = this;
        
        this.each(function() {
            
            var el = this;

            var image = new Image();

            image.src = returnSrc($(el));

            image.onload = function() {

                callback.call(this, el);
            };
        });
        
    };


    function returnSrc($el) {

        if ($el.attr("src")) { return $el.attr("src"); }

        if (!$el.css('background-image')) { return false; }

        return $el.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
    }


}(jQuery));