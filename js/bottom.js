
//$(function(){
//  function footerPosition(){
//      $(".login-footer").removeClass("fixed-bottom");
//      var contentHeight = $(".contain").height(),//网页正文全文高度
//          winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
//      if(!(contentHeight > winHeight)){
//          //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
//         // $(".login-footer").addClass("fixed-bottom");
//         $(".login-footer").css("position","fixed");
//      } else {
//          //$(".login-footer").removeClass("fixed-bottom");
//          
//           
//             $(".login-footer").css("position","static");
//      }
//  }
//  footerPosition();
//  $(window).resize(footerPosition);
//});
//document.addEventListener("DOMContentLoaded", function() {
//  footerOffsetTop = $$(".login-footer").offsetTop;
//});
//var index = 0;
//window.addEventListener("resize", function() {
//  if (mui.os.android) {// 修正:android下输入法让footer上移问题
//      var offsetTop =$$(".login-footer").offsetTop;
//      if (index % 2 === 0) {
//          if (offsetTop === 0) {
//              removeClass($$(".login-footer"), "mui-hidden");
//          } else {
//              if (offsetTop < footerOffsetTop) {
//                  addClass($$(".login-footer"), "mui-hidden");
//              }
//          }
//      }
//      index++;
//  }
//})

$(function(){
var oHeight = $(document).height(); //屏幕当前的高度
$(window).resize(function(){
        if($(document).height() < oHeight){
        $(".login-footer").css("display","none");
		$(".normal-footer").css("display","none");
    }else{
        $(".login-footer").css("display","block");
		$(".normal-footer").css("display","block");
    } 
    });
});