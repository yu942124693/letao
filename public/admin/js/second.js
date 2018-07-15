$(function(){
 
var page =1;
var pageSize=5;
render();
function render(){
   $.ajax({
       type:'get',
       url:'/category/querySecondCategoryPaging',
       data:{
           page:page,
           pageSize:pageSize
       },
       success:function(info){
           console.log(info);
           var html=template('tmp2',info);
          $('tbody').html(html);
          $('#paginator').bootstrapPaginator({
              bootstrapMajorVersion:3,
              currentPage: page,
              totalPages: Math.ceil(info.total/info.size),
              size: 'small',
              onPageClicked: function(a,b,c,p){
                  page=p;
                  render();
              }
          })
          
       }

   })
}

// 模态框
$('.btn_add').on('click',function(){
    // console.log(1)
    $('#addModal').modal('show');
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            console.log(info)
            $('.dropdown-menu').html(template('tmp22',info))
        }
    })
})


$('.dropdown-menu').on('click','a',function(){
    //修改一级分类的文本
   $('.dropdown-text').text($(this).text());
   //获取ID
   var id=$(this).data('id');
   $("[name='categoryId']").val(id);
//    这里的为a 不能自动校验,要手动设置
   $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  
})

// 图片上传功能
$('#fileupload').fileupload({
    done:function(e,data){
        $('.img_box img').attr("src",data.result.picAddr);
        $("[name='brandLogo']").val(data.result.picAddr);
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

    }
})


// 表单校验
 //5. 表单校验
 $("form").bootstrapValidator({
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类的名字不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传一张品牌的图片'
          }
        }
      }

    },
    //配置不做校验的类型
    excluded: [],
    //配置小图标的规则
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });

//   校验成功发送请求

$("form").on("success.form.bv", function(e){
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $("form").serialize(),
      success:function(info){
        if(info.success) {
          //隐藏模态框
          $("#addModal").modal('hide');
          //重新渲染第一页
          page = 1;
          render();
          //重置表单的样式
          $("form").data("bootstrapValidator").resetForm(true);

          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");
        }
      }
    });
  });



})