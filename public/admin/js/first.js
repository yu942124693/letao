$(function(){

var page=1;
var pageSize=5;
render();
function render(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(info){
        //   console.log(info);
        var html=template('tmp1',info);
        $('tbody').html(html);
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:page,
            totalPages:Math.ceil(info.total/info.size),
            size:'small',
            onPageClicked:function(a,b,c,p){
            // var page;
            // page=3
            // var p;
            // p=3;
                 page = p;
                console.log(page)
               
                render();
                
            }
        })
        }
    })
    // console.log(page)
}

$('.btn_add').on('click',function(){
    $('#addModal').modal('show')
})


  //2. 表单校验的功能
  $("form").bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    },
    //配置小图标的规则
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
//阻止表单的提交默认行为
$('form').on('success.form.bv',function(e){
    e.preventDefault();
    // console.log(123);
    $.ajax({
        type:'post',
        url: '/category/addTopCategory',
        data:$('form').serialize(),
        success:function(info){
            console.log(info)
            if(info.success){
                $('#addModal').modal('hide');
                page=1;//让数据在第一页刷新
                render();
                $("form").data("bootstrapValidator").resetForm(true);
            }
        }
    })
})

})