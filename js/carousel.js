var bannerCtrl = utils.getElementsByClass("banner-ctrl")[0];
var thumbSpan=bannerCtrl.getElementsByTagName("span")[0];
var thumbs = bannerCtrl.getElementsByTagName("li");
var oInner = document.getElementById("main-banner-inner");
var step = 0;
for (var i = 0; i < thumbs.length; i++) {
    var thu = thumbs[i];
    thu.index = i;
    thu.onmouseover = function () {
        animate(oInner, {top: this.index * -160}, 500);
        step = this.index;
        selectCurrent(step);
        clearInterval(autoTimer);
        autoTimer=setTimeout(function () {
            autoTimer = setInterval(autoMove, 5000);
        }, 3000)
    }
}

function autoMove() {
    step++;
    if (step > thumbs.length - 1) {
        step = 0;
    }
    animate(oInner, {top: step * -160}, 500);
    selectCurrent(step);
}

var autoTimer = window.setInterval(autoMove, 5000);

function selectCurrent(step) {
    for (var i = 0; i < thumbs.length; i++) {
        utils.removeClass(thumbs[i], "current");
        utils.addClass(thumbs[step], "current");
        animate(thumbSpan,{top:55*step},300);
    }
}

