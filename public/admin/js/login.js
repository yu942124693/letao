$(function(){
    $('form').bootstrapValidator({
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:3,
                        max:6,
                        message:'用户名长度为3-6位'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度为6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        },

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
        
    })



     $('form').on('success.form.bv',function(e){
         e.preventDefault();//阻止浏览器默认行为,也就是发生跳转,不能用return false ,否则后面代码会不执行;
         $.ajax({//只有验证通过了才能进行跳转
             type:'post',
             url: '/employee/employeeLogin',
             data: $('form').serialize(),//把表单中的input属性name属性值生成需要的形式
             success:function(info){
                 console.log(info);
                 if(info.error===1000){
                     $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                 }
                 if(info.error===1001){
                    $('form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                 }
                 if(info.success){
                     location.href='index.html'
                 }
             }

         })
     })
 

     //点击重置按钮

      $('[type=reset]').on('click',function(){
          console.log(1);
          $('form').data('bootstrapValidator').resetForm(true);
      })




})