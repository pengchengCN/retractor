//this:
//1)这种写法虽然解决了this问题，但是移除的时候不知道该移除谁
// curEle.attachEvent("on" + eventType, function () {
//    eventFn.call(curEle);
//});

//2)这种写法如果只绑定一个事件是可以的，但是绑定多个，由于我们采用的是全局变量，所以只能保存最后绑定的事件，之前绑定的都没有效果
//var tempFn = null;
//tempFn = function () {eventFn.call(curEle);};
function bind(curEle, eventType, eventFn) {
    if ("addEventListener" in window) {
        curEle.addEventListener(eventType, eventFn, false);
        return;
    }
    var tempFn = function () {
        eventFn.call(curEle);
    };
    tempFn.photo = eventFn;
    !curEle["my" + eventType] ? curEle["my" + eventType] = [] : null;
    var ary = curEle["my" + eventType];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo == eventFn) {
            return;
        }
    }
    ary.push(tempFn);
    curEle.attachEvent("on" + eventType, tempFn);
}

function unbind(curEle, eventType, eventFn) {
    if ("removeEventListener" in window) {
        curEle.removeEventListener(eventType, eventFn, false);
        return;
    }
    var ary = curEle["my" + eventType];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo == eventFn) {
            curEle.detachEvent("on" + eventType, ary[i]);
            ary[i] = ary[ary.length - 1];
            ary.length--;
            break;
        }
    }
}

//解决顺序混乱：自己创建一个事件池，绑定一个我存储一个，最后执行的时候，我自己按照自己的事件池一次执行
//on:创建一个事件池，把需要绑定的方法都放进去
function on(curEle, eventType, eventFn) {
    !curEle["myEvent" + eventType] ? curEle["myEvent" + eventType] = [] : null;
    var ary = curEle["myEvent" + eventType];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] == eventFn) {
            return;
        }
    }
    ary.push(eventFn);
    bind(curEle, eventType, run);//目前curEle只绑定了一个方法run，我们在run中在把我们自己事件池中的方法依次执行
}
//off:在自己的事件池中，把需要移除的方法去掉
function off(curEle, eventType, eventFn) {
    var ary = curEle["myEvent" + eventType];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] == eventFn) {
            ary[i] = null;
            break;
        }
    }
}
//run:按照自己的事件池，依次执行我们的绑定的方法
function run(e) {
    e = e || window.event;
    var flag = e.target ? true : false;
    if (!flag) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
    }

    //this-->curEle
    var ary = this["myEvent" + e.type];
    for (var i = 0; i < ary.length; i++) {
        var curFn = ary[i];
        if (typeof curFn === "function") {
            curFn.call(this, e);
        } else {
            ary.splice(i, 1);
            i--;
        }
    }
}






