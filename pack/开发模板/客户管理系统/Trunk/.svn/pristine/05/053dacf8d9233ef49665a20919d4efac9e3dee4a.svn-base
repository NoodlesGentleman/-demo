<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html lang="zh-cn">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	    <meta name="author" content="上富科技">
	    <title>超级经纪人</title>
		<meta id="baseUrl" content="${pageContext.request.contextPath}">
	    <!-- Bootstrap -->
	    <link href="${pageContext.request.contextPath}/vendor/select2/css/select2.min.css" rel="stylesheet">
	    <link href="${pageContext.request.contextPath}/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	    <link href="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
	    <link href="${pageContext.request.contextPath}/style/style.css" rel="stylesheet">

	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	      <script src="${pageContext.request.contextPath}/vendor/html5shiv/html5shiv.min.js"></script>
	      <script src="${pageContext.request.contextPath}/vendor/respond/respond.min.js"></script>
	    <![endif]-->
	</head>
	<body>
		
		<div class="container app admin">
			<div class="mainframe">
				<%-- <div class="col-xs-12 col-sm-12 topContainer">
					<img src="${pageContext.request.contextPath}/images/banner.png" width="100%" height="100%">
				</div>
				<div class="col-xs-12 col-sm-12 menuList">
					<div class="col-xs-4 col-sm-4 menu" panel-data="archives" title-data="档案列表">
						<span class="glyphicon glyphicon-list"></span>
						<p>档案列表</p>
					</div>
				</div> --%>
				

				<div class="panel panel-default">
				  <div class="panel-heading"> ${Statistics.name} <button class='btn btn-danger btn-sm pull-right' style='margin-top: -5px;' onclick='window.location.search = "?reload=1"'>刷新</button> </div>
<!-- 				  <div class="panel-body">
				    Basic panel example
				  </div> -->
				  <ul class="list-group">
				  	<li class="list-group-item lead">历史</li>
				    <li class="list-group-item"><span class="badge">${Statistics.baobeizl}</span><i class='glyphicon glyphicon-list-alt'></i>&nbsp;报备总量</li>
				    <li class="list-group-item"><span class="badge">${Statistics.baobeirs}</span><i class='glyphicon glyphicon-tasks'></i>&nbsp;报备人数</li>
				    <li class="list-group-item"><span class="badge">${Statistics.youxiaozl}</span><i class='glyphicon glyphicon-check'></i>&nbsp;有效客户</li>
				    <li class="list-group-item"><span class="badge">${Statistics.zifangzl}</span><i class='glyphicon glyphicon-import'></i>&nbsp;自访客户</li>
				    <li class="list-group-item"><span class="badge">${Statistics.yuyuezl}</span><i class='glyphicon glyphicon-time'></i>&nbsp;预约总量</li>
				    <li class="list-group-item"><span class="badge">${Statistics.yuyueundjzl}</span><i class='glyphicon glyphicon-remove-sign'></i>&nbsp;未登记预约量</li>
				  	<li class="list-group-item"><span class="badge">${Statistics.djzl}</span><i class='glyphicon glyphicon-list-alt'></i>&nbsp;登记预约量</li>
				  	<li class="list-group-item lead">今日</li>
				    <li class="list-group-item"><span class="badge">${Statistics.baobeild}</span><i class='glyphicon glyphicon-th-list'></i>&nbsp;本日报备</li>
				    <li class="list-group-item"><span class="badge">${Statistics.yuyueld}</span><i class='glyphicon glyphicon-time'></i>&nbsp;本日预约量</li>
				    <li class="list-group-item"><span class="badge">${Statistics.yuyueundjld}</span><i class='glyphicon glyphicon-remove-sign'></i>&nbsp;本日未登记预约</li>
				  	<li class="list-group-item"><span class="badge">${Statistics.djld}</span><i class='glyphicon glyphicon-list-alt'></i>&nbsp;本日登记预约</li>
				  </ul>
				</div>
				
				<div class="panel panel-default">
				  <!-- <div class="panel-heading"> 最新预约 </div> -->
				  <ul class="list-group">
				    <li class="list-group-item active" onclick='app.trigger("show.archives");' panel-data="archives" title-data="档案列表"><i style='font-szie:14px;' class="glyphicon glyphicon-chevron-right pull-right"></i>报备列表</li>
				  </ul>
				</div>
			</div>
		</div>
		
		<div class="panel panel-default managerPanel">
			<div class="panel-heading">
				<div class="returnBtn"><span class="glyphicon glyphicon-arrow-left"></span></div>
				<span class="title"></span>
			</div>
			<div class="panel-body">
				
				<div class="panel-content col-xs-12 col-sm-12 archives" target-data="archives">
					<div class="search-panel" style="position: fixed; z-index: 999; top: 41px;">
						<div class="col-lg-6">
					    	<div class="input-group">
					      		<input type="text" class="form-control" id="key" placeholder="输入关键字搜索档案..">
					      		<span class="input-group-btn">
					       			 <button class="btn btn-default" id="search" type="button" style="padding: 9px 12px;"><span class='glyphicon glyphicon-search'></span></button>
					      		</span>
					    	</div><!-- /input-group -->
					 	</div><!-- /.col-lg-6 -->
					</div>
					<div class="search-result" style="margin-top: 60px; z-index: 9;"></div>
					<div id="loading" style="text-align:center;font-size: 30px;margin-bottom: 10px;"><span class="glyphicon glyphicon-refresh glyphicon-icon-loding"></span></div>
				</div>
			</div>
		</div>
		
		<div id="dialog-message" title="信息" style="display:none;">
		  <p>
		  	  保存成功.
		  </p>
		</div>

		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	    <script src="${pageContext.request.contextPath}/vendor/jquery/jquery.2.1.3.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/select2/js/select2.full.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/select2/js/i18n/zh-CN.js"></script>
	    <!-- Include all compiled plugins (below), or include individual files as needed -->
	    <script src="${pageContext.request.contextPath}/vendor/bootstrap/js/bootstrap.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/moment/moment-with-locales.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/bacon/bacon.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/lodash/lodash.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/eonasdan-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/vendor/eonasdan-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" />
	    <script src="${pageContext.request.contextPath}/js/common.js"></script>
	    <script src="${pageContext.request.contextPath}/js/admin.js"></script>
	</body>
</html>