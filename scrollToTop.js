(function (window, document) {
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function getCoord() {
        var xy1 = [];
        var xy2 = [];
        var xy3 = [];

        var xy1 = (function () {
            var x = 0;
            var y = 0;
            var documentElement = document.documentElement
            if (documentElement) {
                x = documentElement.scrollLeft || 0;
                y = documentElement.scrollTop || 0;
            }

            return [x, y];
        })();

        var xy2 = (function () {
            var x = 0;
            var y = 0;
            var bodyElement = document.body;
            if (bodyElement) {
                x = bodyElement.scrollLeft || 0;
                y = bodyElement.scrollTop || 0;
            }

            return [x, y];
        })();

        var xy3 = (function () {
            var x = window.scrollX || 0;
            var y = window.scrollY || 0;

            return [x, y];
        })();

        var max = Math.max;
        var x = max(xy1[0], max(xy2[0], xy3[0]));
        var y = max(xy1[1], max(xy2[1], xy3[1]));

        return [x, y];
    }

    var timer = null;
    /**
     * @param a: number
     * @description {a} 加速度
     * @default {a} 0.1
     */
    function scrollToTop(a) {
        a = a || 0.1;

        var speed = 1 + a;
        var floor = Math.floor;

        timer = setInterval(function () {
            requestAnimFrame(function () {
                var xy = getCoord();
                if (xy[1] <= 0) {
                    clearInterval(timer);
                }
                var x = floor(xy[0] / speed);
                var y = floor(xy[1] / speed);
                window.scrollTo(x, y);
            });
        }, 0);
    }
})(window, document, Math);
