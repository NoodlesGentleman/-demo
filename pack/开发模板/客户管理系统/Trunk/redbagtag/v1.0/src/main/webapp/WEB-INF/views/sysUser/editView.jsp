<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false"%>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp" />
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<script src="${STATIC_URL}/js/sysUser/sysUserEdit.js"></script>

<section class="hbox stretch">
	<aside class="aside-md bg-white b-r">
		<section class="vbox">
			<header class="b-b header">
				<p class="h4">编辑角色</p>
				<p class="h4" style="float: right;">
					<a href="javascript:;" id="returnPage" class="list"
						rel="sysRoleList">&lt&lt角色管理</a>
				</p>
			</header>

			<section class="scrollable wrapper w-f">
				<form class="form-horizontal" id="edit_form" action="${STORE_URL}/sysUser/update" method="POST">
					<input type="hidden" id="user_id" name="user_id" value = "${user.user_id }"/>
					<div class="form-group">
						<label for="role_name" class="col-sm-2 control-label">角色登录名：</label>
						<div class="col-sm-4">
							<input type="text" readonly="readonly" class="form-control"
								id="user_login_name" name="user_login_name"
								value="${user.user_login_name}" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>

					<div class="form-group">
						<label for="role_no" class="col-sm-2 control-label">角色密码：</label>
						<div class="col-sm-4">
							<input type="password" class="form-control" id="user_pwd"
								name="user_pwd" value="${user.user_pwd }" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>

					<div class="form-group">
						<label for="role_desc" class="col-sm-2 control-label">角色名字：</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="userName" name="userName" value="${user.userName }" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>
					
					<div class="form-group">
						<label for="role_desc" class="col-sm-2 control-label">电话号码：</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="userMobile" name="userMobile" value="${user.userMobile }" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>

					<div class="form-group">
						<label class="col-sm-2 control-label">性别：</label>
						<div class="col-sm-3">
							<select name="userSex" style="width: 130px" class="form-control">
								<c:if test="${user.userSex == 0}">
									<option value="0" selected="selected">男</option>
									<option value="1">女</option>
								</c:if>
								<c:if test="${user.userSex == 1}">
									<option value="0">男</option>
									<option value="1" selected="selected">女</option>
								</c:if>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-2 control-label">是否管理员：</label>
						<div class="col-sm-3">
							<select name="isAdmin" style="width: 130px"class="form-control">
								<c:if test="${user.isSuperAdmin == 1}">
									<option value="1" selected="selected">是</option>
									<option value="0">否</option>
								</c:if>
								<c:if test="${user.isSuperAdmin == 2}">
									<option value="1">是</option>
									<option value="0" selected="selected">否</option>
								</c:if>
							</select>
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>
					
					<div class="form-group">
						<input type="hidden" id="roleId" value="${user.role_id }">
						<label class="col-sm-2 control-label">角色：</label>
						<div class="col-sm-3">
							<select name="userRoleId" id="userRoleId" style="width: 130px" class="form-control">
								<option value="" selected="selected">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>
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

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp" />