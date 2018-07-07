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
    var currentIndex = array.length, temporaryValue, randomIndex;

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

function addDOM($card,cards_all){
    $card.each(function (i) {
        $(this).find('.fa').addClass(cards_all[i]);
    });
}

function displaySymbol($card,index){
    $card[index].className += ' open show';
}

function checkMatch(openCard,matchlength,counter,startnum,clearid,mydate,$card) {
    let second;
    let card1 = $card[openCard[0]].children[0].className;
    let card2 = $card[openCard[1]].children[0].className;
    if(card1 === card2){
        lockCard($card,openCard);
        matchlength.push(openCard[0]);
        matchlength.push(openCard[1]);
    }else {
        removeCard($card,openCard);
    }
    if(matchlength.length === 16){
        second = seconds(mydate);
        addMessage(counter,startnum,second);
        clearTimeout(clearid);
    }
}

function addMessage(counter,startnum,second) {
    $('.container').remove();

    let html = $('<div class="result"></div>');
    let info1 = $('<p class="re-won">Congratulations! You Won!</p>');
    let info2 = $('<p class="re-moves">With&nbsp;'+counter+'&nbsp;Moves&nbsp;&nbsp;,&nbsp;&nbsp;'+second+'&nbsp;seconds&nbsp;&nbsp;and&nbsp;&nbsp;'+startnum+'&nbsp;Stars. </p>');
    let info3 = $('<p class="re-moves">Woooooo!</p>');
    let button = $('<p class="re-button">Play again!</p>');
    html.append(info1,info2,info3,button);
    $(document.body).append(html);

    restart('.re-button');
}

function lockCard($card,openCard) {
    let match = [];
    $.each(openCard,function (i,data) {
        $card[data].className = 'card match animated bounce';
        match.push(data);
    });
    $.each($card,function (index) {
        for(let j=0;j<match.length;j++) {
            if(index == match[j]){
                let cancel = $card[index];
                $(cancel).unbind("click");
            }
        }
    })
}

function removeCard($card,openCard) {
    $.each(openCard,function (i,data) {
        $card[data].className = 'card notm animated wobble';
        (function (n) {
            function f() {
                n.className = 'card';
            }
            setTimeout(f,1000);
        })($card[data])
    })
}

function displayNum(counter) {
    $('.moves').text("").append(counter);
}

function displayStar(counter) {
    if(counter>12 && counter<=16){
        $('.stars>li:eq(2)').remove();
    }else if(counter>16){
        $('.stars>li:eq(1)').remove();
    }
    let starnum = $(".stars>li").length;
    return starnum;
}

function play($card) {
    let openCard = []; 
    let matchlength = []; 
    let counter = 0; 
    let startnum, clearid, mydate;
    let time = true;
    $card.bind("click",function () {
        if(time){
            let beDate = new Date();
            mydate = beDate.getTime();
            clearid=timer(0);
            time = false;
        }
        let n = $card.index(this);
        openCard.push(n);
        if (openCard[0]!=openCard[1]) {
            displaySymbol($card,n);
        }else {
            openCard.pop();
        }
        if(openCard.length === 2){
            counter += 1;
            displayNum(counter);
            startnum = displayStar(counter);
            checkMatch(openCard,matchlength,counter,startnum,clearid,mydate,$card);
            openCard.splice(0,openCard.length);
        }

    })
}

function restart(classname) {
    $(classname).bind("click",function () {
        window.location = location
    })
}

function interval(func, wait) {
    let id;
    let interv = function () {
        func.call(null);
        id = setTimeout(interv, wait);
    };
    id = setTimeout(interv ,wait);
    return id;
}

function timer(i) {
    return interval(function () {
        i=i+1;
        $('.time span').text("").append(i);
    }, 1000);
}

function seconds(bsDate) {
    let date = new Date();
    let second = Math.floor((date.getTime() - bsDate)/1000);
    return second;
}

$(document).ready(function () {
    let cards_all = [
        'fa-diamond','fa-diamond',
        'fa-paper-plane-o','fa-paper-plane-o',
        'fa-anchor','fa-anchor',
        'fa-bolt','fa-bolt',
        'fa-cube','fa-cube',
        'fa-leaf','fa-leaf',
        'fa-bicycle','fa-bicycle',
        'fa-bomb','fa-bomb'
    ];
    cards_all = shuffle(cards_all);
    let $card = $('.card');
    addDOM($card,cards_all);
    play($card);
    restart('.restart');
});
