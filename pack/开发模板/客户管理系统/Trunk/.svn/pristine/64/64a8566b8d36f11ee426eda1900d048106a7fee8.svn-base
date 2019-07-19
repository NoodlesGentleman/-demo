<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>用户登记</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<link href='${pageContext.request.contextPath}/style/weui.min.css' rel="stylesheet"></link>
<link href="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
<meta id="baseUrl" content="${pageContext.request.contextPath}">
<meta id="campaignid" content="${campaign.id }">
<meta id="salerid" content="${saler.id }">
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
           	 ${campaign.userName }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">电话</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            ${campaign.userMobile }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">登记人</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            ${saler.name }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">项目</label></div>
        <div class="weui_cell_bd weui_cell_primary buildingname">
            ${campaign.buildingName }
        </div>
    </div>
</div>
<div class="weui_cells_title">客户</div>
<div class="weui_cells weui_cells_form">
	<div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">姓名</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            ${campaign.customerName }
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">手机</label></div>
        <div class="weui_cell_bd weui_cell_primary">
            ${campaign.customermobile }
        </div>
    </div>
    <c:if test="${campaign.protectDate == null}">
	    <div class="weui_cell weui_vcode">
	        <div class="weui_cell_hd"><label class="weui_label">验证码</label></div>
	        <div class="weui_cell_bd weui_cell_primary">
	            <input class="weui_input" id="code" type="number" pattern="[0-9]*" placeholder="请输入验证码">
	        </div>
	    </div>
    </c:if>
</div>
<div class="weui_btn_area">
	<c:if test="${campaign.protectDate == null}">
    	<a class="weui_btn weui_btn_default" href="javascript:" id="checkin">登记</a>
    </c:if>
</div>
<c:if test="${campaign.protectDate != null}">
	<h1 style="text-align:center;"> 登记完成</h1>
</c:if>
<div id="dialog-message" title="信息" style="display:none;">
  <p>
  	 登记完成！
  </p>
</div>
<script src='${pageContext.request.contextPath}/vendor/jquery/jquery.2.1.3.min.js'></script>
<script src='${pageContext.request.contextPath}/vendor/bootstrap/js/bootstrap.min.js'></script>
<script src="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.min.js"></script>
<script src='${pageContext.request.contextPath}/js/scanregist.js'></script>
</body>
</html>