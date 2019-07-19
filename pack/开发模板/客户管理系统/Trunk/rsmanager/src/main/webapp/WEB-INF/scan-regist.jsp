<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>用户登记</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<link href='${pageContext.request.contextPath}/style/weui.min.css' rel="stylesheet"></link>
<link href="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
<meta id="baseUrl" content="${pageContext.request.contextPath}">
<meta id="userid" content="${user.id }">
<meta id="buildingid" content="${building.id }">
</head>
<body>
<div class='bd'>
	<h1 style="color: #225fba;text-align: center;" class='page_title'>用户登记</h1>
</div>

<div class="weui_cells_title">经纪人</div>
<div class="weui_cells weui_cells_form">
	<div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">姓名</label></div>
        <div class="weui_cell_bd weui_cell_primary">
           	 ${user.name }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">电话</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            ${user.mobile }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">公司</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            ${user.company }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">项目</label></div>
        <div class="weui_cell_bd weui_cell_primary buildingname">
            ${building.name }
        </div>
    </div>
</div>
<div class="weui_cells_title">用户</div>
<div class="weui_cells weui_cells_form">
	<div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">姓名</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" type="text" id='name' placeholder="请输入姓名">
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">手机</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" id='mobile' type="number" pattern="[0-9]*" placeholder="请输入姓名">
        </div>
    </div>
    <div class="weui_cell weui_vcode">
        <div class="weui_cell_hd"><label class="weui_label">验证码</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" id="code" type="number" pattern="[0-9]*" placeholder="请输入验证码">
        </div>
        <div class="weui_cell_ft">
            <button class="weui_btn weui_btn_primary" href="javascript:" id="sendCode">获取验证码</button>
        </div>
    </div>
</div>
<div class="weui_btn_area">
    <a class="weui_btn weui_btn_default" href="javascript:" id="regist">登记</a>
</div>

<div id="dialog-message" title="信息" style="display:none;">
  <p>
  	  保存成功.
  </p>
</div>
<script src='${pageContext.request.contextPath}/vendor/jquery/jquery.2.1.3.min.js'></script>
<script src='${pageContext.request.contextPath}/vendor/bootstrap/js/bootstrap.min.js'></script>
<script src="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.min.js"></script>
<script src='${pageContext.request.contextPath}/js/scanregist.js'></script>
</body>
</html>