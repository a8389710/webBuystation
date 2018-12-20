$(function() {

    $('.add-car-btn').click(() => {
        var goodsbox = [];
        var goodsdetail = {
            title: '',
            goodDes: {
                'webtype':'',
                'phonecolor':'',
                'kindtype':'',
                'room':''
            },
            onePrice: '',
            count: '1',
            htotal: '',
            goodView: '',
            shopName: ''
        };
        var ishas = false;
       
        //如果没有购物车(第一次存入购物车)
        if (JSON.parse(localStorage.goodtocar === '' || localStorage.getItem('goodtocar') == null)) {
            if(($('.red-active').length==4)){
                alert('加入购物车成功！');
            var $m = ''
             $m = $('.red-active')
                   goodsdetail.goodDes.webtype = $($m[0]).text().slice(0,5);
                   goodsdetail.goodDes.phonecolor = $($m[1]).text().trim().slice(0,3);
                   goodsdetail.goodDes.kindtype = $($m[2]).text().slice(0,4);
                   goodsdetail.goodDes.room = $($m[3]).text().slice(0,5);
                   goodsdetail.title = $('.goodstitle').text();
                   goodsdetail.onePrice = $('.goodprice').text();
                   goodsdetail.shopName = $('.store-name').text();
                   goodsdetail.htotal = goodsdetail.onePrice * goodsdetail.count;
   
    
                //获取购物车展示图片地址
    
                var imgadr = '';
               
                imgadr ='./' + $($m[1]).css('background-image').slice(32).slice(0,-2);
                console.log(imgadr)
                goodsdetail.goodView = imgadr;
                goodsbox.push(goodsdetail)
                localStorage.goodtocar = JSON.stringify(goodsbox);
            // window.open('./buy-car.html')
            }
            ishas = true;
        }


        
        //如果有购物车
        else {
            
            if(($('.red-active').length==4)){
            goodsbox = JSON.parse(localStorage.goodtocar)
            var $m = ''
            $m = $('.red-active')
                  goodsdetail.goodDes.webtype = $($m[0]).text().slice(0,5);
                  goodsdetail.goodDes.phonecolor = $($m[1]).text().trim().slice(0,3);
                  goodsdetail.goodDes.kindtype = $($m[2]).text().slice(0,4);
                  goodsdetail.goodDes.room = $($m[3]).text().slice(0,5);
                  goodsdetail.title = $('.goodstitle').text() +  goodsdetail.goodDes.phonecolor + goodsdetail.goodDes.room;
                  goodsdetail.onePrice = $('.goodprice').text();
                  goodsdetail.shopName = $('.store-name').text();
                  goodsdetail.htotal = goodsdetail.onePrice * goodsdetail.count;
               //获取购物车展示图片地址
                  var imgadr = '';
                  imgadr ='./' + $($m[1]).css('background-image').slice(32).slice(0,-2);   
                  goodsdetail.goodView = imgadr;


//判断是否购物车已含有该物品
            $(goodsbox).each((index, m) => {
                if (m.title == goodsdetail.title) {
                    alert('该商品已经加入购物车！');
                    ishas = true;
                }
            })
                            if (ishas) {
                                return;
                            } 
                            else
                            {
                                if(($('.red-active').length==4)){
                                    alert('加入购物车成功！');
                                    goodsbox.push(goodsdetail);
                                    localStorage.goodtocar = JSON.stringify(goodsbox)
                                    // window.open('./buy-car.html')
                                }
                                else{
                                    alert('请完善商品信息!');
                                    return;
                                } 
                            }

        }else{
            alert('请完善商品信息!');
            return;
        }
    }


    })
 
    $('.fast-buy-btn').click(()=>{
        if(($('.red-active').length==4)){
            alert('请确认物品已加入购物车！')
            window.open('./buy-car.html')
        }
        else{
            alert('请完善商品信息!');
            return;
        } 
      
    })
})