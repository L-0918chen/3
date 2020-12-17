var del=document.getElementsByClassName("del");//删除
 var dl=document.getElementsByTagName("dl");
 var all=document.getElementsByClassName("all")[0];//获取全选按钮
 var all_is=document.getElementsByClassName("all_is")[0];//获取取反按钮
 var ischeck=document.getElementsByClassName("ischeck");//获取商品勾选状态复选框节点
 var minus=document.getElementsByClassName("minus");//商品减
 var plus=document.getElementsByClassName("plus");//商品加
 var count=document.getElementsByClassName("count");//商品数量
 var price=document.getElementsByClassName("price");//获得单价
 var price_sum=document.getElementsByClassName("price_sum");//获得商品价格
 var sum_=document.getElementsByClassName("sum_")[0];//获得商品总价格
 var piece=document.getElementById("piece");//已选商品件数
 var cancel=document.getElementById("cancel");//取消选择
 
 //全选功能
 all_();
 function all_(){
  all.onchange=function(){
  //当全选框状态为ture 的时候循环勾选 商品状态  为false 则相反
  if(all.checked){
   for(var i=0;i<ischeck.length;i++)
   {
   ischeck[i].checked=true;
   }
   piece_();//已选商品件数
  }
  else{
   for(var i=0;i<ischeck.length;i++)
   {
   ischeck[i].checked=false;
   }
   piece_();//已选商品件数
  }
  shss();//每次商品勾选或者数量发生改变计算总额数
  }
 }
 //商品状态勾选 
 comm_ischeck();
 function comm_ischeck(){
  for (var i=0;i<ischeck.length;i++) {
  (function(j){
   ischeck[j].onclick=function(){
   shss();//每次商品勾选或者数量发生改变计算总额数
   piece_();//每次商品勾选状态发生变化计算已选商品件数
 
   for (var k=0;j<ischeck.length;k++) {//循环判断商品勾选状态
    if (!ischeck[k].checked) {//如果有一个为flase 则全选框取消勾选
    all.checked = false;
     break; //结束循环
    }
    //否则勾选
    all.checked =true;
   } 
   }
  })(i)
  }
 }
 //反选
 all_iss();
 function all_iss(){
  all_is.onchange=function(){ 
  //循环遍历勾选状态 商品状态勾选则取消勾选
  for(var i=0;i<ischeck.length;i++){
   ischeck[i].checked = ischeck[i].checked?false:true;
  }
  shss();//每次商品勾选或者数量发生改变计算总额数
  piece_();//每次商品勾选状态发生变化计算已选商品件数
  }
 }
 //减少商品
 add_is();
 function add_is(){
  for(var i=0;i<minus.length;i++){
  (function(i){
   minus[i].onclick=function(){
   if(parseInt(count[i].value)<2){
    count[i].value=1;
   }
   else{
    count[i].value=parseInt(count[i].value)-1;
   }
   // parseInt(count[i].value) 因为得到的value 是string 类型 运算需要进行类型转换
   //如果数量值<1默认为0
   //count[i].value=parseInt(count[i].value)<1?0:(parseInt(count[i].value)-1);
   
   var pric=price[i].innerHTML;//商品单价
   price_sum[i].innerHTML=parseInt(pric)*parseInt(count[i].value);//商品总结价格等于=商品单价*商品数量
 
   shss();//每次商品勾选或者数量发生改变计算总额数
   piece_();//每次商品勾选状态发生变化计算已选商品件数
   }
  })(i)
  }
 }
 //添加商品
 add();
 function add(){
  for(var i=0;i<plus.length;i++){
  //立即执行函数得到下标
  (function(i){
   plus[i].onclick=function(){
   var pric=price[i].innerHTML;//商品单价
   //因为得到的value 是string 类型 运算需要进行类型转换
   count[i].value=parseInt(count[i].value)+1;//改变数量值
   price_sum[i].innerHTML=parseInt(pric)*parseInt(count[i].value);//商品总结价格等于=商品单价*商品数量
   shss();//每次商品勾选或者数量发生改变计算总额数
   piece_();//每次商品勾选状态发生变化计算已选商品件数
   }
  })(i)
  }
 }
 //count
 count_();
 function count_(){
  for(var i=0;i<count.length;i++){
  (function(i){
   count[i].onchange=function(){
   var pric=price[i].innerHTML;//商品单价
   //因为得到的value 是string 类型 运算需要进行类型转换
   count[i].value=parseInt(count[i].value)+1;//改变数量值
   price_sum[i].innerHTML=parseInt(pric)*parseInt(count[i].value);//商品总结价格等于=商品单价*商品数量
   shss();//每次商品勾选或者数量发生改变计算总额数
   piece_();//每次商品勾选状态发生变化计算已选商品件数
   }
  })(i)
  }
 }
 
 //计算已选商品件数
 piece_();
 function piece_(){
  piece.innerHTML=0;
  for(var i=0;i<ischeck.length;i++){
  if(ischeck[i].checked){
   piece.innerHTML=parseInt(piece.innerHTML)+parseInt(count[i].value);
  }
  }
 }
 
 //计算商品总额
 shss();
 function shss(){
  sum_.innerHTML=0;
  for(var i=0;i<ischeck.length;i++){
  if(ischeck[i].checked){
   console.log(sum_.innerHTM);
   sum_.innerHTML=parseInt(sum_.innerHTML)+parseInt(price_sum[i].innerHTML);
  }
  }
 }
 
 //取消选择
 cancel_();
 function cancel_(){
  //取消按钮点击事件
  cancel.onclick=function(){
  for(var i=0;i<ischeck.length;i++){
   ischeck[i].checked=false;
  }
  shss();
  piece_();
  }
 }
 //删除
 del_();
 function del_(){
  for(var i=0;i<del.length;i++){
  (function(i){
   del[i].onclick=function(){
   dl[i].parentNode.removeChild(dl[i]);
   shss();//每次商品勾选或者数量发生改变计算总额数
   piece_();//每次商品勾选状态发生变化计算已选商品件数
   }
  })(i)
  }
 }
