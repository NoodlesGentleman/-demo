<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<!-- .header -->
<header class="bg-dark dk header navbar navbar-fixed-top-xs">
    <div class="navbar-header aside-md">
        <a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
            <i class="fa fa-bars"></i>
        </a>
        <a href="javascript:;" class="navbar-brand" data-toggle="fullscreen">
            <img src="./view/static/panel/img/logo.png" class="m-r-sm">${SITE_NAME }
        </a>
        <a class="btn btn-link visible-xs" data-toggle="dropdown" data-target=".nav-user">
            <i class="fa fa-cog"></i>
        </a>
    </div>
    
    <ul class="nav navbar-nav hidden-xs">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle dker" data-toggle="dropdown">
                <i class="fa fa-building-o"></i> 
                <span class="font-bold">面板</span>
            </a>
            <section class="dropdown-menu aside-xl on animated fadeInLeft no-borders lt">
                <div class="wrapper lter m-t-n-xs">
                    <a href="#" class="thumb pull-left m-r">
                        <img src="./view/static/panel/img/avatar.jpg" class="img-circle">
                    </a>
                    <div class="clear"><!-- @{$loggedInUser.fullname} -->
                        <a href="javascript:;"><span class="text-white font-bold">${loggedInUser.userName}</span></a>
                        <small class="block">超级管理员</small>
                    </div>
                </div>
            </section>
        </li>
    </ul>
     
    <ul class="nav navbar-nav navbar-right hidden-xs nav-user">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <span class="thumb-sm avatar pull-left">
                    <img src="./view/static/panel/img/avatar.jpg">
                </span>
                <!-- {$loggedInUser.fullname}  -->${loggedInUser.userName}<b class="caret"></b>
            </a>
            <ul class="dropdown-menu animated fadeInRight">
                <li>
                    <a href="${STORE_URL }/sysUser/logout">注销</a>
                </li>
            </ul>
        </li>
    </ul>      
</header>
<!-- /.header -->