<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh-CN" class="bg-dark js no-touch no-android no-chrome firefox no-iemobile no-ie no-ie10 no-ie11 no-ios">
<head>
	<script type="text/javascript">
		var webroot = "${STORE_URL}";
	</script>
	<base href="<%=basePath%>">
	<meta charset="utf-8" />
	<title>${SITE_NAME}</title>
	<meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  
    <link rel="stylesheet" href="${STATIC_URL}/scripts/bootstrap/3.1.0/css/bootstrap.min.css" type="text/css"/>
	<link rel="stylesheet" href="${STATIC_URL}/panel/css/animate.css" type="text/css"/>
	<link rel="stylesheet" href="${STATIC_URL}/panel/css/apps.css" type="text/css"/>
	<link rel="stylesheet" href="${STATIC_URL}/panel/css/sign.css" type="text/css"/>
	
	<script src="${STATIC_URL}/scripts/jquery/1.11.0/jquery.min.js"></script>
	<script src="${STATIC_URL}/scripts/jquery-form/3.03/jquery.form.js"></script>
    <script src="view/static/js/login/sign.js"></script>
    
    <!-- shortcut icon -->
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>
<body>
<!-- 主页请求跳转 -->
<a class="navbar-brand block" href="#">${SITE_NAME}</a>

<section id="aui_iwrapper" class="animated fadeInUp aui-iwrapper">
    <section class="panel panel-default bg-white m-t-lg">
        <header class="panel-heading text-center">
            <strong>登录</strong>
        </header>
        <form action="${STORE_URL}/sysUser/userLogin" id="form_sign"  class="panel-body wrapper-lg" method="post" title="登录" data-validate="parsley">
            <div class="form-group">
                <label class="control-label">用户名</label>
                <input type="text" name="username" class="form-control" id="username" placeholder="用户名" data-maxlength="20" data-minlength="3" data-required="true" data-trigger="change" value="${login_username}" />
                <span class="notice notice-username"></span>
            </div>
            <div class="form-group">
                <label class="control-label">密码</label>
                <input type="password" name="password" class="form-control" id="inputPassword" placeholder="密码" data-required="true" data-trigger="change" />
                <span class="notice notice-password"></span>
            </div>
            <div class="form-group">
                <label class="control-label">验证码</label>	
                <input type="text" name="captcha" class="captcha form-control" id="login-captcha" placeholder="验证码" data-maxlength="4"  data-required="true" data-trigger="change" autocomplete="off" />
                <span class="notice notice-captcha"></span>
            </div>
            <div class="form-group">
                <img src="${STORE_URL}/sysUser/getImage" alt="点击换一张" id="vcodeimg" title="看不清楚，换一张" style="cursor:pointer;" onclick="this.src='${STORE_URL}/sysUser/getImage?t='+Math.random();" >
            </div>
            <button type="submit" id="sign_submit" class="btn btn-primary">登录</button>
            <button type="reset" class="btn btn-info">重置</button>
            <input type="hidden" name="url_continue" value="${url_continue}" />
            <div class="line line-dashed"></div>
            <h4 class="text text-danger notice-back"></h4>
        </form>
    </section>
</section>

<!-- footer -->
<footer id="footer">
    <div class="text-center padder">
        <p>
            <small>${COPY_RIGHT}</small>
        </p>
    </div>
</footer>
</body>
</html>