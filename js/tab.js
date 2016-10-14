var oTab = utils.getElementsByClass("job-tab")[0];
var oTabs=oTab.getElementsByTagName("li");
var jobList=utils.getElementsByClass("joblist")[0];
var jLists=jobList.getElementsByTagName("ul");

for (var i = 0; i < oTabs.length; i++) {
    oTabs[i].onclick = tabChange;
}

function tabChange() {
    var n = utils.getIndex(this);
    utils.addClass(this,"current");
    var siblings=utils.siblings(this);
    for(var i=0;i<siblings.length;i++){
        utils.removeClass(siblings[i],"current");
    }

    for(var i=0;i<jLists.length;i++){
        utils.removeClass(jLists[i],"current");
    }
    utils.addClass(jLists[n],"current");
}