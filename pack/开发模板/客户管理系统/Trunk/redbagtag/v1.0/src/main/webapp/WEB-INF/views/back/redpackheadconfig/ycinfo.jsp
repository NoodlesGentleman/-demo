<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script type="text/javascript" charset="utf-8" src="${STORE_URL}/ui/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${STORE_URL}/ui/ueditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="${STORE_URL}/ui/ueditor/lang/zh-cn/zh-cn.js"></script>
<!-- 网页内容的js和css样式加载-->
<script src="${STATIC_URL}/back/redpackheadconfig/js/ycinfo.js"></script>
<link rel="stylesheet" type="text/css" href="${STORE_URL}/ui/ueditor/themes/default/css/ueditor.css" />

<section class="vbox">
      <header class="b-b header">
          <p class="h4">添加一次性红包任务</p>
          <input id="recordId" hidden value="0"/>
      </header>
	<section class="scrollable wrapper w-f">
          <form class="form-horizontal" id="myForm" action="${STORE_URL}/index/upload" method="post" enctype ="multipart/form-data">
                <div class="form-group" >
                	 <input hidden value="YC" id="recordJobtype" />
                     <label for="neno_Title" class="col-sm-1 control-label w150">红包名称：</label>
                     <div class="col-sm-4">
                 		<input type="text" class="form-control" id="recordTitle" value="" />
                     </div>
                </div>
                <div class="form-group">
                   	 <label for="" class="col-sm-1 control-label w150">红包内容：</label>
               		 <div class="col-sm-4">
               			<textarea id="recordContent" style="width:930px;height:150px;"></textarea> 
               		 </div>
                </div>
                <div class="form-group" >
                     <label for="neno_Title" class="col-sm-1 control-label w150">金额设置：</label>
                     <div class="col-sm-2">
                 		<select class="form-control" id="recordPricetype">
		           			<option value="0">固定金额</option>
		           			<option value="1">随机金额</option>
		           		</select>
                     </div>
                     <label for="neno_Title" class="col-sm-1 control-label w50">金额：</label>
                     <div class="col-sm-2">
                 		<input type="text" class="form-control" id="recordMinprice" value="" 
                 			onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
                     </div>
               		 <label for="neno_Title" hidden class="col-sm-1 control-label w50">~</label>
                     <div class="col-sm-2" hidden>
                 		<input type="text" class="form-control" id="recordMaxprice" value="" 
                 			onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
                     </div>
                </div>
                <div class="form-group" >
                     <label for="neno_Title" class="col-sm-1 control-label w150">发放时间：</label>
                     <div class="col-sm-2">
                 		<input type="text" id="recordSendtime" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
							class="form-control" data-date-format="yyyy-mm-dd HH:mm:ss" value=""/>
                     </div>
                </div>
                <div class="form-group">
               		<label for="" class="col-sm-1 control-label w150">红包数量：</label>
               		<div class="col-sm-2">
               			<input type="text" class="form-control" id="recordTotal" value="" 
               				onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
               		</div>
	   			</div> 
	   			<div class="form-group">
	   				<label for="" class="col-sm-1 control-label w150">人群筛选</label>
	   			</div>
	   			<div class="form-group">
               		<label for="" class="col-sm-1 control-label w150">注册时长：</label>
               		<div class="col-sm-2">
               			<input type="text" id="propRegBegin" class="form-control" name="recordProp" pkey="RLB" value="" 
               				onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
               		</div>
               		<label for="" class="col-sm-1 control-label w50">~</label>
               		<div class="col-sm-2">
               			<input type="text" id="propRegEnd" class="form-control" name="recordProp" pkey="RLE" value="" 
               				onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
               		</div>
               	</div>
               	<div class="form-group">
               		<label for="" class="col-sm-1 control-label w150">操作次数：</label>
               		<div class="col-sm-2">
               			<input type="text" id="propOptBegin" class="form-control" name="recordProp" pkey="OCB" value="" 
               				onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
               		</div>
               		<label for="" class="col-sm-1 control-label w50">~</label>
               		<div class="col-sm-2">
               			<input type="text" id="propOptEnd" class="form-control" name="recordProp" pkey="OCE" value="" 
               				onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
               		</div>
	   			</div>
             </form>
         </section>
	<footer class="footer b-t bg-white-only">
		<div class="m-t-sm">
			<button id="btn_save" class="btn btn-sm btn-success" type="button" style="width:120px;">保存</button>
		</div>
   	</footer>
</section>