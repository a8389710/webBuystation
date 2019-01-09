$(function () {
    var _this = this;
    //如果购物车没有东西
    $('.span-logo').click(() => {
        window.open('../index.html');
    })
    if (localStorage.getItem('goodtocar') == null || JSON.parse(localStorage.goodtocar) == '') {
        $('.nogoods').removeClass('hid')
        $('.hasgoods').addClass('hid')
        return;

    } else {
        $('.nogoods').addClass('hid')
        $('.hasgoods').removeClass('hid')



        // 如果购物车有东西 

        var goods = JSON.parse(localStorage.goodtocar)
        var htmlstr = '';
        $(goods).each((index, m) => {
            htmlstr +=
                ` <li class="shop-goods">
            <div class="shop-name">
               <span>${m.shopName}</span>
            </div>
            <div class="goods-show">
                <ul>
                    <li class="one-good">
                        <input type="checkbox" class="ipt-good ipt-chose">
                        <img class="good-view" src=${m.goodView} alt="">
                        <p class="title">${m.title}</p>
                        <div class="good-des">
                            <p>网络类型:${m.goodDes.webtype}</p>
                            <p>机身颜色:${m.goodDes.phonecolor}</p>
                            <p>套餐类型:${m.goodDes.kindtype}</p>
                            <p>存储容量:${m.goodDes.room}</p>
                        </div>
                        <div class="one-price">${m.onePrice}</div>
                        <div class="hmuch"><span class="addnum">+</span><input type="number" value="${m.count}"> <span class="downnum">-</span> <span class="tipnum">限购两件</span></div>
                        <div class="htotal">${ m.htotal + '元'}</div>
                        <div class="hdoing">
                            <p>移入收藏夹</p>
                            <p class="delete-li del">删除</p>
                        </div>
                    </li>
                </ul>
            </div>
        </li>`;
        })
        //购物车物品展示
        $('.goods-list').html(htmlstr);
        //商品数量显示
        $('.goodsnum').text(goods.length);
        //物品选择
        var moneys = 0;
        var chosenum = 0;
        var ischeck = false; //全选标记
        //点击全选按钮
        $('.all').click(() => {
            //全选
            if (!ischeck) {
                //全选加载价格
                $('.ipt-good').each((i, n) => {
                    if (!n.checked) {
                        moneys += parseFloat($(n).siblings('.htotal').text().slice(0, -1))
                    }
                    chosenum = $('.ipt-good').length;
                })

                $('.ipt-chose').prop('checked', !ischeck)
                ischeck = true;
                $('.chosed-num').text(chosenum)
                $('.chosed-total').text(moneys + '.00')
            }
            //取消全选
            else {
                $('.ipt-chose').prop('checked', !ischeck)
                ischeck = false
                moneys = 0;
                chosenum = 0;
                $('.chosed-total').text(moneys + '.00')
                $('.chosed-num').text(chosenum)
            }
        });
        //计算所选择的物品的总价
        //单选
        $('.ipt-good').each((i, n) => {
            $(n).click(() => {
                if (n.checked) {
                    moneys += parseFloat($(n).siblings('.htotal').text().slice(0, -1))
                    chosenum = chosenum + 1
                    $('.chosed-num').text(chosenum);
                    //如果数字和选中标签相同，则代表全部选中
                    if (chosenum == $('.ipt-good').length) {
                        $('.all').prop('checked', !ischeck)
                        ischeck = true;
                    }
                    //如何判断最后一个ipt标签选中之后全选也被选中
                } else {
                    ischeck = false;
                    $('.all').prop('checked', ischeck)
                    moneys -= parseFloat($(n).siblings('.htotal').text())
                    chosenum = chosenum - 1
                    $('.chosed-num').text(chosenum)
                }
                $('.chosed-total').text(moneys + '.00');
            });
        });
        //删除按钮
        $('.delete-li').each((i, m) => {
            $(m).click(() => {
                var a = confirm('确定删除该商品吗？');
                //每一个待删除的数据的li的下标
                var idx = $(m).parent().parent().parent().parent().parent().index();
                if (a) {
                    //删除对应标签以及展示内容
                    $(m).parent().parent().parent().parent().parent().remove();
                    //删除本地后台对应数据
                    goods.splice(idx, 1)
                    //将新的数据存入本地后台数据
                    localStorage.goodtocar = JSON.stringify(goods)
                    //自动刷新页面
                    window.location.reload();
                };
            })
        })
        $('.delete-all').click(() => {
            var a = confirm('确定删除所有商品吗？')
            if (a) {
                goods = []
                console.log(goods)
                localStorage.goodtocar = JSON.stringify(goods)
                window.location.reload();
            } else {
                return;
            }
        });
        //结算
        $('.btn-pay').click(() => {
            var goodpay = [];
            //获取每一条商品数据的下标
            $('.ipt-good').each((i, m) => {

                if (m.checked) {
                    goodpay.push(goods[i])
                }
            })
            //将待结算商品传递到订单结算页面
            if (goodpay == '') {
                alert('.请选择您要结算的商品！')
            } else {
                console.log(goodpay)
                localStorage.goodtopay = JSON.stringify(goodpay)
                window.open('./order.html')
            }
        })
    }
})