// 详情页放大镜数据加载

$(function () {
    detailAjax();
    chooseType();
    goodsTab();
    meterTab();
    assessTab();
})
// 选择手机类型
function chooseType() {
    $('.choose-type').click(function () {
        $(this).toggleClass('red-active');
    })
    tabColor();
    tabRam();
}

// 切换商品详情
function goodsTab() {
    $('.detail-goods').click(function () {
        let $meter = $('.detail-meter').parent();
        let $assess = $('.detail-assess').parent();
        if ($meter.hasClass('active') || $assess.hasClass('active')) {
            $meter.removeClass('active');
            $assess.removeClass('active');
            $('.detail-meter-item').removeClass('isBlock');
            $('.detail-assess-item').removeClass('isBlock');
            $('.detail-goods').parent().addClass('active');
            $('.detail-goods-item').addClass('isBlock');
        } else {
            $('.detail-goods').parent().addClass('active');
            $('.detail-goods-item').addClass('isBlock');
        }
    })
}

function meterTab() {
    $('.detail-meter').click(function () {
        let $goods = $('.detail-goods').parent();
        let $assess = $('.detail-assess').parent();
        if ($goods.hasClass('active') || $assess.hasClass('active')) {
            $goods.removeClass('active');
            $assess.removeClass('active');
            $('.detail-goods-item').removeClass('isBlock');
            $('.goods-assess-item ').removeClass('isBlock');
            $('.detail-meter').parent().addClass('active');
            $('.goods-meter-item').addClass('isBlock');
        } else {
            $('.detail-meter').parent().addClass('active');
            $('.goods-meter-item').addClass('isBlock');
        }
    })
}

function assessTab() {
    $('.detail-assess').click(function () {
        let $goods = $('.detail-goods').parent();
        let $meter = $('.detail-meter').parent();
        if ($goods.hasClass('active') || $meter.hasClass('active')) {
            $goods.removeClass('active');
            $meter.removeClass('active');
            $('.detail-goods-item').removeClass('isBlock');
            $('.goods-meter-item').removeClass('isBlock');
            $('.detail-assess').parent().addClass('active');
            $('.goods-assess-item').addClass('isBlock');
        } else {
            $('.detail-assess').parent().addClass('active');
            $('.goods-assess-item').addClass('isBlock');
        }
    })
}
// 封装函数
// 机身颜色
function tabColor() {
    let leng = $('.tab-color li').length;
    let colorRom = null;
    colorRom = Math.floor(Math.random() * leng);
    $($('.tab-color li')).each((index, el) => {
        let colorIdx = null;
        let radomNum = null;
        radomNum = $('.tab-color li').eq(colorRom).children().addClass('red-active')
        colorIdx = $(el).index();
        $(el).click(() => {
            $('.tab-color li').eq(colorIdx).children().toggleClass('red-active').parent().siblings().children().removeClass('red-active');
        })
    })
}
// 存储容量
function tabRam() {

    $($('.tab-ram li')).each((index, el) => {
        let colorIdx = null;
        colorIdx = $(el).index();
        $(el).click(() => {
            $('.tab-ram li').eq(colorIdx).children().toggleClass('red-active').parent().siblings().children().removeClass('red-active');
        })
    })
}

//获取传递数据

function detailAjax() {
    var goods = JSON.parse(localStorage.goodtodetail)
    let mirrorStr = "";
    let choseStr = "";
    let typeStr = "";
    console.log(goods.color)
    console.log('1')
    //详情页商品标题
    $('.goodstitle').text(goods.title)
    //接收主页数据传递
    $(goods).each((i, m) => {
        //物品图片展示
        $(m.imgChose).each((i, m) => {
            return mirrorStr += `
           <li class="imgMirror-btn">
           <img src=${'.'+ m} alt="手机图片"/>
       </li>`;
        });

        //物品类型
        $(m.color).each((i, n) => {
            return choseStr += ` 
            <li>
                <a  href="javascrpt:;"style="background-image: url('${"."+m.imgChose[i]}');"> 
                    <span>${n}</span>
                    <i class="iconfont pos-abs red font-14 isHidden">&#xe630;</i>
                </a>
            </li>
        `;
        });

        //储存空间
        $(m.type.Name).each((i, n) => {
            return typeStr += `
                 <li class="tab-ram-item">
                     <span class=" getprice padding-10 gray-border-1 color-B hover-red pos-reb">${n.RAM}<i class="iconfont pos-abs red font-14 isHidden isHidden-i">&#xe630;</i></span> 
                 </li>
               `;
        })
        //获取价格
    })
    $('.exzoom_img_ul').html(mirrorStr);
    $('.tab-color ').html(choseStr);
    $('.tab-ram').html(typeStr);
    // 放大镜效果
    $("#exzoom").exzoom({
        "autoPlay": false
    });
    //价格加载
    $('.getprice').each((i, p) => {
        $(p).click(() => {
            var price = null;

            if (!$(p).hasClass('red-active')) {
                price = goods.type.Name[i].price + '.00';
            } else {
                price = '0.00'
            }
            $('.goodprice').text(price);
        })
    })
}