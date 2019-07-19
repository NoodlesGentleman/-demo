<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script src="${STATIC_URL}/js/sysRole/sysRoleEdit.js"></script>


<section class="hbox stretch">
    <aside class="aside-md bg-white b-r">
        <section class="vbox">
            <header class="b-b header">
                <p class="h4">编辑角色</p>
                <p class="h4" style="float: right;"><a href="javascript:;" id="returnPage" class="list"  rel="sysRoleList">&lt&lt角色管理</a></p>
            </header>
            
            <section class="scrollable wrapper w-f">
            	<input type="hidden" name="statush" id="status" class="textInput" value="${sysUserRolesModel.status}" readonly="readonly"/>
                <form class="form-horizontal" id="edit_form" action="${STORE_URL}/sysRole/modify" method="post">
                <input type="hidden" name="role_id" id="role_id" class="textInput" value="${sysUserRolesModel.role_id}" readonly="readonly"/>
                    <div class="form-group">
                        <label for="role_name" class="col-sm-2 control-label">角色名称：</label>
                        <div class="col-sm-4">
                            <input type="text"  class="form-control" id="role_name" name="role_name" value="${sysUserRolesModel.role_name}" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                        
                    <div class="form-group">
                        <label for="role_desc" class="col-sm-2 control-label">角色描述：</label>
                        <div class="col-sm-4">
                        	<textarea rows = "5"  class="form-control" id="role_desc" name="role_desc"  maxlength="100" onkeydown='countChar("role_desc","counter");' onkeyup='countChar("role_desc","counter");'>${sysUserRolesModel.role_desc}</textarea>
                       		还可以输入<span id="counter">${100-fn:length(sysUserRolesModel.role_desc)}</span>字<br/>
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                        
                    <div class="form-group">
                        <label class="col-sm-2 control-label">状态：</label>
                        <div class="col-sm-3">
						<select name="status" style="width:130px" class="form-control">
							<c:if test="${sysUserRolesModel.status == 00}">
								<option value="00" selected="selected">正常</option>
								<option value="01">停用</option>
							</c:if>
							<c:if test="${sysUserRolesModel.status == 01}">
								<option value="00">正常</option>
								<option value="01" selected="selected">停用</option>
							</c:if>
						</select>
                        </div>
                    </div>
                    
                    <%-- <div class="form-group">
                        <label class="col-sm-2 control-label">角色类型：</label>
                        <div class="col-sm-3">
						<select name="role_type" style="width:130px" class="form-control">
							<c:if test="${sysUserRolesModel.role_type == 01}">
								<option value="01" selected="selected">管理员</option>
								<option value="02">用户</option>
							</c:if>
							<c:if test="${sysUserRolesModel.role_type == 02}">
								<option value="01">管理员</option>
								<option value="02" selected="selected">用户</option>
							</c:if>
						</select>
                        </div>
                    </div> --%>
                </form>
            </section>
			<footer class="footer b-t bg-white-only">
                <div class="m-t-sm">
                	<span id="edit_notice"></span>
                   	<button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">提交</button>
					<button type="button" id="submit_cancel" class="btn btn-danger btn-sm input-submit">取消</button>
                </div>
           	</footer>
        </section>
    </aside>
</section>

<jsp:include page="/WEB-INF/views/panel/modal.jsp"/>
<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>