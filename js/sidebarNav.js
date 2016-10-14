var con=document.getElementById("content");
var menuBoxs=utils.getElementsByClass("menubox",con);
var menuSubs=utils.getElementsByClass("menu-sub",con);

for(var i=0;i<menuBoxs.length;i++){
    var curM=menuBoxs[i];
    curM.index=i;
    curM.onmouseover=function(){
        utils.addClass(menuBoxs[this.index],"current");
        menuSubs[this.index].style.display="block";
    }
    curM.onmouseout=function(){
        utils.removeClass(menuBoxs[this.index],"current");
        menuSubs[this.index].style.display="none";
    }
}