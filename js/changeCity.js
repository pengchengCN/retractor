var changeCityBtn = utils.getElementsByClass("cityChange")[0];
var coverLayer = document.getElementById("coverLayer");
var coverBox = document.getElementById("coverBox");
var cBoxContent = document.getElementById("coverBoxM-content");
var close = cBoxContent.getElementsByTagName("span")[0];
changeCityBtn.onclick = function () {
    boxShow(500, function () {
        cBoxContent.style.display = "block";
    });
};

var ary=[coverLayer,close];
for(var i=0;i<ary.length;i++){
    ary[i].onclick = function () {
        boxHide(200, function () {
            coverLayer.style.display = "none";
            coverBox.style.display = "none";
        });
    };
}

function boxShow(duration, callback) {
    utils.setGroupCss(coverBox, {
        display: "block",
        opacity: 1,
        filter: "alpha(opacity=100)",
        width:728
    });
    utils.setGroupCss(coverLayer, {
        display: "block",
        opacity: 1,
        filter: "alpha(opacity=100)"
    });

    var stepW = 528 / duration * 10;
    ~function move() {
        clearTimeout(coverBox.timer);
        var curW = utils.getCss(coverBox, "width");
        if (curW - stepW <= 528) {
            utils.setGroupCss(coverBox, {
                width: 528,
                marginLeft: -264,
                marginTop: -258 + utils.win("scrollTop")
            });
            typeof callback === "function" ? callback() : null;
            return;
        } else {
            utils.setGroupCss(coverBox, {
                width: curW - stepW,
                marginLeft: -((curW - stepW) / 2),
                marginTop: -258 + utils.win("scrollTop")
            });
        }
        coverBox.timer = setTimeout(move, 10);
    }();
}

function boxHide(duration, callback) {
    var stepO = 1 / duration * 10;
    var closeAry = [coverBox, coverLayer];
    ~function move() {
        clearTimeout(coverBox.timer);
        for (var i = 0; i < closeAry.length; i++) {
            var curO = utils.getCss(closeAry[i], "opacity");
            if (curO - stepO <= 0) {
                utils.setGroupCss(closeAry[i], {
                    opacity: 0,
                    filter: 'alpha(opacity=0)'
                });
                typeof callback === "function" ? callback() : null;
                return;
            }
            utils.setGroupCss(closeAry[i], {
                opacity: curO - stepO,
                filter: 'alpha(opacity=' + (curO - stepO) * 100 + ')'
            });
        }
        coverBox.timer = setTimeout(move, 10);
    }();
}

