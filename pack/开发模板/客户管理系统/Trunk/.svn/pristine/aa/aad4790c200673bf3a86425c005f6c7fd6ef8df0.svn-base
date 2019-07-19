<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<link href="${STATIC_URL}/panel/css/navigation.css" rel="stylesheet" type="text/css" />
<script src="${STATIC_URL}/js/rights/navigation.edit.js"></script>

<!-- modal - 编辑导航 -->
<div class="modal-dialog" id="modal_edit">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="modal_title">
	           <!-- ${category} -->添加导航
            </h4>
        </div>
        <div class="modal-body">
            <form class="form-horizontal" action="sysNav/insert" method="post" id="edit_form">
                <div class="form-group">
                    <label class="col-sm-3 control-label">导航</label>
                    <div class="col-sm-6">
                    <input type="hidden" id="parentIdH" value="${navigation.parentId}"/>
                    <select name="parentId" id="parentId" class="form-control">
                        <c:forEach items="${navList}" var="v">
                        	<option value="${v.navigationId}" >${v.title}</option>
                        </c:forEach>
                    </select>
	                </div>
	                <div class="col-sm-3">
	                    <button type="button" id="resetParentNavigation" class="btn btn-sm input-submit">设置为顶级导航</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="title" class="col-sm-3 control-label"><font class="red">*</font>导航名称</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" name="title" id="title" placeholder="请输入导航名称" />
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="link" class="col-sm-3 control-label">链接地址</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" name="link" id="link" placeholder="请输入链接地址" />
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="sort_order" class="col-sm-3 control-label">序号</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" name="sortOrder" id="sortOrder" />
                        
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="icon" class="col-sm-3 control-label">ICON 图标</label>
                    <div class="col-sm-7">
                        <div class="input-group dropdown combobox" id="myCombobox"><!-- ${navigation} -->
                            <input type="text" name="icon" class="form-control" />
                            <div class="input-group-btn">
                                <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button"><i class="caret"></i></button>
                                <ul class="dropdown-menu pull-right" id="icon_ul">
                                    <li data-value="fa-file-text"><a href="javascript:;"><i class="fa fa-file-text"></i><span class="text padder">fa-file-text</span></a></li>
                                    <li data-value="fa-bar-chart-o"><a href="javascript:;"><i class="fa fa-bar-chart-o"></i><span class="text padder">fa-bar-chart-o</span></a></li>
                                    <li data-value="fa-bell"><a href="javascript:;"><i class="fa fa-bell"></i><span class="text padder">fa-bell</span></a></li>
                                    <li data-value="fa-building-o"><a href="javascript:;"><i class="fa fa-building-o"></i><span class="text padder">fa-building-o</span></a></li>
                                    <li data-value="fa-cloud"><a href="javascript:;"><i class="fa fa-cloud"></i><span class="text padder">fa-cloud</span></a></li>
                                    <li data-value="fa-comment"><a href="javascript:;"><i class="fa fa-comment"></i><span class="text padder">fa-comment</span></a></li>
                                    <li data-value="fa-comments"><a href="javascript:;"><i class="fa fa-comments"></i><span class="text padder">fa-comments</span></a></li>
                                    <li data-value="fa-cutlery"><a href="javascript:;"><i class="fa fa-cutlery"></i><span class="text padder">fa-cutlery</span></a></li>
                                    <li data-value="fa-download"><a href="javascript:;"><i class="fa fa-download"></i><span class="text padder">fa-download</span></a></li>
                                    <li data-value="fa-plane"><a href="javascript:;"><i class="fa fa-plane"></i><span class="text padder">fa-plane</span></a></li>
                                    <li data-value="fa-gavel"><a href="javascript:;"><i class="fa fa-gavel"></i><span class="text padder">fa-gavel</span></a></li>
                                    <li data-value="fa-headphones"><a href="javascript:;"><i class="fa fa-headphones"></i><span class="text padder">fa-headphones</span></a></li>
                                    <li data-value="fa-lemon-o"><a href="javascript:;"><i class="fa fa-lemon-o"></i><span class="text padder">fa-lemon-o</span></a></li>
                                    <li data-value="fa-location-arrow"><a href="javascript:;"><i class="fa fa-location-arrow"></i><span class="text padder">fa-location-arrow</span></a></li>
                                    <li data-value="fa-music"><a href="javascript:;"><i class="fa fa-music"></i><span class="text padder">fa-music</span></a></li>
                                    <li data-value="fa-shopping-cart"><a href="javascript:;"><i class="fa fa-shopping-cart"></i><span class="text padder">fa-shopping-cart</span></a></li>
                                    <li data-value="fa-sitemap"><a href="javascript:;"><i class="fa fa-sitemap"></i><span class="text padder">fa-sitemap</span></a></li>
                                    <li data-value="fa-truck"><a href="javascript:;"><i class="fa fa-truck"></i><span class="text padder">fa-truck</span></a></li>
                                    <li data-value="fa-video-camera"><a href="javascript:;"><i class="fa fa-video-camera"></i><span class="text padder">fa-video-camera</span></a></li>
                                    <li data-value="fa-gear"><a href="javascript:;"><i class="fa fa-gear"></i><span class="text padder">fa-gear</span></a></li>
                                    <li data-value="fa-gears"><a href="javascript:;"><i class="fa fa-gears"></i><span class="text padder">fa-gears</span></a></li>
                                    <li data-value="fa-film"><a href="javascript:;"><i class="fa fa-film"></i><span class="text padder">fa-film</span></a></li>
                                    <li data-value="fa-coffee"><a href="javascript:;"><i class="fa fa-coffee"></i><span class="text padder">fa-coffee</span></a></li>
                                    <li data-value="fa-bullhorn"><a href="javascript:;"><i class="fa fa-bullhorn"></i><span class="text padder">fa-bullhorn</span></a></li>
                                    <li data-value="fa-anchor"><a href="javascript:;"><i class="fa fa-anchor"></i><span class="text padder">fa-anchor</span></a></li>
                                    <li data-value="fa-archive"><a href="javascript:;"><i class="fa fa-archive"></i><span class="text padder">fa-archive</span></a></li>
                                    <li data-value="fa-briefcase"><a href="javascript:;"><i class="fa fa-briefcase"></i><span class="text padder">fa-briefcase</span></a></li>
                                    <li data-value="fa-user"><a href="javascript:;"><i class="fa fa-user"></i><span class="text padder">fa-user</span></a></li>
                                    <li data-value="fa-users"><a href="javascript:;"><i class="fa fa-users"></i><span class="text padder">fa-users</span></a></li>
                                    <li data-value="fa-trash-o"><a href="javascript:;"><i class="fa fa-trash-o"></i><span class="text padder">fa-trash-o</span></a></li>
                                    <li data-value="fa-wrench"><a href="javascript:;"><i class="fa fa-wrench"></i><span class="text padder">fa-wrench</span></a></li>
                                    <li data-value="fa-home"><a href="javascript:;"><i class="fa fa-home"></i><span class="text padder">fa-home</span></a></li>
                                    <li data-value="fa-gift"><a href="javascript:;"><i class="fa fa-gift"></i><span class="text padder">fa-gift</span></a></li>
                                    <li data-value="fa-gamepad"><a href="javascript:;"><i class="fa fa-gamepad"></i><span class="text padder">fa-gamepad</span></a></li>
                                    <li data-value="fa-bug"><a href="javascript:;"><i class="fa fa-bug"></i><span class="text padder">fa-bug</span></a></li>
                                    <li data-value="fa-book"><a href="javascript:;"><i class="fa fa-book"></i><span class="text padder">fa-book</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">ICON 背景</label>
                    <div class="col-sm-7">
                        <div class="btn-group m-r">
	                        <button class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" id="icon_bg_selected">
	                            <span class="dropdown-label padder bg-white">
	                              	 bg-white
	                            </span> 
	                            <span class="caret"></span>
	                        </button>
	                        <ul class="dropdown-menu dropdown-select" id="icon_bg_ul">
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-white"/>bg-white<label class="label bg-white form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-light">bg-light<label class="label bg-light form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-warning">bg-warning<label class="label bg-warning form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-danger">bg-danger<label class="label bg-danger form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-info">bg-info<label class="label bg-info form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-success">bg-success<label class="label bg-success form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-primary">bg-primary<label class="label bg-primary form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-dark">bg-dark<label class="label bg-dark form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                            <li>
	                                <a href="javascript:;"><input type="radio" name="iconBg" value="bg-black">bg-black<label class="label bg-black form-control-static pos-rlt pull-right m-t-nx col-sm-5">&nbsp;</label></a>
	                            </li>
	                        </ul>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">是否显示</label>
                    <div class="col-sm-7">
                        <label class="checkbox-inline p-left-0">
                            <input type="radio" name="status" value="1" /> 显示
                        </label>
                        <label class="checkbox-inline ">
                            <input type="radio" name="status" value="0" /> 隐藏
                        </label>
                    </div>
                </div>
                <input type="hidden" name="addNavigationId" value="${navigation.navigationId}" />
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">保存并返回列表管理</button>
            <c:if test = "1=1"><button type="button" id="submit_save_continue" class="btn btn-s-md btn-primary btn-sm input-submit">保存并继续添加</button></c:if>
            <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">取消</button>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/views/panel/modal.jsp"/>