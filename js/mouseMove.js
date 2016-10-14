var imgAd = utils.getElementsByClass("main-img-ad")[0];
var imgAdLis = imgAd.getElementsByTagName("li");
var imgDivs = utils.getElementsByClass("ad-info", imgAd);

for (var i = 0; i < imgAdLis.length; i++) {
    var curLi = imgAdLis[i];
    curLi.index = i;
    document.onmousemove = function (e) {
        e = e || window.event;

        imgAd.startX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        imgAd.startY = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    };

    curLi.onmouseenter = function (e) {
        e = e || window.event;
        moveIn.call(this, e);
    };

    curLi.onmouseleave = function (e) {
        e = e || window.event;
         imgAd.curX = e.pageX || (e.clientX + document.documentElement.scrollLeft || document.body.scrollLeft);
         imgAd.curY = e.pageY || (e.clientY + document.documentElement.scrollTop || document.body.scrollTop);
        moveOut.call(this, e);
    };
}

function moveIn(e) {
    var curT = utils.offset(this, "top");
    var curL = utils.offset(this, "left");
    var curDiv = imgDivs[this.index];

    //此段代码是为了解决ie下不兼容的问题，ie document.onmousemove事件鼠标坐标位置为小数，并且有延迟，最后得到的值是onmouseenter后的一个值，这里直接将接近的值处理成临界值以触发相应的条件
    var strX=''+parseInt(imgAd.startX),strCL1=''+curL,strCL2=curL+this.offsetWidth;
    var strY=''+parseInt(imgAd.startY),strCT1=''+curT,strCT2=curT+this.offsetHeight;
    strCL2+='';
    strCT2+='';
    if(strY.length==strCT1.length&&strY.charAt(0)==strCT1.charAt(0)){
            imgAd.startY=curT;
    }else if(strY.length==strCT2.length&&strY.charAt(0)==strCT2.charAt(0)){
            imgAd.startY=curT+this.offsetHeight;
    }
    if(strX.length==strCL1.length&&strX.charAt(0)==strCL1.charAt(0)){
        imgAd.startX=curL;
    }else if(strX.length==strCL2.length&&strX.charAt(0)==strCL2.charAt(0)){
        imgAd.startX=curL+this.offsetWidth;
    }
    //-------
    if (imgAd.startY <= curT) {
        utils.setGroupCss(curDiv, {
            top: -(curDiv.offsetHeight),
            left: 0
        });
        animate(curDiv, {top: 0}, 600);
    } else if (imgAd.startY >= curT + this.offsetHeight) {
        utils.setGroupCss(curDiv, {
            top: curDiv.offsetHeight,
            left: 0
        });
        animate(curDiv, {top: 0}, 600);
    } else {
        if (imgAd.startX <= curL) {
            utils.setGroupCss(curDiv, {
                top: 0,
                left: -(curDiv.offsetWidth)
            });
            animate(curDiv, {left: 0}, 600);
        } else if (imgAd.startX >= curL + this.offsetWidth) {
            utils.setGroupCss(curDiv, {
                top: 0,
                left: curDiv.offsetWidth
            });
            animate(curDiv, {left: 0}, 600);
        }
    }
}

function moveOut(e) {
    var curT = utils.offset(this, "top");
    var curL = utils.offset(this, "left");
    var curDiv = imgDivs[this.index];
    if (imgAd.curY <= curT) {
        utils.setGroupCss(curDiv, {
            top: 0,
            left: 0
        });
        animate(curDiv, {top:-(curDiv.offsetHeight)}, 600);
    } else if (imgAd.curY >= curT + this.offsetHeight) {
        utils.setGroupCss(curDiv, {
            top: 0,
            left: 0
        });
        animate(curDiv, {top:curDiv.offsetHeight}, 600);
    } else {
        if (imgAd.curX <= curL) {
            utils.setGroupCss(curDiv, {
                top: 0,
                left: 0
            });
            animate(curDiv, {left:  -(curDiv.offsetWidth)}, 600);
        } else if (imgAd.curX >= curL + this.offsetWidth) {
            utils.setGroupCss(curDiv, {
                top: 0,
                left: 0
            });
            animate(curDiv, {left: curDiv.offsetWidth}, 600);
        }
    }
}

