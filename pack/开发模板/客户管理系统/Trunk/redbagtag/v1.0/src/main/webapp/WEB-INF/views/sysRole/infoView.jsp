<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script src="${STATIC_URL}/js/sysRole/sysRole.js"></script>

<section class="hbox stretch">
    <aside class="aside-md bg-white b-r">
        <section class="vbox">
            <header class="b-b header">
                <p class="h4">角色信息</p>
                <p class="h4" style="float: right;"><a href="javascript:;" id="returnPage" class="list"  rel="sysRoleList">&lt&lt角色管理</a></p>
            </header>
            
            <section class="scrollable wrapper w-f">
                <form class="form-horizontal" id="edit_form">
                <input type="hidden" name="role_idh" id="role_id" class="textInput" value="${sysRolesModel.role_id}" readonly="readonly"/>
                <input type="hidden" name="statush" id="status" class="textInput" value="${sysRolesModel.status}" readonly="readonly"/>
                    <div class="form-group">
                        <label for="role_name" class="col-sm-2 control-label">角色名称：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly = "readonly" class="form-control" id="role_name" name="role_name" value="${sysRolesModel.role_name}" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                        
                    <div class="form-group">
                        <label for="role_desc" class="col-sm-2 control-label">角色描述：</label>
                        <div class="col-sm-4">
                            <textarea rows = "5" readonly = "readonly" class="form-control" id="role_desc" name="role_desc"  maxlength="100" >${sysRolesModel.role_desc}</textarea>
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                        
                    <div class="form-group">
                        <label class="col-sm-2 control-label">状态：</label>
                        <div class="col-sm-3">
						<select name="status" disabled="disabled" style="width:130px" class="form-control">
							<c:if test="${sysRolesModel.status == 00}">
								<option value="00" selected="selected">正常</option>
								<option value="01">停用</option>
							</c:if>
							<c:if test="${sysRolesModel.status == 01}">
								<option value="00">正常</option>
								<option value="01" selected="selected">停用</option>
							</c:if>
						</select>
                        </div>
                    </div>
                    
                    <%-- <div class="form-group">
                        <label class="col-sm-2 control-label">角色类型：</label>
                        <div class="col-sm-3">
						<select name="role_type" disabled="disabled" style="width:130px" class="form-control">
							<c:if test="${sysRolesModel.role_type == 01}">
								<option value="01" selected="selected">管理员</option>
								<option value="02">用户</option>
							</c:if>
							<c:if test="${sysRolesModel.role_type == 02}">
								<option value="01">管理员</option>
								<option value="02" selected="selected">用户</option>
							</c:if>
						</select>
                        </div>
                    </div> --%>
                        
                    <div class="form-group">
                        <label for="create_person" class="col-sm-2 control-label">创建人：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly = "readonly" class="form-control" id="create_person" name="create_person" value="${sysRolesModel.create_person}" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>

                    <div class="form-group">
                        <label for="create_time" class="col-sm-2 control-label">创建时间：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly = "readonly" class="form-control" id="create_time" name="create_time" value="<fmt:formatDate value='${sysRolesModel.create_time}' type='date' pattern='yyyy-MM-dd HH:mm:ss'/>" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                    
                    <div class="form-group">
                        <label for="update_person" class="col-sm-2 control-label">更新人：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly = "readonly" class="form-control" id="mchKey" name="update_person" value="${sysRolesModel.update_person}" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                    
                    <div class="form-group">
                        <label for="update_time" class="col-sm-2 control-label">更新时间：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly = "readonly" class="form-control" id="update_time" name="update_time" value="<fmt:formatDate value='${sysRolesModel.update_time}' type='date' pattern='yyyy-MM-dd HH:mm:ss'/>" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>                            
                   <%--  <input type="hidden" name="userid" value="${user.userid}" />--%>
                </form>
            </section>
            
        </section>
    </aside>
</section>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>