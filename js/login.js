$(function() {

    $('.btn-register').click(() => {
        $('.login').addClass('hidden'),
            $('.register').removeClass('hidden')
    })

    $('.btn-login').click(() => {
        $('.register').addClass('hidden'),
            $('.login').removeClass('hidden')
    })

    //注册

    $('.register-in').click(() => {
        //赋予对应值
        var userbox = [];
        var usermsg = {
            name: '',
            password: ''
        };
        var isresed = false;
        usermsg.name = $('#regit-username').val();
        usermsg.password = $('#regit-password').val();

        //添加用户注册信息到后台

        //注册
        if (usermsg.name == '' || usermsg.password == '') {
            alert('请输入正确信息！');
            return;
        } else {

            if (localStorage.getItem('users') === null) {
                userbox.push(usermsg);
                alert('注册成功！');
                window.open('../index.html', "_self")
                localStorage.users = JSON.stringify(userbox)
                return;
            }
            //非第一次注册
            else {

                userbox = JSON.parse(localStorage.users)
                userbox.forEach((m) => {
                    console.log(m.name)
                    if (usermsg.name == m.name) {
                        alert('该用户已注册！');
                        isresed = true
                        return isresed;
                    }
                });
                if (isresed) {
                    return;
                } else {
                    alert('注册成功！')
                    islogin = true;
                    userbox.push(usermsg)
                    localStorage.users = JSON.stringify(userbox);
                    var userjname = '';
                    userjname = usermsg.name
                    localStorage.islogin = JSON.stringify(islogin);
                    localStorage.userj = JSON.stringify(userjname);

                    window.open('../index.html', "_self")
                }

            }
        }

    })

    //登录
    $('.login-in').click(() => {
        //赋予对应值
        var userbox = [];
        var usermsg = {
            name: '',
            password: ''
        };
        var islogin = false;
        usermsg.name = $('#login-username').val();
        usermsg.password = $('#login-password').val();


        //将输入信息与后台用户信息匹配

        //匹配是否成功
        if (usermsg.name == '' || usermsg.password == '' || JSON.parse(localStorage.users == '' || localStorage.getItem('users') == null)) {
            alert('请输入正确用户名、密码!')
            return;
        } else {
            userbox = JSON.parse(localStorage.users)
            userbox.forEach((m, index) => {

                if (usermsg.name == m.name) {
                    if (usermsg.password == userbox[index].password) {
                        alert('登录成功！');
                        islogin = true;
                        return;
                    } else {
                        islogin = false;
                        return;
                    }
                }
            });
            if (islogin) {
                alert('即将跳转页面，请稍等...')
                
                var userjname = '';
                userjname = usermsg.name
                localStorage.islogin = JSON.stringify(islogin);
                localStorage.userj = JSON.stringify(userjname);

                window.open('../index.html')
            } else {
                alert('该用户尚未注册 或 用户名或密码错误!')
            }

        }

    })



})