<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/view/panel/wrapper.prefix.jsp"/>

<script src="${STATIC_URL}/js/rights/permission.edit.js" type="text/javascript"></script>

<section class="hbox stretch">
    <aside class="aside-md bg-white b-r">
        <section class="vbox">
            <header class="b-b header">
                <p class="h4"><c:choose><c:when test="${permission != null}">编辑权限</c:when><c:otherwise>添加权限</c:otherwise></c:choose></p>
            </header>
            
            <section class="scrollable wrapper w-f">
                <form class="form-horizontal" id="edit_form" action="/admin/permission/add" method="post">
                    <div class="form-group">
		                <label for="permission_id" class="col-sm-2 control-label"><font class="red">*</font>权限 ID</label>
		                <div class="col-sm-4">
		                    <input type="text" class="form-control" id="permission_id" name="permission_id" value="${permission.permissionId}" placeholder="请输入权限 ID" />
		                </div>
		            </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                    
                    <div class="form-group">
		                <label for="permission_name" class="col-sm-2 control-label"><font class="red">*</font>权限名</label>
		                <div class="col-sm-4">
		                    <input type="text" class="form-control" id="permission_name" name="permission_name" value="${permission.permission_name}" placeholder="请输入权限名" />
		                </div>
		            </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                    
                    <div class="form-group">
		                <label for="permission_group" class="col-sm-2 control-label"><font class="red">*</font>权限组</label>
		                <div class="col-sm-4">
		                    <input type="text" class="form-control" id="permission_group" name="permission_group" value="${permission.permission_group}" placeholder="请输入权限组" />
		                </div>
		            </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                    
                    <div class="form-group">
		                <label class="col-sm-2 control-label"><font class="red">*</font>所属模块:</label>
		                <div class="col-sm-4">
		                    <select class="form-control" name="appkey">
		                        <option value="">请选择所属模块</option>
		                        <c:if test="${apps != null}">
                            	<c:forEach items="${apps}" var="v">
		                        <option value="${v.appkey}"  <c:if test="${ v.appkey == permission.appkey}">selected</c:if>>${v.permission_name}</option>
		                       </c:forEach>
                            </c:if>
		                    </select>
		                </div>
		            </div>
                    
                    <div class="form-group">
                        <label for="description" class="col-sm-2 control-label">描述</label>
                        <div class="col-sm-4">
                            <textarea class="form-control" id="description" name="description" placeholder="请输入描述" >${permission.description}</textarea>
                        </div>
                    </div>
                    
                    <input type="hidden" name="permission_id_now" id="permission_id_now" value="${permission.permissionId}" />
                </form>
            </section>
            
            <footer class="footer b-t bg-white-only">
                <div class="m-t-sm">
                    <button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">保存</button>
                    <c:if test="${permission != null}"><button type="button" id="submit_save_continue" class="btn btn-s-md btn-primary btn-sm input-submit">保存并继续添加</button></c:if>
                    <button type="button" id="submit_cancel" class="btn btn-danger btn-sm input-submit">取消</button>
                    <span id="edit_notice"></span>
                </div>
            </footer>
        </section>
    </aside>
</section>
            
<jsp:include page="/view/panel/wrapper.suffix.jsp"/>