<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/view/panel/wrapper.prefix.jsp"/>

<script src="${STATIC_URL}/js/rights/app.permission.edit.js" type="text/javascript"></script>

<section class="hbox stretch">
    <aside class="aside-md bg-white b-r">
        <section class="vbox">
            <header class="b-b header">
                <p class="h4"><c:choose><c:when test="${app_permission != null}">编辑动作</c:when><c:otherwise>添加动作</c:otherwise></c:choose></p>
            </header>
            
            <section class="scrollable wrapper w-f">
                <form class="form-horizontal" id="edit_form" action="/adminuser/appPermission/add" method="post">
                    <div class="form-group">
		                <label class="col-sm-2 control-label"><font class="red">*</font>所属模块</label>
		                <div class="col-sm-4">
		                    <select class="form-control" name="ap_appkey">
		                        <option value="">请选择所属模块</option>
		                       <c:if test="${apps != null}">
                            	<c:forEach items="${apps}" var="v">
		                        <option value="${v.appkey}" <c:if test="${v.appkey == selected_appkey}"> selected</c:if>>${v.name}</option>
		                       </c:forEach>
                           </c:if>
		                    </select>
		                </div>
		            </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                    
                    <div class="form-group">
		                <label for="ap_module" class="col-sm-2 control-label"><font class="red">*</font>子模块名</label>
		                <div class="col-sm-4">
		                    <input type="text" class="form-control" id="ap_module" name="ap_module" value="${app_permission.module}" />
		                </div>
		            </div>
		            <div class="line line-dashed line-lg pull-in"></div>
		            
		            <div class="form-group">
		                <label for="ap_controller" class="col-sm-2 control-label"><font class="red">*</font>控制器</label>
		                <div class="col-sm-4">
		                    <input type="text" class="form-control" id="ap_controller" name="ap_controller" value="${app_permission.controller}" />
		                </div>
		            </div>
		            <div class="line line-dashed line-lg pull-in"></div>
		            
		            <div class="form-group">
		                <label for="ap_action" class="col-sm-2 control-label"><font class="red">*</font>动作</label>
		                <div class="col-sm-4">
		                    <input type="text" class="form-control" id="ap_action" name="ap_action" value="${app_permission.action}" />
		                </div>
		                <div class="col-sm-6">
                            <p class="form-control-static">可同时输入多个动作，用","隔开</p>
                        </div>
		            </div>
		            <div class="line line-dashed line-lg pull-in"></div>
		            
		            <div class="form-group">
		                <label class="col-sm-2 control-label"><font class="red">*</font>权限</label>
		                <div class="col-sm-4">
		                    <select class="form-control" name="ap_permission_id">
		                        <option value="">请选择权限</option>
		                        <c:if test="${permissions != null}">
                            	<c:forEach items="${permissions}" var="v">
		                        <option value="${v.permission_id}" <c:if test="${v.permission_id == selected_permission_id}"> selected</c:if>>${v.permission_name}</option>
		                        </c:forEach>
                          	 </c:if>
		                    </select>
		                </div>
		            </div>
                    
                    <input type="hidden" name="keys" id="keys" value="{if $app_permission}${app_permission.appkey},${app_permission.module},${app_permission.controller},${app_permission.action}{/if}" />
                </form>
            </section>
            
            <footer class="footer b-t bg-white-only">
                <div class="m-t-sm">
                    <button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">保存</button>
                    <c:if test="${app_permission != null}"><button type="button" id="submit_save_continue" class="btn btn-s-md btn-primary btn-sm input-submit">保存并继续添加</button></c:if>
                    <button type="button" id="submit_cancel" class="btn btn-danger btn-sm input-submit">取消</button>
                    <span id="edit_notice"></span>
                </div>
            </footer>
        </section>
    </aside>
</section>

<jsp:include page="/view/panel/wrapper.suffix.jsp"/>