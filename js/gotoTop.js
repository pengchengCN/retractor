var backUp=document.getElementById("backup");
var back2T=utils.getElementsByClass("backtotop",backUp)[0];

back2T.onclick=goToTop;

function goToTop(){
    var step=utils.win("scrollTop")/300*10,
        timer=null;

    ~function move(){
        window.clearTimeout(timer);
        var curT=utils.win("scrollTop");
        utils.win("scrollTop",curT-step);
        var curN=utils.win("scrollTop");
        if(curT===curN){
            return;
        }
        timer=window.setTimeout(move,10);
    }();
}

bind(window,"scroll",hideShow);
function hideShow(){
    var winT=utils.win("scrollTop");
    back2T.style.display="block";
    if(winT===0){
        back2T.style.display="none";
    }
}