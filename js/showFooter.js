var oFooter = document.getElementById("footer"),
    loginRegBar = document.getElementById("login-reg-bar"),
    wClientH = utils.win("clientHeight");

if (loginRegBar) {
    bind(window,"scroll",loginRegBarShow);
    function loginRegBarShow() {
        var wScrollT = utils.win("scrollTop"),
            fOffsetT = utils.offset(oFooter, "top");
        if (wScrollT + wClientH > fOffsetT) {
            var bottomVal = wScrollT + wClientH - fOffsetT;
            utils.setCss(loginRegBar, "bottom", bottomVal);
        } else {
            utils.setCss(loginRegBar, "bottom", 0);
        }
    }
}

