$(function() {

    var htmlstr = '';
    var goods = JSON.parse(localStorage.goodtopay)
    $(goods).each((index, m) => {
            htmlstr += `        <li>
    <p class="shop-title">
    ${m.shopName}
    </p>
    <div class="good-des">
        <img src=${m.goodView} alt="">
        <p class="title">${m.title} </p>
        <p class="des">
            <span>网络类型：${m.goodDes.webtype}</span>
            <span>机身颜色：${m.goodDes.phonecolor} </span>
            <span>套餐类型：${m.goodDes.kindtype} </span>
            <span>存储容量：${m.goodDes.room}    </span>
        </p>
        <p class="price">${m.onePrice}</p>
        <p class="count">${m.count}</p>
        <p class="sellway">无优惠</p>
        <p class="total">${m.htotal}</p>

    </div>
</li>`
        });


        //页面加载订单数据
    $('.order-list ul').html(htmlstr);
    //改变地址栏样式
    $('.receiver-msg').each((index, m) => {
        $(m).addClass('ddd');
        var adrmsg = {
            payaddress: '',
            payuser: '',
            paytel: ''
        }
        $(m).click(() => {

            var idx = $(m).index();
            var hasred = false;
            if ($(m).hasClass('red')) {
                return;
            } else {
                $(m).addClass('red')
                $(m).parent().siblings().find('.receiver-msg').removeClass('red')
                $(m).parent().find('.receiver-msg').eq(idx).addClass('red')
            }
            adrmsg.payaddress = $(m).find('.addrdes').text();
            adrmsg.payuser = $(m).find('.user').text();
            adrmsg.paytel = $(m).find('.tel').text();

            //提交订单获取地址以及商品价格
            $('.payaddress').text(adrmsg.payaddress)
            $('.pay-user').text(adrmsg.payuser)
            $('.paytel').text(adrmsg.paytel)

        })
    })

    //实付款总价获取

    var ordertotal = 0;
    $('.good-des').each((i, m) => {

        ordertotal = ordertotal + parseFloat($(m).find('.total').text());

    })
    $('.pay-box .total').text('￥' + ordertotal);
})