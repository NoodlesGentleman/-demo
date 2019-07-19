<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
// 动态获得地址配置
%>
<!DOCTYPE html>
<html lang="zh-CN" class="app">
<head>
<base href="<%=basePath%>">
<script type="text/javascript" language="javaScript">
	// 动态获得地址配置
   	var STORE_URL = '${STORE_URL}';
    var STATIC_URL = '${STATIC_URL}';
    var STATIC_CDN = '${STATIC_CDN}';
    
</script>
<jsp:include page="/WEB-INF/views/panel/inc/header.jsp"/> 
<!-- USER DEFINED ASSETS -->
<!-- USER DEFINED ASSETS END@-->
<title>管理员后台</title>
</head>