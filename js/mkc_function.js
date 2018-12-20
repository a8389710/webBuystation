//首页数据加载


// 回到顶部
$(function() {
    
   
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 50) {
            $('.aside-top-logo').fadeIn();
        } else {
            $('.aside-top-logo').fadeOut();
        }
    })
    tabshow();
    gotobuycar ();
    gotologin();
    usermsgshow();
    godown();

});




$('.aside-top-logo').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 500)
});
// 分页效果
function homePageAjax() {
    // 1. 获取DOM
    // 列表
    var ctList = $('.view ul');
    // 上一页
    var prev = $('.ui-page-prev');
    // 下一页
    var next = $('.ui-page-next');
    // 第几页
    var cur = $('.cur');
    // 共几页
    var total = $('.total');
    // 默认当前为第一页
    var curIndex = 1;
    // 总页数
    var allPage = 0;
    var datas = [];

    //数据介质
    var fnum = 0;


    // 2. 数据请求
    $.ajax({
        url: 'https://www.easy-mock.com/mock/5c1b0deb48952b7bd6514342/example/mock',
        success: (response) => {
            // 加载数据
            // news => 封装数据的标题
            datas = response["iphone"];
            loadingIphone(ctList, datas, curIndex, cur,fnum);
            // 总页数 = 所有数据除以10  每一页有10个数据 
            allPage = Math.ceil(datas.length / 20);
            total.text(allPage);

       
           
           
        }
    });
    // 3. 数据添加
    // 给上一页添加点击事件 添加数据
    prev.click(function() {
            if (curIndex == 1) { return; }
            curIndex--;
            fnum = fnum-1;
           
            loadingIphone(ctList, datas, curIndex, cur,fnum);
          
        })
        // 给下一页添加点击事件 添加数据
    next.click(function() {
        if (curIndex == allPage) { return; }
        curIndex++;
            fnum = fnum+1;
        loadingIphone(ctList, datas, curIndex, cur,fnum);

    })

}


//分页下标


// 展示物品分页功能

function loadingIphone(parentNode, datas, curIndex, cur,fnum) {
    // 当页数据开始下标
    var starIndex = (curIndex - 1) * 20;
    // 当页数据结束下标
    var endIndex = starIndex + 19;
    // curIndex == 2
    // 27
    if (curIndex == Math.ceil(datas.length / 20)) {
        endIndex = datas.length - 1;
    }
    // 拼接
    var htmlStr = "";
    for (var i = starIndex; i <= endIndex; i++) {
        htmlStr += `
        <li class="product">
            <div class="product-iWrap">
                <div class="product-wrap">
                    <img class="productImg" src="${datas[i].imgShow}">
                    ${function(){
                        let ob = "";
                        datas[i].imgChose.forEach(a => {          
                            ob +=`
                            <img class="productImg hid"  src="${a}"  alt="">
                            `
                        });
                        return ob;
                    }()}
                </div>
                <div class="productThumb">
                    <div class="proThumb-wrap">
                        <p class="ks-switchable-content">
                        ${(function() {
                            let ob = "";
                            datas[i].imgChose.forEach(a => {
                               
                                ob += `
                                <b class="proThumb-img ">
                                <img src="${a}" alt="">
                                </b>`
                            });
                            return ob;
                        })()}
                           
                        </p>
                    </div>
                </div>
                <p class="productPrice">
                    <em>${datas[i].money}</em>
                </p>
                <div class="productTitle">
                    <a href="#javascript:;">
                    ${datas[i].title}
                    </a>
                </div>
                <div class="productShop">
                    <a class="productShop-name" href="#javascript:;">${datas[i].des}</a>
                </div>
            </div>
        </li>
       
    `
    }
    
    cur.text(curIndex);
    parentNode.html(htmlStr);
    tabshow();
    msgpass(datas,fnum);
    search(datas,parentNode,fnum);  
    

}

//tab选项卡效果
function tabshow(){
    $('.view ul').children('li').each((index, m) => {
        var smallidx = null;
        $($('.view ul').children('li').find('.proThumb-img')).each((index, m) => {
            $(m).click(() => {
                smallidx = $(m).index();
                $(m).parent().find('.proThumb-img').removeClass('proThumb-selected')
                $(m).addClass('proThumb-selected')
                $(m).parent().parent().parent().siblings('.product-wrap').find('.productImg').addClass('hid')
                $(m).parent().parent().parent().siblings('.product-wrap').find('.productImg').eq([smallidx + 1]).removeClass('hid')
            })

        })

    })
}

//传递数据


function gotobuycar (){
    $('.aside-purches').click(()=>{
        window.open('./pages/buy-car.html',"_self")
    })
}

function gotologin(){
    $('.sn-login').click(()=>{
        window.open('./pages/login.html',"_self")
    })
}
//展示用户昵称
function usermsgshow(){
    var num = null;
    if(localStorage.getItem('islogin') || !JSON.parse(localStorage.islogin)){
        $('.login-show').addClass('hid');
        $('.go-down').removeClass('hid')
        var j = JSON.parse(localStorage.userj)
        $('.username').text(j);
        if(localStorage.getItem('goodtocar')==""||JSON.parse(localStorage.goodtocar)!=null){
            num = JSON.parse(localStorage.goodtocar).length;
            $('.cart-count').text(num)
        }
    
    }
}

function godown(){
    var k = '';
    $('.go-down').click(()=>{
        var a = confirm('确定退出当前用户吗？')
        if(a){
            $('.go-down').addClass('hid')
            $('.login-show').removeClass('hid');
            $('.username').text(k)
            islogin = false;
            localStorage.islogin = JSON.stringify(islogin)
            localStorage.userj = JSON.stringify(k)
        }
        })
}


//具体商品操作
//模糊搜索
function search(datas,p,fnum){
    $('.mallSearch-btn').click(()=>{
        var keyword = '';
        var reg = '';
        var search =  $('.mallSearch-ipt').val();
        var keybox=[];
       $(datas).each((i,m)=>{
        keyword = m.title
        reg = new RegExp(search);
        if(reg.test(keyword))
        {
        keybox.push(m)
        }
      
       })
      
       var listr = '';
       
       $(keybox).each((i,m)=>{

        listr += `
        <li class="product">
            <div class="product-iWrap">
                <div class="product-wrap">
                    <img class="productImg" src="${m.imgShow}">
                    ${function(){
                        let ob = "";
                        m.imgChose.forEach(a => {          
                            ob +=`
                            <img class="productImg hid"  src="${a}"  alt="">
                            `
                        });
                        return ob;
                    }()}
                </div>
                <div class="productThumb">
                    <div class="proThumb-wrap">
                        <p class="ks-switchable-content">
                        ${(function() {
                            let ob = "";
                            m.imgChose.forEach(a => {
                               
                                ob += `
                                <b class="proThumb-img ">
                                <img src="${a}" alt="">
                                </b>`
                            });
                            return ob;
                        })()}
                           
                        </p>
                    </div>
                </div>
                <p class="productPrice">
                    <em>${m.money}</em>
                </p>
                <div class="productTitle">
                    <a href="#javascript:;">
                    ${m.title}
                    </a>
                </div>
                <div class="productShop">
                    <a class="productShop-name" href="#javascript:;">${m.des}</a>
                </div>
            </div>
        </li>
    `;

       })
      
        p.html(listr);
        tabshow();
        msgpass(keybox,fnum)
       $('.ui-page').addClass('hid')

            })


        }

//信息传递
function msgpass(g,fnum){
    var goodbox = [];
  
    g = g.slice(fnum*20) 
    $('.product-wrap').each((i,m)=>{
        $(m).click(()=>{
            goodbox.push(g[i])
            localStorage.goodtodetail = JSON.stringify(goodbox.reverse()[0]);
            window.open('./pages/details.html');
         
        })
        
    })
    
}
