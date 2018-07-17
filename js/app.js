'use strict';
/*
 * 创建一个包含所有卡片的数组
 */

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

function addDOM(a){
    $(".deck li").each(function(n){
        $(this).find(".fa").addClass(a[n])
    })
}
function displaySymbol(a){
    $(".card")[a].className+=" open show"
}
function checkMatch(a,n,e,t,c,o){
    var r,s=$(".card")[a[0]].children[0].className,
    i=$(".card")[a[1]].children[0].className;
    s==i?(lockCard(a),n.push(a[0]),n.push(a[1])):removeCard(a),
    16===n.length&&(r=seconds(o),addMessage(e,t,r),clearTimeout(c))
}
function addMessage(a,n,e){
    $(".container").remove();
    var t=$('<div class="result"></div>'),
    c=$('<p class="re-won">Congratulations! You Won!</p>'),
    o=$('<p class="re-moves">With&nbsp;'+a+"&nbsp;Moves&nbsp;&nbsp;,&nbsp;&nbsp;"+e+"&nbsp;seconds&nbsp;&nbsp;and&nbsp;&nbsp;"+n+"&nbsp;Stars. </p>"),
    r=$('<p class="re-moves">Woooooo!</p>'),
    s=$('<p class="re-button">Play again!</p>');
    t.append(c),t.append(o),t.append(r),t.append(s),
    $(document.body).append(t),restart(".re-button")
}
function lockCard(a){
    var n=[];
    $.each(a,function(a,e){
        $(".card")[e].className="card match animated bounce",
        n.push(e)
    }),
        $.each($(".card"),
        function(a){
            for(var e=0;e<n.length;e++)
            if(a==n[e]){var t=$(".card")[a];$(t).unbind("click")
                }   
        })
}
function removeCard(a){
    $.each(a,function(a,n){
        $(".card")[n].className="card notm animated wobble",
        function(a){
            function n(){
                a.className="card"
            }
            setTimeout(n,1500)
        }
        ($(".card")[n])
    })
}
function displayNum(a){
    $(".moves").text(""),
    $(".moves").append(a)
}
function displayStar(a){
    a>12&&a<=16?$(".stars>li:eq(2)").remove():a>16&&$(".stars>li:eq(1)").remove();
    var n=$(".stars>li").length;return n
}
    
function play(){
    var a,n,e,t=[],c=[],o=0,r=!0;
    $(".card").bind("click",function(){
        if(r){
            var s=new Date;e=s.getTime(),n=timer(0),r=!1
        }
        var i=$(".card").index(this);
        t.push(i),
        t[0]!=t[1]?displaySymbol(i):t.pop(),
        2===t.length&&(o+=1,displayNum(o),a=displayStar(o),checkMatch(t,c,o,a,n,e),t.splice(0,t.length)
        )
    })
}
function restart(a){
    $(a).bind("click",function(){
        window.location.reload()
    })
}
function interval(a,n){
    var e,t=function(){
        a.call(null),e=setTimeout(t,n)
    };
    return e=setTimeout(t,n)
}
function timer(a){
    var n=interval(function(){
        a++,$(".time span").text("").append(a)}, 1e3);
    return n
}
function seconds(a){
    var n=new Date,e=Math.floor((n.getTime()-a)/1e3);
    return e
}
$(document).ready(function(){
    var a=[
        "fa-diamond","fa-diamond",
        "fa-paper-plane-o","fa-paper-plane-o",
        "fa-anchor","fa-anchor",
        "fa-bolt","fa-bolt",
        "fa-cube","fa-cube",
        "fa-leaf","fa-leaf",
        "fa-bicycle","fa-bicycle",
        "fa-bomb","fa-bomb"
    ];
    a=shuffle(a),
    addDOM(a),
    play(),
    restart(".restart")
});
