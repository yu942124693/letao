// ajax有6个全局事件
//   ajaxStart()
//   ajaxSend()
//   ajaxSuccess()
//   ajaxError()
//   ajaxComplete()
//   ajaxStop()

$(document).ajaxStart(function(){
    NProgress.start()
});
$(document).ajaxStop(function(){
    NProgress.done();
})
